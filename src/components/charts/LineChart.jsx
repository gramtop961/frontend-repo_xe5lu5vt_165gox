import React, { useMemo, useRef, useEffect } from 'react'
import * as d3 from 'd3'

export function LineChart({ series = [], color = '#22d3ee' }) {
  const ref = useRef(null)

  const data = useMemo(() => series.map(d => ({ t: new Date(d.t), v: d.v })), [series])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const width = el.clientWidth
    const height = 200

    const svg = d3.select(el).html('').append('svg').attr('width', width).attr('height', height)

    const x = d3.scaleTime().domain(d3.extent(data, d => d.t)).range([32, width - 12])
    const y = d3.scaleLinear().domain(d3.extent(data, d => d.v)).nice().range([height - 24, 12])

    const line = d3.line().x(d => x(d.t)).y(d => y(d.v)).curve(d3.curveMonotoneX)

    const g = svg.append('g')
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2)
      .attr('d', line)

    const xAxis = d3.axisBottom(x).ticks(5)
    const yAxis = d3.axisLeft(y).ticks(4)

    g.append('g').attr('transform', `translate(0, ${height - 24})`).call(xAxis).selectAll('text').attr('fill', '#a1a1aa')
    g.append('g').attr('transform', `translate(32, 0)`).call(yAxis).selectAll('text').attr('fill', '#a1a1aa')

    g.selectAll('.domain, .tick line').attr('stroke', '#3f3f46')
  }, [data, color])

  return <div ref={ref} className="w-full" />
}
