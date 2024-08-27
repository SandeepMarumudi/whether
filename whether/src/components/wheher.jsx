import { Component } from "react";
import axios from "axios";

class Whether extends Component {
  state = {
    response: null,
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

  render() {
    return (
      <>
        <h1>Whether report</h1>
        <h2>current locaion={this.state.response?.name}</h2>
        <h3>max temperature={this.state.response?.main.temp_max}</h3>
        <h3>min temperature={this.state.response?.main.temp_min}</h3>
      </>
    );
  }
}
export default Whether;
