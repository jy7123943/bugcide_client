import React, { Component } from 'react';
import * as d3 from 'd3';

class BubbleChart extends Component {
  constructor(props) {
    super(props);

    this.minValue = 1;
    this.maxValue = 100;
    this.mounted = false;
    this.state = {
      data: []
    };

    this.radiusScale = this.radiusScale.bind(this);
    this.simulatePositions = this.simulatePositions.bind(this);
    this.renderBubbles = this.renderBubbles.bind(this);
  }

  componentWillMount() {
    this.mounted = true;
  }

  componentDidMount() {
    if (this.props.data.length > 0) {
      this.minValue = 0.95 * d3.min(this.props.data, item => item.count);
      this.maxValue = 1.05 * d3.max(this.props.data, item => item.count);

      this.simulatePositions(this.props.data);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  radiusScale = value => {
    const fx = d3
      .scaleSqrt()
      .range([ 20, 100 ])
      .domain([ this.minValue, this.maxValue ]);

    return fx(value);
  }

  simulatePositions = data => {
    this.simulation = d3
      .forceSimulation()
      .nodes(data)
      .velocityDecay(0.5)
      .force('x', d3.forceX().strength(0.05))
      .force('y', d3.forceY().strength(0.05))
      .force(
        'collide',
        d3.forceCollide(d => this.radiusScale(d.count) + 2)
      )
      .on('tick', () => {
        if (this.mounted) {
          this.setState({ data });
        }
      });
  }

  renderBubbles = data => {
    const minValue = 0.95 * d3.min(data, item => item.count);
    const maxValue = 1.05 * d3.max(data, item => item.count);

    const color = d3
      .scaleLinear()
      .domain([ minValue, maxValue ])
      .interpolate(d3.interpolateHcl)
      .range(['#333', '#999']);

    const texts = data.map((item, index) => {
      const fontSize = this.radiusScale(item.count) / 3;
      const props = this.props;

      return (
        <g
          key={index}
          transform={`translate(${props.width / 2 + item.x}, ${props.height / 2 + item.y})`}
        >
          <circle
            r={this.radiusScale(item.count)}
            fill={color(item.count)}
            stroke={d3.rgb(color(item.count)).brighter(2)}
            strokeWidth="2"
          />
          <text
            dy="6"
            fill="#fff"
            textAnchor="middle"
            fontSize={`${fontSize}px`}
            fontWeight="bold"
          >
            {item.title}
          </text>
        </g>
      );
    });

    return texts;
  }

  render() {
    if (!this.state.data.length) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <svg width={this.props.width} height={this.props.height}>
          {this.renderBubbles(this.state.data)}
        </svg>
      </div>
    );
  }
}

export default BubbleChart;
