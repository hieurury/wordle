import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ModalTotal({ isOpen, data, action}) {

    const [types, setTypes] = useState([]);
    const [wordTypeStats, setWordTypeStats] = useState([]);

    // Xử lý dữ liệu trong useEffect để tránh lỗi hooks
    useEffect(() => {
        if (data && data.length > 0) {
            //lấy các loại từ trong mảng data
            const allTypes = data.map(item => item.type).filter(type => type);
            const uniqueTypes = [...new Set(allTypes)];
            setTypes(uniqueTypes);

            //thống kê tỷ lệ sai theo loại từ
            const typeStats = uniqueTypes.map(type => {
                const questionsOfType = data.filter(item => item.type === type);
                const wrongOfType = questionsOfType.filter(item => item.status === 0);
                const correctOfType = questionsOfType.filter(item => item.status === 1);
                
                return {
                    type,
                    total: questionsOfType.length,
                    wrong: wrongOfType.length,
                    correct: correctOfType.length,
                    wrongPercentage: questionsOfType.length > 0 ? Math.round((wrongOfType.length / questionsOfType.length) * 100) : 0
                };
            });

            // Sắp xếp theo tỷ lệ sai (cao xuống thấp)
            typeStats.sort((a, b) => b.wrongPercentage - a.wrongPercentage);
            setWordTypeStats(typeStats);
        }
    }, [data]);

    if (!isOpen) return null;

    const wrongQuestions = data.filter(item => item.status === 0);
    const correctQuestions = data.filter(item => item.status === 1);
    const totalQuestions = data.length;
    const percentage = Math.round((correctQuestions.length / totalQuestions) * 100);

    const colorsType = () => {
        if(percentage >= 80) {
            return {
                color: 'text-green-600',
                bgColor: 'bg-green-500',
                bgGradient: 'from-green-500 to-emerald-500',
                emoji: '🏆',
                message: 'Xuất sắc!'
            };
        } else if (percentage >= 50) {
            return {
                color: 'text-yellow-600',
                bgColor: 'bg-yellow-500',
                bgGradient: 'from-yellow-500 to-orange-500',
                emoji: '⭐',
                message: 'Tốt lắm!'
            };
        } else {
            return {
                color: 'text-red-600',
                bgColor: 'bg-red-500',
                bgGradient: 'from-red-500 to-pink-500',
                emoji: '💪',
                message: 'Cố gắng thêm!'
            };
        }
    }

    const themeColor = colorsType();
    
    //-> loại từ sai chủ yếu
    const mostWrongType = wordTypeStats.length > 0 ? wordTypeStats[0] : null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
                {/* header */}
                <div className={`p-6 flex justify-center items-center flex-col bg-gradient-to-r ${themeColor.bgGradient} rounded-t-2xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <div className="relative text-center">
                        <div className="text-6xl flex justify-center space-x-1 mb-4">
                            <div className="animate-bounce">{themeColor.emoji}</div>
                            <div className="animate-bounce delay-150">🎉</div>
                            <div className="animate-bounce delay-300">{themeColor.emoji}</div>
                        </div>
                        <h1 className="text-4xl uppercase font-bold tracking-wider text-white mb-2">Tổng kết</h1>
                        <p className="text-xl text-white/90 font-semibold">{themeColor.message}</p>
                        <div className="mt-4 w-24 h-1 bg-white/50 mx-auto rounded-full"></div>
                    </div>
                </div>

                {/* body modal */}
                <div className="p-6">
                    {/* Kết quả chính */}
                    <div className="mb-6">
                        <h3 className="text-2xl text-center font-bold uppercase mb-4 text-slate-900 dark:text-slate-200">Kết quả tổng quan</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-200">
                                <div className="text-3xl font-bold mb-2">
                                    <span className={`text-4xl ${themeColor.color}`}>{correctQuestions.length}</span>
                                    <span className="text-2xl text-slate-600 dark:text-slate-300">/{totalQuestions}</span>
                                </div>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Câu đúng</span>
                            </div>
                            <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-200">
                                <div className={`text-4xl font-bold mb-2 ${themeColor.color}`}>
                                    {percentage}%
                                </div>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Độ chính xác</span>
                                <div className={`text-xl animate-pulse ${themeColor.color} mt-1`}>●</div>
                            </div>
                        </div>
                    </div>

                    {/* Chi tiết đúng/sai */}
                    <div className="mb-6">
                        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                            <span>📊</span>
                            Phân tích chi tiết
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 p-4 rounded-xl text-center">
                                <div className="text-2xl mb-2">✅</div>
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {correctQuestions.length}
                                </div>
                                <div className="text-sm text-green-700 dark:text-green-300 font-medium">
                                    Câu đúng
                                </div>
                            </div>
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 p-4 rounded-xl text-center">
                                <div className="text-2xl mb-2">❌</div>
                                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                    {wrongQuestions.length}
                                </div>
                                <div className="text-sm text-red-700 dark:text-red-300 font-medium">
                                    Câu sai
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Thống kê theo loại từ */}
                    {wordTypeStats.length > 0 && (
                        <div className="mb-6">
                            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                                <span>📝</span>
                                Thống kê theo loại từ
                            </h4>
                            <div className="space-y-3">
                                {wordTypeStats.map((stat, index) => (
                                    <div 
                                        key={index}
                                        className={`
                                            p-4 rounded-xl border-l-4 transition-all duration-200 hover:shadow-md
                                            ${stat.wrongPercentage > 50 
                                                ? 'bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-600' 
                                                : stat.wrongPercentage > 25
                                                ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400 dark:border-yellow-600'
                                                : 'bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-600'
                                            }
                                        `}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">
                                                    {stat.type}
                                                </span>
                                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                                    {stat.correct}/{stat.total} câu đúng
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`
                                                    font-bold text-lg
                                                    ${stat.wrongPercentage > 50 
                                                        ? 'text-red-600' 
                                                        : stat.wrongPercentage > 25
                                                        ? 'text-yellow-600'
                                                        : 'text-green-600'
                                                    }
                                                `}>
                                                    {100 - stat.wrongPercentage}%
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    độ chính xác
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Loại từ cần cải thiện */}
                    {mostWrongType && mostWrongType.wrongPercentage > 0 && (
                        <div className="mb-6">
                            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                                <span>🎯</span>
                                Cần cải thiện
                            </h4>
                            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-700 p-4 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl">⚠️</div>
                                    <div>
                                        <div className="font-semibold text-orange-800 dark:text-orange-200 capitalize">
                                            Loại từ "{mostWrongType.type}"
                                        </div>
                                        <div className="text-sm text-orange-700 dark:text-orange-300">
                                            Tỷ lệ sai: {mostWrongType.wrongPercentage}% ({mostWrongType.wrong}/{mostWrongType.total} câu)
                                        </div>
                                        <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                                            💡 Hãy ôn tập thêm loại từ này nhé!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Danh sách từ đã làm */}
                    <div className="mb-6">
                        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                            <span>📚</span>
                            Từ đã làm
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            {data.map((question, index) => (
                                <div
                                    key={index}
                                    className={`
                                        p-3 rounded-lg text-center font-medium text-sm border
                                        ${question.status === 1 
                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-300 dark:border-green-600' 
                                            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-300 dark:border-red-600'
                                        }
                                        transform transition-all duration-200 hover:scale-105 cursor-pointer
                                    `}
                                    title={`${question.question} - ${question.mean}`}
                                >
                                    <div className="text-lg mb-1">
                                        {question.status === 1 ? '✅' : '❌'}
                                    </div>
                                    <div className="font-bold truncate">
                                        {question.question}
                                    </div>
                                    <div className="text-xs opacity-75 truncate">
                                        {question.mean}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 pb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <button 
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-3 rounded-xl font-bold flex justify-center items-center gap-2 transform transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50 active:scale-95" 
                            onClick={action}
                        >
                            <i className="fa-solid fa-arrow-rotate-left"></i>
                            <span>Chơi lại</span>
                        </button>
                        <Link 
                            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white p-3 rounded-xl font-bold flex justify-center items-center gap-2 transform transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-500/50 active:scale-95" 
                            onClick={action} 
                            to="/"
                        >
                            <i className="fa-solid fa-house"></i>
                            <span>Trang chủ</span>   
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

}