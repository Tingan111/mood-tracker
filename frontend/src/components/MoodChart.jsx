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
  const processChartData = () => {
    if (!moodRecords || moodRecords.length === 0) {
      return [];
    }

    //取得最近7天的紀錄
    const sortedRecords = [...moodRecords].sort(
      (a, b) => new Date(a.date) - new Date(b.date).setMilliseconds(-7)
    );

    return sortedRecords.map((record) => ({
      date: new Date(record.date).toLocaleDateString("zh-TW", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
      time: record.time.slice(0, 6),
      score: record.score,
      fullDate: `${record.date} ${record.time}`,
      text: record.text,
    }));
  };
  const chartData = processChartData();

  //自訂Tooltip 內容
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div className="bg-white p-3 border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold">{`日期：${label}`}</p>
          <p className="text-sm text-gray-500">{`${data.time}`}</p>
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
        心情趨勢圖(最近{chartData.length}天)
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
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
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
