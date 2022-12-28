import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeClothing = this.onChangeClothing.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
          clothing: ''
        };
      }

      onChangeClothing(e) {
        this.setState({
          clothing: e.target.value
        });
      }
      onSubmit(e) {
        e.preventDefault();
        const newUser = {
          clothing: this.state.clothing,
        };
        console.log(newUser);
        axios.post('http://localhost:8080/users/add', newUser)
        .then(res => console.log(res.data));
        this.setState({
          clothing: ''
        })
      }
  render() {
    return (
        <div>
        <h3>Create New Clothing</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Clothing: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.clothing}
                onChange={this.onChangeClothing}
                />
          </div>
          <br/>
          <div className="form-group">
            <input type="submit" value="Create Clothing" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}