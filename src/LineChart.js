//import d3 for the construction of graphs

import React, { Component } from 'react';
import * as d3 from 'd3';
const width = 950;//specifying the width of the graph
const height = 400;//specifying the height of the graph
const margin = {top: 20, right: 50, bottom: 20, left: 35};
const red = '#eb6a5b';
const blue = '#52b6ca';
const green= '#008000';
const dates='Date';
const matter='Particulate Matter'
const deva='PM1';
const devb='PM10';
const devc='PM25';


class LineChart extends Component {
  constructor(props){
    super(props)
  }
  state = {
    highs: null, 
    lows: null, 
  };
    //takes date and maps it to x-axis
    xScale= d3.scaleTime().range([margin.left, width - margin.right]);
    //takes in PM1 value and maps it to y-axis
    yScale= d3.scaleLinear().range([height - margin.bottom, margin.top]);
    //translates the data we gave into svg path commands.  
    lineGenerator=d3.line();
  
//code to show the x-axis
  xAxis = d3.axisBottom().scale(this.xScale)
    .tickFormat(d3.timeFormat('%m/%d'));
//code to show the y-axis    
  yAxis = d3.axisLeft().scale(this.yScale)
    .tickFormat(d => `${d}`);

  componentWillReceiveProps(nextProps){//will get data from parent component.
      const{data}=nextProps;
      if(!data)return alert('Data not loaded');//if data is not loaded then just return with an alert.

      //For x-axis we take the min and max date in our json file.
      const timeDomain = d3.extent(data,d=>d.t);
      //for y-axis we take the max value of PM1 value from our json file
      const tempMax=d3.max(data,d=>d.p1)
      //Update the scales with the above two values as domain
      this.xScale.domain(timeDomain);
      this.yScale.domain([0,tempMax+50]);//here 0 is the minimum and maximum is tempMax+50. 
      //X position will use the below scale.
      this.lineGenerator.x(d=>this.xScale(d.t));
      //Y position will use the below scale
      this.lineGenerator.y(d=>this.yScale(d.p1));
      //generates the line for PM1 data
      const highs=this.lineGenerator(data);
      this.lineGenerator.y(d=>this.yScale(d.p25));
      //generates the line for PM10 data
      const lows=this.lineGenerator(data);
      this.lineGenerator.y(d=>this.yScale(d.p10));
      //generates the line for PM25 data
      const mids=this.lineGenerator(data);
      this.setState({highs,lows,mids});
  }
//Used to update the component after d3 renders the data.
  componentDidUpdate() {
    d3.select(this.refs.xAxis).call(this.xAxis);
    d3.select(this.refs.yAxis).call(this.yAxis);
  }

  render() {
//we pass the data created using <path/> with all the required attributes.
//Then we create group elements.One for x-axis and one for y-axis. 
    return (
      <svg width={width} height={height} >
        <path d={this.state.highs} fill='none' stroke={red} strokeWidth='3'/>
        <path d={this.state.lows} fill='none' stroke={blue} strokeWidth='3' />
        <path d={this.state.mids} fill='none' stroke={green} strokeWidth='1' />
        <g>
          <g ref='xAxis' transform={`translate(0, ${height - margin.bottom})`}> 
          <text
          className="axis-label"
          
          textAnchor="middle"
          x={width / 2}
          y={22}
          >
          {dates}
        </text>
        <text
              className="axis-label"
              stroke={red}
              textAnchor="middle"
              x={width / 2}
              y={-368}
              >
              {deva}
            </text>
            <text
              className="axis-label"
              stroke={blue}
              textAnchor="middle"
              x={width / 2 + 70}
              y={-368}
              >
              {devb}
            </text>
            <text
              className="axis-label"
              stroke={green}
              textAnchor="middle"
              x={width / 2 + 140}
              y={-368}
              >
              {devc}
            </text>
        </g>
          <g ref='yAxis' transform={`translate(${margin.left}, 0)`} >
          <text
          className="axis-label"
          transform={`translate(${-7},${200}) rotate(-90)`}
          textAnchor="middle"
          x={2}
          y={-20}
          >
          {matter}
        </text>
          </g>
        </g>
      </svg>
    );
  }
}

export default LineChart;