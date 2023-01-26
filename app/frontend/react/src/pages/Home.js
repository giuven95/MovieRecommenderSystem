import React from "react";
import "./Home.css";
import { useForm } from 'react-hook-form';
import useStore from '../hooks/useStore';
import BACKEND_API_URL from "../constants/BACKEND_API_URL";
import JobStatusBar from "../components/job/JobStatusBar";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function Home() {
  const { register, handleSubmit } = useForm();
  const canSubmit = useStore(state => state.canSubmit);
  const startJob = useStore(state => state.startJob);

  function onSubmit(data) {
    const endpoint = '/request';
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    };
  
    fetch(BACKEND_API_URL + endpoint, options)
      .then((response) => response.json())
      .then((data) => startJob(data.id))
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
            <button type="submit">
              <PlayArrowIcon />
              Submit
            </button>
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