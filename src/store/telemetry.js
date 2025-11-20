import { configureStore, createSlice, createAction } from '@reduxjs/toolkit'

// Actions to control stream lifecycle
export const startStream = createAction('telemetry/startStream')
export const stopStream = createAction('telemetry/stopStream')
export const setTransport = createAction('telemetry/setTransport') // 'worker' | 'ws'

const telemetrySlice = createSlice({
  name: 'telemetry',
  initialState: {
    running: false,
    transport: 'worker', // 'worker' | 'ws'
    lastTimestamp: null,
    heartRate: [], // [{t, v}]
    oxygenSaturation: 98,
    lactateThreshold: 4.0,
    motion: { x: 0, y: 0, z: 0 },
    emg: [], // array of channels
    eeg: { alpha: 0, beta: 0, gamma: 0, theta: 0, delta: 0 },
    maxPoints: 300,
    error: null,
  },
  reducers: {
    pushSample(state, action) {
      const { timestamp, heartRate, oxygenSaturation, lactateThreshold, motion, emg, eeg } = action.payload
      state.lastTimestamp = timestamp
      if (typeof heartRate === 'number') {
        state.heartRate.push({ t: timestamp, v: heartRate })
        if (state.heartRate.length > state.maxPoints) state.heartRate.shift()
      }
      if (oxygenSaturation != null) state.oxygenSaturation = oxygenSaturation
      if (lactateThreshold != null) state.lactateThreshold = lactateThreshold
      if (motion) state.motion = motion
      if (Array.isArray(emg)) state.emg = emg
      if (eeg) state.eeg = eeg
    },
    clearStream(state) {
      state.heartRate = []
      state.emg = []
      state.running = false
    },
    setRunning(state, action) {
      state.running = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
    setTransportState(state, action) {
      state.transport = action.payload
    },
  },
})

export const { pushSample, clearStream, setRunning, setError, setTransportState } = telemetrySlice.actions

// Custom middleware to bridge with Web Worker or WebSocket backend
export const telemetryMiddleware = () => {
  let worker = null
  let socket = null

  const cleanup = () => {
    if (worker) {
      worker.postMessage({ type: 'STOP' })
      worker.terminate()
      worker = null
    }
    if (socket) {
      try { socket.close() } catch (_) {}
      socket = null
    }
  }

  return storeAPI => next => action => {
    if (setTransport.match(action)) {
      storeAPI.dispatch(setTransportState(action.payload))
    }

    if (startStream.match(action)) {
      const state = storeAPI.getState()
      const selected = state.telemetry.transport
      cleanup()
      if (selected === 'worker') {
        worker = new Worker(new URL('../workers/telemetryWorker.js', import.meta.url), { type: 'module' })
        worker.onmessage = (e) => {
          storeAPI.dispatch(pushSample(e.data))
        }
        worker.onerror = (e) => storeAPI.dispatch(setError(String(e?.message || 'Worker error')))
        worker.postMessage({ type: 'START' })
        storeAPI.dispatch(setRunning(true))
      } else if (selected === 'ws') {
        const base = import.meta.env.VITE_BACKEND_URL ? String(import.meta.env.VITE_BACKEND_URL).replace(/\/$/, '') : ''
        const httpUrl = base || ''
        let wsUrl
        if (httpUrl.startsWith('http')) {
          wsUrl = httpUrl.replace('http://', 'ws://').replace('https://', 'wss://') + '/ws/telemetry'
        } else {
          wsUrl = (location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host.replace(/\-3000/, '-8000') + '/ws/telemetry'
        }
        try {
          socket = new WebSocket(wsUrl)
        } catch (err) {
          storeAPI.dispatch(setError('Failed to create WebSocket'))
        }
        if (socket) {
          socket.onopen = () => {
            storeAPI.dispatch(setRunning(true))
          }
          socket.onmessage = (evt) => {
            try {
              const data = JSON.parse(evt.data)
              storeAPI.dispatch(pushSample(data))
            } catch (e) {
              // ignore
            }
          }
          socket.onerror = () => storeAPI.dispatch(setError('WebSocket error'))
          socket.onclose = () => storeAPI.dispatch(setRunning(false))
        }
      }
    }

    if (stopStream.match(action)) {
      cleanup()
      storeAPI.dispatch(setRunning(false))
    }

    return next(action)
  }
}

export const store = configureStore({
  reducer: {
    telemetry: telemetrySlice.reducer,
  },
  middleware: (getDefault) => getDefault().concat(telemetryMiddleware()),
})

export const selectTelemetry = (state) => state.telemetry
