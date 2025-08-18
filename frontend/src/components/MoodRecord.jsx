import React from "react";

const MoodRecord = ({ 
  record, 
  deleteRecord,
  editingId,
  editingScore,
  setEditingScore,
  editingText,
  setEditingText,
  startEdit,
  saveEdit,
  cancelEdit,
  getMoodColor
}) => {
  const isEditing = editingId === record.id;

  return (
    <div key={record.id} className={`p-2 mb-2 rounded ${getMoodColor(record.score)}`}>
      {isEditing ? (
        // 編輯模式
        <div>
          <div>
            <label>分數：</label>
            <select 
              value={editingScore} 
              onChange={(e) => setEditingScore(e.target.value)}
              className="border p-1"
            >
              <option value="">請選擇</option>
              <option value="1">1 - 很糟</option>
              <option value="2">2 - 不好</option>
              <option value="3">3 - 普通</option>
              <option value="4">4 - 還好</option>
              <option value="5">5 - 很好</option>
            </select>
          </div>
          <div>
            <label>備註：</label>
            <input 
              type="text" 
              value={editingText} 
              onChange={(e) => setEditingText(e.target.value)}
              className="border p-1 w-full"
            />
          </div>
          <div className="mt-2">
            <button onClick={saveEdit} className="border-1 bg-green-200 mr-2">
              儲存
            </button>
            <button onClick={cancelEdit} className="border-1 bg-gray-200">
              取消
            </button>
          </div>
        </div>
      ) : (
        // 顯示模式
        <div>
          <div>分數：{record.score}</div>
          <div>備註：{record.text}</div>
          <div>時間：{record.date} {record.time}</div>
          <div className="mt-2">
            <button
              onClick={() => startEdit(record)}
              className="border-1 bg-blue-200 mr-2"
            >
              編輯
            </button>
            <button
              onClick={() => deleteRecord(record.id)}
              className="border-1 bg-red-200"
            >
              刪除
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodRecord;