import * as d3 from 'd3';
import { useRef, useEffect, useState } from 'react';

interface row {
  date: String;
  name_jp: String;
  npatients: String;
  npatients_day: number;
}

interface PropTypes {
  rows: row[];
}

const GitHubCalendar: React.FC<PropTypes> = (props) => {
  const ref = useRef(null);
  const [rect, setRect] = useState<any>(null);
  const width = 960;
  const height = 136;
  const cellSize = 17;

  const pathMonth = (t0: any) => {
    const t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0);
    const d0 = t0.getDay();
    const w0 = d3.timeWeek.count(d3.timeYear(t0), t0);
    const d1 = t1.getDay();
    const w1 = d3.timeWeek.count(d3.timeYear(t1), t1);

    return `M${(w0 + 1) * cellSize},${d0 * cellSize}H${w0 * cellSize}V${
      7 * cellSize
    }H${w1 * cellSize}V${(d1 + 1) * cellSize}H${(w1 + 1) * cellSize}V0H${
      (w0 + 1) * cellSize
    }Z`;
  };

  const formatPercent = d3.format('.1%');
  const colors = [
    '#FFF9B1',
    '#FFE9A9',
    '#FCD7A1',
    '#F8C499',
    '#F5B090',
    '#F29B76',
    '#EF845C',
    '#ED6D46',
    '#EA5532',
    '#E83820',
    '#E60012',
  ];

  const color = d3.scaleQuantize<string>().domain([0, 6000]).range(colors);

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .selectAll('svg')
      .data(d3.range(2020, 2023))
      .enter()
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr(
        'transform',
        'translate(' +
          (width - cellSize * 53) / 2 +
          ',' +
          (height - cellSize * 7 - 1) +
          ')',
      );

    svg
      .append('text')
      .attr('transform', 'translate(-6,' + cellSize * 3.5 + ')rotate(-90)')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'middle')
      .text((d) => d);

    const rect = svg
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .selectAll('rect')
      .data((d) => d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
      .enter()
      .append('rect')
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('x', (d) => d3.timeWeek.count(d3.timeYear(d), d) * cellSize)
      .attr('y', (d) => d.getDay() * cellSize)
      .datum(d3.timeFormat('%Y-%m-%d'));

    setRect(rect);

    svg
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#000')
      .selectAll('path')
      .data((d) => d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
      .enter()
      .append('path')
      .attr('d', pathMonth);
  }, []);

  useEffect(() => {
    if (rect === null) return;

    const data = d3.rollup(
      props.rows,
      (d) => d[0].npatients_day,
      (d) => d.date,
    );

    const filtered = rect
      .filter((d: any) => data.has(d))
      .attr('fill', (d: any) => {
        return color(Number(data.get(d)));
      });
  }, [props.rows]);

  return <div ref={ref}></div>;
};

export default GitHubCalendar;
