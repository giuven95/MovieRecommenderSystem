import { useEffect } from 'react';
import useStore from '../../hooks/useStore';
import POLLING_DELAY_MS from '../../constants/POLLING_DELAY_MS';
import STATUS_TO_STRING from '../../constants/STATUS_TO_STRING';
import BACKEND_API_URL from "../../constants/BACKEND_API_URL";
import StopIcon from '@mui/icons-material/Stop';

const JobStatusBar = () => {
  const canSubmit = useStore(state => state.canSubmit);
  const jobId = useStore(state => state.jobId);
  const jobStatus = useStore(state => state.jobStatus);
  const setJobStatus = useStore(state => state.setJobStatus);
  const stopJob = useStore(state => state.stopJob);

  function handleStopClick() {
    stopJob();
    fetch(`/stop/${jobId}`, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

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
  }, [jobId, setJobStatus]);

  return (
    <div className="JobStatusBar">
        {jobId ? (
            <><p>
                <strong>Job ID: </strong>{jobId}
            </p>
            <p>
                <strong>Status: </strong>{STATUS_TO_STRING[jobStatus]}
            </p>
            {(canSubmit) ? "" : <div className="AppFormGroup">
              <button className="AppStopButton" type="button" onClick={handleStopClick}>
                <StopIcon />
                Stop
              </button>
            </div>}
            </>
            ) : (
            <p><strong>No job in progress</strong></p>
        )}
    </div>
  );
};

export default JobStatusBar;