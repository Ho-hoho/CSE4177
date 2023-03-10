import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>{props.exercise.temperature}</td>
      <td>{props.exercise.clothing}</td>
      <td>{props.exercise.description}</td>
      <td>
        <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
      </td>
    </tr>
  )

export default class ExercisesList extends Component {

    constructor(props) {
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = {exercises: []};
      }

      componentDidMount() {
        axios.get('http://localhost:8080/exercises/')
         .then(response => {
           this.setState({ exercises: response.data });
         })
         .catch((error) => {
            console.log(error);
         })
      }

      deleteExercise(id) {
        axios.delete('http://localhost:8080/exercises/'+id)
          .then(res => console.log(res.data));
        this.setState({
          exercises: this.state.exercises.filter(el => el._id !== id)
        })
      }
    

      exerciseList() {
        return this.state.exercises.map(currentexercise => {
          return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
      }
      
  render() {
    return (
        <div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Date</th>
              <th>Temperature</th>
              <th>My Clothing</th>
              <th>Nice Choice?</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}