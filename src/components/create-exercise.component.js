import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeClothing = this.onChangeClothing.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeTemperature = this.onChangeTemperature.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      clothing: '',
      description: '',
      temperature: '',
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8080/users/')
    .then(response => {
        if (response.data.length > 0) {
        this.setState({ 
            users: response.data.map(user => user.clothing),
            clothing: response.data[0].clothing
        });
        }
    })
    .catch((error) => {
        console.log(error);
    })
  }

  onChangeClothing(e) {
    this.setState({
      clothing: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeTemperature(e) {
    this.setState({
      temperature: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();
  
    const exercise = {
      clothing: this.state.clothing,
      description: this.state.description,
      temperature: this.state.temperature,
      date: this.state.date,
    };
  
    console.log(exercise);
    axios.post('http://localhost:8080/exercises/add', exercise)
    .then(res => console.log(res.data));
    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Clothing Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Clothing: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.clothing}
                onChange={this.onChangeClothing}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-group">
            <label>Temperature : </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.temperature}
                onChange={this.onChangeTemperature}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <br/>
          <div className="form-group">
            <input type="submit" value="Create Clothing Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}