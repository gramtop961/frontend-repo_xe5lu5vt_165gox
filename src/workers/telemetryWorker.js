// Simple synthetic telemetry generator in a Web Worker
let running = false
let rafId = null

function tick() {
  if (!running) return
  const now = Date.now()
  // Generate synthetic signals
  const heartRate = 55 + Math.round(25 * Math.sin(now / 500)) + Math.round(Math.random() * 5)
  const oxygenSaturation = 96 + Math.round(Math.random() * 3)
  const lactateThreshold = 3.8 + Math.random() * 0.6
  const motion = {
    x: Math.sin(now / 400) * 0.5,
    y: Math.cos(now / 500) * 0.5,
    z: Math.sin(now / 700) * 0.5,
  }
  const emg = Array.from({ length: 8 }, (_, i) => 0.5 * Math.sin(now / (80 + i * 10)) + (Math.random() - 0.5) * 0.2)
  const eeg = {
    alpha: Math.abs(Math.sin(now / 900)),
    beta: Math.abs(Math.sin(now / 700)),
    gamma: Math.abs(Math.sin(now / 500)),
    theta: Math.abs(Math.sin(now / 1200)),
    delta: Math.abs(Math.sin(now / 1500)),
  }

  postMessage({
    timestamp: now,
    heartRate,
    oxygenSaturation,
    lactateThreshold,
    motion,
    emg,
    eeg,
  })

  rafId = setTimeout(tick, 100) // ~10Hz
}

onmessage = (e) => {
  const { type } = e.data
  if (type === 'START') {
    if (!running) {
      running = true
      tick()
    }
  }
  if (type === 'STOP') {
    running = false
    if (rafId) clearTimeout(rafId)
  }
}
