import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">My <br/>Weather</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Weather & Clothing Logs</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Clothing Logs</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Save Clothing</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}