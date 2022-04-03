import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

console.log(d3);

const PunchCard = () => {
  const ref = useRef(null);

  useEffect(() => {
    d3.select(ref.current)
      .selectAll('div')
      .data(d3.pairs(d3.range(10)))
      .enter()
      .append('div')
      .style('width', (d) => d[1] * 10 + 'px')
      .style('height', (d) => d[0] * 10 + 'px')
      .style('background-color', (d) => d3.interpolateRainbow(d[0] / 10));
  }, []);

  return <div ref={ref}></div>;
};

export default PunchCard;
