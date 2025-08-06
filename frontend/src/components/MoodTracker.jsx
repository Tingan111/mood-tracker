import { useState } from "react";

const MoodTracker = () => {
  const [score, setScore] = useState("");
  const [text, setText] = useState("");
  const handleSubmit = () => {
    setScore("");
    setText("");
  };

  return (
    <div className="bg-red-100 p-1 m-1 border-2--">
      <select value={score} onChange={(e) => setScore(e.target.value)}>
        <option value="">選擇心情分數</option>
        <option value="1">1 - 😢 很糟</option>
        <option value="2">2 - 😔 還好</option>
        <option value="3">3 - 😐 平靜</option>
        <option value="4">4 - 🙂 不錯</option>
        <option value="5">5 - 😊 開心</option>
      </select>
      <textarea
        value={text}
        placeholder="發生什麼事"
        rows="3"
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="text-red-200">{score}</div>
      <div className="text-sky-200">{text}</div>
      <button onClick={handleSubmit}>清空</button>
    </div>
  );
};

export default MoodTracker;
