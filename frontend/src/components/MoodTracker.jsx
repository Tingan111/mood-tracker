import { useState, useEffect } from "react";

const MoodTracker = () => {
  const [score, setScore] = useState("");
  const [text, setText] = useState("");
  const [records, setRecords] = useState([]);
  const handleSubmit = () => {
    setScore("");
    setText("");
  };

  const MoodRecord = ({ record, deleteRecord }) => {
    return (
      <div key={record.id} className="bg-white p-2 mb-2 rounded">
        <div>{record.score}</div>
        <div>{record.text}</div>
        <div>{record.date}</div>
        <button
          onClick={() => deleteRecord(record.id)}
          className="border-1 bg-red-200"
        >
          刪除紀錄
        </button>
      </div>
    );
  };
  const getMoodColor = (score) => {
    if (!score) return "bg-gray-100";
    const numScore = Number(score); // 轉成數字

    if (numScore <= 2) return "bg-red-100";
    if (numScore === 3) return "bg-yellow-100";
    return "bg-green-100";
  };

  const getSuggestion = (score) => {
    const numScore = Number(score);
    if (numScore <= 2) return "要不要做點讓自己開心的事？";
    if (numScore === 3) return "平靜也是很好的狀態";
    return "太棒了！繼續保持！";
  };

  const addRecord = () => {
    if (!score) return;
    const newRecord = {
      id: Date.now(),
      score: parseInt(score),
      text: text || "沒有備注",
      date: new Date().toLocaleDateString(),
    };
    setRecords([...records, newRecord]);

    setScore("");
    setText("");
  };
  const getAverageScore = () => {
    if (records.length === 0) return 0;
    const total = records.reduce((sum, record) => sum + record.score, 0);
    return (total / records.length).toFixed(1);
  };

  const deleteRecord = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };
  useEffect(() => {
    const saved = localStorage.getItem("moodRecords");
    if (saved) {
      try {
        setRecords(JSON.parse(saved));
      } catch (error) {
        console.error("載入資料失敗", error);
      }
    }
  }, []);

  useEffect(() => {
    if (records.length > 0) {
      localStorage.setItem("moodRecords", JSON.stringify(records));
    }else{
      localStorage.removeItem('moodRecords')
    }
  }, [records]);

  return (
    <div className="bg-white-100 p-1 m-1 border-2 ">
      <h2 className="text-xl font-bold mb-4">心情追蹤器</h2>
      <div>
        <select
          value={score}
          className={`${getMoodColor(score)} p-4 m-2 border-2`}
          onChange={(e) => setScore(e.target.value)}
        >
          <option value="">選擇心情分數</option>
          <option value="1">1 - 😢 很糟</option>
          <option value="2">2 - 😔 還好</option>
          <option value="3">3 - 😐 平靜</option>
          <option value="4">4 - 🙂 不錯</option>
          <option value="5">5 - 😊 開心</option>
        </select>
      </div>
      <textarea
        value={text}
        placeholder="發生什麼事"
        onChange={(e) => setText(e.target.value)}
        className="border-1  p-4 m-2 "
        rows="3"
      ></textarea>

      <div>建議： {score && <div>{getSuggestion(score)}</div>}</div>
      <div>
        顯示狀態區
        <div className="text-200 p-4 m-2 border-1">分數：{score}</div>
        <div className="text-200 p-4 m-2 border-1">發生什麼事：{text}</div>
        <button className="border-1" onClick={handleSubmit}>
          清空內容
        </button>
      </div>
      {/* 統計區域 */}
      <button onClick={addRecord} className="border-1 bg-green-100">
        紀錄
      </button>
      <div className="bg-white bg-opacity-50">
        <h3>統計資料</h3>
        <p>總紀錄數：{records.length}</p>
        <p>平均分數：{getAverageScore()}</p>
      </div>
      {/* 歷史紀錄*/}
      {records.length === 0 ? (
        <div>開始紀錄心情吧</div>
      ) : (
        records.map((record) => (
          <MoodRecord
            key={record.id}
            record={record}
            deleteRecord={deleteRecord}
          />
        ))
      )}
    </div>
  );
};

export default MoodTracker;
