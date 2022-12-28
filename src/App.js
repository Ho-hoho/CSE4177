import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

//const axios = require('axios');
import axios from 'axios';
function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const datas = await axios.get("http://localhost:8080/current");
      setData(datas.data);
    };
    getData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

if(data !== null){
 return (
   <div className="container">
      <Router>
      <Navbar />
      <br/>
      <h3>{data.curTemp}</h3>
      <h3>{data.tempLimits}</h3>
      <br/>
      <Routes>
      <Route path="/" exact element={<ExercisesList/>} />
      <Route path="/create" element={<CreateExercise/>} />
      <Route path="/user" element={<CreateUser/>} />
      </Routes>
      </Router>
   </div>
 );
}
else{
  <div className="container">
      <Router>
      <Navbar />
      <br/>
      <br/>
      <br/>
      <Routes>
      <Route path="/" exact element={<ExercisesList/>} />
      <Route path="/create" element={<CreateExercise/>} />
      <Route path="/user" element={<CreateUser/>} />
      </Routes>
      </Router>
   </div>
}
}
 
export default App;