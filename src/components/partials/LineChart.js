import React, { Component } from 'react';
import * as d3 from 'd3';

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
    this.mounted = false;
  }

  componentDidMount() {
    const { data, width, height } = this.props;
    if (data.length > 0) {
      this.setState({ data: data });
    }

    const minX = 0;
    const maxX = 23;
    const minY = d3.min(data.map(item => item.count));
    const maxY = d3.max(data.map(item => item.count));

    let x = d3
      .scaleLinear()
      .domain([ minX - 0.5, maxX + 0.5 ])
      .range([ 0, width ]);

    let y = d3
      .scaleLinear()
      .domain([ minY - 6, maxY ])
      .range([ height, height / 3 ]);

    this.line = d3
      .line()
      .x(d => x(d.time))
      .y(d => y(d.count));

    this.area = d3
      .area()
      .x(d => x(d.time))
      .y0(() => maxY)
      .y1(d => y(d.count));

    const margin = 5;
    // const xFormat = d3.format('.2');
    const h = height - 1 * margin, w = width - 1 * margin;
    this.xTicks = x.ticks(data.length).map(d => (
      <g key={d} transform={`translate(${x(d) - 5}, ${h})`}>
        <text
          fontSize="12"
        >
          {`${d}h`}
        </text>
        <line x1="0" x1="0" y1="0" y2="5" transform="translate(0, -20)"/>
      </g>
    ))
    this.mounted = true;
  }

  componentDidUpdate() {
    let line = d3.selectAll('.line');
    let totalLength = line.node().getTotalLength();

    line
      .attr('stroke-dasharray', totalLength)
      .attr('stroke-dashoffset', totalLength)
      .attr('stroke-width', 10)
      .attr('stroke', '#425cbb')
      .transition()
      .duration(3000)
      .attr('stroke-width', 0)
      .attr('stroke-dashoffset', 0);

    let area = d3.selectAll('.area');
    area
      .attr('transform', 'translate(0, 300)')
      .transition()
      .duration(2000)
      .attr('fill', '#eaedfc')
      .attr('transform', 'translate(0, 0)');
  }

  render() {
    const { data } = this.state;
    console.log('data: ',data);
    if (!this.mounted) {
      return <div>Loading</div>;
    }
    return (
      <div className="line-chart">
        <svg width={this.props.width} height={this.props.height}>
          <g>
            <path
              className="line"
              d={this.line(data)}
              fill="#637ee3"
              stroke="transparent"
            />
            <path
              className="area"
              d={this.area(data)}
              fill="#ddd"
              style={{ opacity: 0.5 }}
            />
          </g>
          <g className="axis-labels">
            {this.xTicks}
          </g>
        </svg>
      </div>
    );
  }
}

export default LineChart;
