import useStore from '../../hooks/useStore';
import STATUS_TO_STRING from '../../constants/STATUS_TO_STRING';
import BACKEND_API_URL from "../../constants/BACKEND_API_URL";
import StopIcon from '@mui/icons-material/Stop';
import BeatLoader from "react-spinners/BeatLoader";
import "./JobStatusBar.css";

const JobStatusBar = () => {
  const canSubmit = useStore(state => state.canSubmit);
  const jobId = useStore(state => state.jobId);
  const jobStatus = useStore(state => state.jobStatus);
  const stopJob = useStore(state => state.stopJob);

  function handleStopClick() {
    stopJob();
    fetch(BACKEND_API_URL + `/stop/${jobId}`, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="JobStatusBar">
      <div className="AppGroup">
        <p>
          <strong>Job ID: </strong>{jobId}
        </p>
        <p>
          <strong>Status: </strong>{STATUS_TO_STRING[jobStatus]}
        </p>
        <p>
          {((jobStatus !== "DONE") && !canSubmit) ? <BeatLoader color="black" /> : <strong>The job is not running.</strong>}
        </p>
      </div>
      {(canSubmit) ? "" : <div className="AppGroup">
        <button className="AppButton AppStopButton" type="button" onClick={handleStopClick}>
          <StopIcon />
          Stop
        </button>
      </div>}
    </div>
  );
};

export default JobStatusBar;