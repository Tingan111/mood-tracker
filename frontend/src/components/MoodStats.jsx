const MoodStats = ({ records, averageScore }) => {
  return (
    <div className="bg-white bg-opacity-50">
      <h3>統計資料</h3>
      <p>總紀錄數：{records.length}</p>
      <p>平均分數：{averageScore()}</p>
    </div>
  );
};

export default MoodStats;
