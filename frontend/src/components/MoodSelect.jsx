const MoodSelect = ({ score, setScore }) => {
  const moods = [
    {
      value: "1",
      emoji: "😢",
      label: "很糟",
      color: "from-red-500 to-red-600",
    },
    {
      value: "2",
      emoji: "😔",
      label: "還好",
      color: "from-orange-500 to-orange-600",
    },
    {
      value: "3",
      emoji: "😐",
      label: "平靜",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      value: "4",
      emoji: "🙂",
      label: "不錯",
      color: "from-green-500 to-green-600",
    },
    {
      value: "5",
      emoji: "😊",
      label: "開心",
      color: "from-blue-500 to-purple-600",
    },
  ];

  const handleMoodSelect = (value) => {
    setScore(value);
  };

  return (
    <div className="p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl border border-white border-opacity-20">
      {/* 情緒按鈕網格 */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleMoodSelect(mood.value)}
            className={`
              aspect-square rounded-xl text-2xl cursor-pointer transition-all duration-300 
              border-2 border-white 
              ${
                score === mood.value
                  ? `bg-gradient-to-r ${mood.color} `
                  : "bg-white bg-opacity-20 hover:bg-opacity-30"
              }
            `}
            title={`${mood.value} - ${mood.label}`}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelect;
