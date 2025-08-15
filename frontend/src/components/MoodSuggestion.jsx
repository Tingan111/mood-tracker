const MoodSuggestion = ({ score, getSuggestion }) => {
  return <div>建議： {score && <div>{getSuggestion(score)}</div>}</div>;
};

export default MoodSuggestion;
