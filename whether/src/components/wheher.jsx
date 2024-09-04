import { Component } from "react";
import axios from "axios";
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

class Whether extends Component {
  state = {
    response: null,
    input:""
  };
  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    if (navigator?.geolocation) {
      navigator?.geolocation?.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        if (latitude && longitude) {
          this.fetchdata(latitude, longitude);
        }
      });
    } else {
      console.log("user error throw");
    }
  }
  fetchdata = async (latitude, longitude) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f693296ac14bc5ee60ca74b64280291a`
    );
    console.log(data);
    this.setState({
      response: data,
    });
    console.log(this.state.response);
  };
  getdata=(e)=>{
    e.preventDefault()
    this.getinputdata(this.state.input)
  }

  getinputdata=async(input)=>{
    const {data}= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=f693296ac14bc5ee60ca74b64280291a`)
    const {main}=data
    this.setState({input:main})
  }
  datachange=(e)=>{
    this.setState({
      input:e.target.value
    })
  }

  render() {
    return (
      <>
      {  <form onSubmit={this.getdata}>
          <input type="text" placeholder="Enter location" value={this.state.input} onChange={this.datachange} ></input>
          <input type="submit" ></input>
      </form>
      }
        <h1>Whether report</h1>
        <h2>current location={this.state.response?.name}</h2>
        <h3>max temperature={this.state.response?.main.temp_max}</h3>
        <h3>min temperature={this.state.response?.main.temp_min}</h3>

        <h2>{this.state.input.temp}</h2>
    
      </>
    );
  }
}
export default Whether;
