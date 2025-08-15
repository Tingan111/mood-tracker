import React from "react";
const MoodTextarea = ({ text, setText }) => {
  return (
    <textarea
      value={text}
      placeholder="發生什麼事"
      onChange={(e) => setText(e.target.value)}
      className="border-1  p-4 m-2 "
      rows="3"
    ></textarea>
  );
};

export default MoodTextarea;
