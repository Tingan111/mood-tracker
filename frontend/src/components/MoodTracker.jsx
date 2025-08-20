import { useState, useEffect } from "react";
import MoodChart from "./MoodChart";
import MoodRecord from "./MoodRecord";
import MoodSelect from "./MoodSelect";
import MoodTextarea from "./MoodTextarea";
import MoodSuggestion from "./MoodSuggestion";
import MoodStats from "./MoodStats";

const MoodTracker = () => {
  const [score, setScore] = useState("");
  const [text, setText] = useState("");
  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingScore, setEditingScore] = useState("");
  const [editingText, setEditingText] = useState("");

  const getMoodColor = (score) => {
    if (!score) return "bg-gray-100";
    const numScore = Number(score); // 轉成數字

    if (numScore <= 2) return "bg-red-100";
    if (numScore === 3) return "bg-yellow-100";
    return "bg-green-100";
  };

  const addRecord = () => {
    if (!score) return;
    const newRecord = {
      id: Date.now(),
      score: parseInt(score),
      text: text || "沒有備注",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
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

  const startEdit = (record) => {
    setEditingId(record.id);
    setEditingScore(record.score.toString());
    setEditingText(record.text);
  };

  const saveEdit = () => {
    if (!editingScore) return;
    setRecords(
      records.map((record) =>
        record.id === editingId
          ? {
              ...record,
              score: parseInt(editingScore),
              text: editingText || "沒有備注",
            }
          : record
      )
    );
    setEditingId(null);
    setEditingScore("");
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingScore("");
    setEditingText("");
  };
  useEffect(() => {
    if (records.length > 0) {
      localStorage.setItem("moodRecords", JSON.stringify(records));
    } else {
      localStorage.removeItem("moodRecords");
    }
  }, [records]);

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

  return (
    <div className="p-1 m-1 border-2 ">
      <h2 className="text-xl font-bold mb-4 ">心情追蹤器</h2>
      <div>
        <MoodSelect
          score={score}
          setScore={setScore}
          getMoodColor={getMoodColor}
        />
      </div>
      <MoodTextarea text={text} setText={setText} />
      <div>
        顯示狀態區
        <div className="text-200 p-4 m-2 border-1">分數：{score}</div>
        <div className="text-200 p-4 m-2 border-1">發生什麼事：{text}</div>
      </div>
      {/* 統計區域 */}
      <button onClick={addRecord} className="border-1 bg-green-100">
        紀錄
      </button>
      <MoodStats records={records} averageScore={getAverageScore} />
      {/* 歷史紀錄*/}
      {records.length === 0 ? (
        <div>開始紀錄心情吧</div>
      ) : (
        records.map((record) => (
          <MoodRecord
            key={record.id}
            record={record}
            deleteRecord={deleteRecord}
            editingId={editingId}
            editingScore={editingScore}
            setEditingScore={setEditingScore}
            editingText={editingText}
            setEditingText={setEditingText}
            startEdit={startEdit}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            getMoodColor={getMoodColor}
          />
        ))
      )}
      {/*統計圖表區*/}
      <MoodChart moodRecords={records} />
    </div>
  );
};

export default MoodTracker;
