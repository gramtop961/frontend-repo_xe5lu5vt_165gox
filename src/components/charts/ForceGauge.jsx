import React, { useEffect, useRef } from 'react'

export function ForceGauge({ value = 0, min = 0, max = 100 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const canvas = document.createElement('canvas')
    canvas.width = el.clientWidth
    canvas.height = 160
    el.innerHTML = ''
    el.appendChild(canvas)
    const ctx = canvas.getContext('2d')

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const w = canvas.width
      const h = canvas.height
      const radius = Math.min(w, h * 2) * 0.45
      const cx = w / 2
      const cy = h * 0.95

      // background
      ctx.beginPath()
      ctx.arc(cx, cy, radius, Math.PI, 2 * Math.PI)
      ctx.strokeStyle = '#27272a'
      ctx.lineWidth = 12
      ctx.stroke()

      const pct = (value - min) / (max - min)
      const angle = Math.PI + pct * Math.PI

      // foreground
      ctx.beginPath()
      ctx.arc(cx, cy, radius, Math.PI, angle)
      ctx.strokeStyle = '#34d399'
      ctx.lineWidth = 12
      ctx.stroke()

      // needle
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius)
      ctx.strokeStyle = '#a7f3d0'
      ctx.lineWidth = 2
      ctx.stroke()

      // text
      ctx.fillStyle = '#e5e7eb'
      ctx.font = 'bold 20px Inter, system-ui, -apple-system, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`${value}%`, cx, cy - 20)
    }

    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [value, min, max])

  return <div ref={ref} className="w-full" />
}
