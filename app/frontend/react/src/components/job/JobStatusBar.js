import { useEffect } from 'react';
import useStore from '../../hooks/useStore';
import POLLING_DELAY_MS from '../../constants/POLLING_DELAY_MS';
import STATUS_TO_STRING from '../../constants/STATUS_TO_STRING';
import BACKEND_API_URL from "../../constants/BACKEND_API_URL";

const JobStatusBar = () => {
  const jobId = useStore(state => state.jobId);
  const jobStatus = useStore(state => state.jobStatus);
  const setJobStatus = useStore(state => state.setJobStatus);

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
            </p></>
            ) : (
            <p><strong>No job in progress</strong></p>
        )}
    </div>
  );
};

export default JobStatusBar;