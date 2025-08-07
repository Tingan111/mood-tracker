import { useState } from "react";

const MoodTracker = () => {
  const [score, setScore] = useState("");
  const [text, setText] = useState("");
  const handleSubmit = () => {
    setScore("");
    setText("");
  };
  const getMoodColor = (score) => {
    if (!score) return "bg-gray-100";
    const numScore = Number(score); // 轉成數字

    if (numScore <= 2) return "bg-red-100";
    if (numScore === 3) return "bg-yellow-100";
    return "bg-green-100";
  };

  const getSuggestion = (score) => {
    if (score <= 2) return "要不要做點讓自己開心的事？";
    if (score === "3") return "平靜也是很好的狀態";
    return "太棒了！繼續保持！";
  };
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
          清空
        </button>
      </div>
    </div>
  );
};

export default MoodTracker;
