import React from "react";

const MoodSelect = ({ score, setScore, getMoodColor }) => {
  return (
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
  );
};

export default MoodSelect;
