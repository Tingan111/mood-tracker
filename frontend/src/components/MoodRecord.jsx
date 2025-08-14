import React from "react";

const MoodRecord=({ record, deleteRecord }) => {
    return (
      <div key={record.id} className="bg-white p-2 mb-2 rounded">
        <div>{record.score}</div>
        <div>{record.text}</div>
        <div>{record.date + record.time}</div>
        <button
          onClick={() => deleteRecord(record.id)}
          className="border-1 bg-red-200"
        >
          刪除紀錄
        </button>
      </div>
    );
  };

  export default MoodRecord;