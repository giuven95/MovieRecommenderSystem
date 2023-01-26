import React from "react";
import "./Home.css";
import { useForm } from 'react-hook-form';
import useStore from '../hooks/useStore';
import BACKEND_API_URL from "../constants/BACKEND_API_URL";
import JobStatusBar from "../components/job/JobStatusBar";

function Home() {
  const { register, handleSubmit } = useForm();
  const setJobId = useStore(state => state.setJobId);

  function onSubmit(data) {
    const endpoint = '/request';
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    };
  
    fetch(BACKEND_API_URL + endpoint, options)
      .then((response) => response.json())
      .then((data) => setJobId(data.id))
      .catch((error) => console.error('Error:', error));
  }

  return (
    <div className="Home AppPage">
      <h2>Find movies you will like!</h2>
      <div className="AppContainer">
        <form className="AppForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="AppFormGroup">
            <label htmlFor="name">
              Insert your Letterboxd profile name:
            </label>
            <input
              type="text"
              {...register("name")}
            />
          </div>
          <div className="AppFormGroup">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div className="AppContainer">
        <JobStatusBar />
      </div>
    </div>
  );
}

export default Home;