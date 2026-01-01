import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MoodChart = ({ moodRecords }) => {
  // 處理圖表資料

  //取得最近7天的紀錄
  const processChartData = () => {
    if (!moodRecords || moodRecords.length === 0) {
      return [];
    }

    const sortedRecords = [...moodRecords].sort(
      (a, b) =>
        new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`)
    );

    return sortedRecords.map((record, index) => ({
      // 用日期+時間作為 key，確保每筆資料都不同
      date: `${record.date}`,
      dateTime: `${record.date} ${record.time.slice(0, 6)}`,
      // 如果同一天有多筆，顯示時間；如果只有一筆，只顯示日期
      displayKey:
        index > 0 && sortedRecords[index - 1].date === record.date
          ? record.time.slice(0, 5) // 顯示時間
          : new Date(record.date).toLocaleDateString("zh-TW", {
              month: "numeric",
              day: "numeric",
            }), // 顯示日期
      score: record.score,
      text: record.text,
      fullDate: `${record.date} ${record.time}`,
    }));
  };
  const chartData = processChartData();
  const getUniqueDays = () => {
    if (!moodRecords || moodRecords.length === 0) return 0;

    const uniqueDates = new Set(moodRecords.map((record) => record.date));
    return uniqueDates.size;
  };

  //自訂Tooltip 內容
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div className="bg-white p-3 border-gray-300 rounded-lg shadow-lg">
          <p className="text-sm text-gray-500">{`${data.dateTime}`}</p>
          <p className="text-blue-200">{`心情分數：${data.score}`}</p>
          {data.text && (
            <p className="text-gray-600 text-sm mt-1">{`備注：${data.text}`}</p>
          )}
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="bg-white p-6 round-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">心情趨勢圖</h3>
        <div className="text-center text-gray-500">
          <p>還沒有足夠的紀錄來顯示圖表</p>
          <p className="text-sm mt-2">至少需要一筆心情紀錄</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 round-lg shadow-md border-2">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        心情趨勢圖(最近{getUniqueDays()}天)
      </h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#666" />
            <YAxis
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              tick={{ fontSize: 12 }}
              stroke="#666"
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: "#3B82F6", strokeWidth: 5, r: 4 }}
              activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/*圖表說明*/}
      <div className="mt-4 text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span>心情分數(1-5分)</span>
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          將滑鼠移到圖表上可以看到詳細資訊
        </p>
      </div>
    </div>
  );
};

export default MoodChart;
