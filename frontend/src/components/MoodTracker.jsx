import { useState } from 'react';

const MoodTracker = () => {
    const [emoji, setEmoji] = useState(false);
    
    // 修正：切換邏輯
    const handleSubmit = () => {
        setEmoji(!emoji); // 如果是 true 變 false，如果是 false 變 true
    };
    
    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-center mb-6">
                    今日心情紀錄
                </h1>
                
                {/* 根據第二關要求，顯示完整的心情資訊 */}
                {emoji ? (
                    // 顯示心情記錄
                    <div className="bg-blue-50 p-4 rounded-lg mb-6 text-center">
                        <h2 className="text-lg font-semibold mb-2">今日心情</h2>
                        <div className="text-4xl mb-2">🙂</div>
                        <p className="text-gray-600">分數: 4/5</p>
                        <p className="text-gray-700 mt-2">今天天氣很好，心情不錯！</p>
                    </div>
                ) : (
                    // 顯示空白狀態
                    <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center">
                        <p className="text-gray-500">今天還沒記錄心情</p>
                    </div>
                )}
                
                <button 
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    {emoji ? '隱藏心情' : '顯示心情'}
                </button>
                
                {/* 測試區域 - 確認 state 有在變化 */}
                <div className="mt-4 p-2 bg-yellow-50 rounded text-sm text-center">
                    測試 - emoji 狀態: {emoji ? 'true' : 'false'}
                </div>
            </div>
        </div>
    );
};

export default MoodTracker;