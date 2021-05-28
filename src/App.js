//import all the required libraries

import React, {Component} from 'react';
import './App.css';
import LineChart from './LineChart';
import DeviceA from './DeviceA';
import DeviceB from './DeviceB';
import DeviceC from './DeviceC';
import Wind from './Wind';
import styled,{ThemeProvider} from 'styled-components';
import {lightTheme,darkTheme,GlobalStyles} from './theme';

const StyledApp=styled.div``;

class App extends Component {
  constructor(props){
    super(props);
  this.state = {
    values: {},//values which will be filled up by devices
    device: 'DeviceA', //current device we are looking at
    theme:'Dark Mode'
  }
  this.themeToggler = this.themeToggler.bind(this);
  };
  
//function to toggle between darkmode and lightmode
themeToggler() {
  (this.state.theme === "Dark Mode") ? this.setState({theme:"Light Mode"}) : this.setState({theme:"Dark Mode"});
};

  componentDidMount() {
    //to fetch all the json files which I converted it from csv and then sets it into state
    Promise.all([
      fetch(`./csvjson1.json`),
      fetch(`./csvjson.json`),
      fetch(`./csvjson2.json`),
    ]).then(responses => Promise.all(responses.map(resp => resp.json())))
    .then(([DeviceA, DeviceB, DeviceC]) => {       //storing the data of different json files into different components
      DeviceA.forEach(day => day.t = new Date(day.t));
      DeviceB.forEach(day => day.t = new Date(day.t));
      DeviceC.forEach(day => day.t = new Date(day.t));
      this.setState({values: {DeviceA, DeviceB, DeviceC}});
    });
  }
//function to update the dropdown box
  updatedevice = (e) => {
    this.setState({device: e.target.value});
  }
  render() {
    const datas = this.state.values[this.state.device];
    const matters=this.state.values['DeviceA'];
    const matters1=this.state.values['DeviceB'];
    const matters2=this.state.values['DeviceC'];
    
    return (
      <ThemeProvider theme={this.state.theme==="Light Mode"?lightTheme:darkTheme}>
        <GlobalStyles/>
        <StyledApp>
      <div className="App">
       
        <h1>
          
          <select name='device' onChange={this.updatedevice} >
            {//to render the dropdown
              [
                {label: 'Device A', value: 'DeviceA'},
                {label: 'Device B', value: 'DeviceB'},
                {label: 'Device C', value: 'DeviceC'},
              ].map(option => {
                return (<option key={option.value} value={option.value}>{option.label}</option>);
              })
            }
          </select>
          <button onClick={this.themeToggler }>{this.state.theme}</button>
        </h1>
        <div className='linechart'>
          <h3>{this.state.device}</h3>
        <LineChart data={datas} />
        </div>
        <br/>
        <h3>Wind Speed for {this.state.device}</h3>
        <Wind data={datas}/>
        <br/>
          <br/>
        <div className='device'>
          <h3>PM1</h3>
          <DeviceA matter={matters} matter1={matters1} matter2={matters2} />
  
          <h3>PM10</h3>
          <DeviceB matter={matters} matter1={matters1} matter2={matters2} />
          
          <h3>PM25</h3>
          <DeviceC matter={matters} matter1={matters1} matter2={matters2} />
        </div>

        
      </div>
      </StyledApp>
      </ThemeProvider>
      //1)Used linechart class component to display the graph between a particular device selected from dropdown and all the 
      //particulate matter values.
      //2)Used wind class component to display the graph between a particular device and wind speed.
      //3)Used DeviceA component to display the graph between all the three devices and PM1 value.
      //4)Used DeviceB component to display the graph between all the three devices and PM10 value.
      //5)Used DeviceC component to display the graph between all the three devices and PM25 value.
    );
  }
}
export default App;
