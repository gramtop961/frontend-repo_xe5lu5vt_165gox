import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { store, startStream, stopStream, selectTelemetry } from '../store/telemetry'
import { LineChart } from './charts/LineChart'
import { ForceGauge } from './charts/ForceGauge'
import { Canvas } from '@react-three/fiber'

export default function ApexDashboard() {
  const dispatch = useDispatch()
  const data = useSelector(selectTelemetry)

  useEffect(() => {
    dispatch(startStream())
    return () => dispatch(stopStream())
  }, [dispatch])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Apex Performance Nexus</h1>
        <div className="space-x-2">
          <button onClick={() => dispatch(startStream())} className="rounded bg-emerald-600 px-3 py-1.5 text-sm hover:bg-emerald-500">Start</button>
          <button onClick={() => dispatch(stopStream())} className="rounded bg-zinc-700 px-3 py-1.5 text-sm hover:bg-zinc-600">Stop</button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="md:col-span-8 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <h2 className="mb-2 text-sm font-medium text-zinc-400">Heart Rate</h2>
          <LineChart series={data.heartRate} color="#34d399" />
        </div>
        <div className="md:col-span-4 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <h2 className="mb-2 text-sm font-medium text-zinc-400">Oxygen Saturation</h2>
          <ForceGauge value={data.oxygenSaturation} min={90} max={100} />
        </div>
        <div className="md:col-span-6 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <h2 className="mb-2 text-sm font-medium text-zinc-400">3D Motion</h2>
          <div className="h-64 rounded bg-black/40">
            <Canvas camera={{ position: [3, 3, 3] }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} />
              <mesh rotation={[data.motion.x, data.motion.y, data.motion.z]}>
                <boxGeometry args={[1, 2, 0.5]} />
                <meshStandardMaterial color="#60a5fa" />
              </mesh>
            </Canvas>
          </div>
        </div>
        <div className="md:col-span-6 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <h2 className="mb-2 text-sm font-medium text-zinc-400">Lactate Threshold</h2>
          <div className="text-3xl font-bold">{data.lactateThreshold.toFixed(2)} mmol/L</div>
        </div>
      </div>
    </div>
  )
}
