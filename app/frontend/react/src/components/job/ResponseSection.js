import useStore from '../../hooks/useStore';
import "./ResponseSection.css";

const ResponseSection = () => {
  const jobResponse = useStore(state => state.jobResponse);

  if (jobResponse === null) return "";

  if (jobResponse.length === 0) return "";

  return (
    <div className="ResponseSection">
      {jobResponse.map(item => <div className="ResponseItem">
        <div className="ResponseName">{item.name}</div>
        <div className="ResponseScore">{item.score}</div>
      </div>)}
    </div>
  );
};

export default ResponseSection;