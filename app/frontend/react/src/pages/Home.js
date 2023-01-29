import React, { useEffect } from "react";
import "./Home.css";
import { useForm } from 'react-hook-form';
import useStore from '../hooks/useStore';
import BACKEND_API_URL from "../constants/BACKEND_API_URL";
import JobStatusBar from "../components/job/JobStatusBar";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ResponseSection from "../components/job/ResponseSection";
import POLLING_DELAY_MS from "../constants/POLLING_DELAY_MS";

function Home() {
  const { register, handleSubmit } = useForm();
  const jobId = useStore(state => state.jobId);
  const canSubmit = useStore(state => state.canSubmit);
  const startJob = useStore(state => state.startJob);
  const jobStatus = useStore(state => state.jobStatus);
  const jobResponse = useStore(state => state.jobResponse);
  const setJobResponse = useStore(state => state.setJobResponse);
  const setJobStatus = useStore(state => state.setJobStatus);

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

  useEffect(() => {
    let intervalId = null;

    if (jobStatus === "DONE" && jobResponse === null) {
      intervalId = setInterval(() => {
        fetch(BACKEND_API_URL + `/response/${jobId}`)
          .then((res) => res.json())
          .then((data) => {console.log(data); setJobResponse(data.response)})
          .catch((error) => console.error(error));
      }, POLLING_DELAY_MS);
    }

    return () => clearInterval(intervalId);
  }, [jobId, jobStatus, jobResponse]);

  useEffect(() => {
    let intervalId = null;

    if (jobId) {
      intervalId = setInterval(() => {
        fetch(BACKEND_API_URL + `/status/${jobId}`)
          .then((res) => res.json())
          .then((data) => setJobStatus(data.status))
          .catch((error) => console.error(error));
      }, POLLING_DELAY_MS);
    }

    return () => clearInterval(intervalId);
  }, [jobId]);

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
          {canSubmit? <div className="AppFormGroup">
            <button className="AppButton" type="submit">
              <PlayArrowIcon />
              Submit
            </button>
          </div> : ""}
        </form>
      </div>
      {jobStatus === null ? "" : <>
        <h3>Job status</h3>
        <div className="AppContainer">
          <JobStatusBar />
        </div>
      </>}
      {(jobResponse === null || jobResponse.length === 0) ? "" : <>
        <h3>Check out your results</h3>
        <div className="AppContainer">
          <ResponseSection />
        </div>
      </>}
    </div>
  );
}

export default Home;