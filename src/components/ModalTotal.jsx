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
                color: 'text-emerald-600',
                bgColor: 'bg-emerald-500',
                bgGradient: 'from-emerald-400 via-green-500 to-teal-500',
                emoji: '🏆',
                message: 'Xuất sắc!'
            };
        } else if (percentage >= 50) {
            return {
                color: 'text-amber-600',
                bgColor: 'bg-amber-500',
                bgGradient: 'from-yellow-400 via-orange-400 to-amber-500',
                emoji: '⭐',
                message: 'Tốt lắm!'
            };
        } else {
            return {
                color: 'text-rose-600',
                bgColor: 'bg-rose-500',
                bgGradient: 'from-pink-400 via-rose-500 to-red-500',
                emoji: '💪',
                message: 'Cố gắng thêm!'
            };
        }
    }

    const themeColor = colorsType();
    
    //-> loại từ sai chủ yếu
    const mostWrongType = wordTypeStats.length > 0 ? wordTypeStats[0] : null;

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex justify-center items-center z-10 animate-in fade-in duration-300">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 border-4 border-white/20 backdrop-blur-xl relative overflow-x-hidden">
                {/* Floating decorative elements */}
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
                <div className="absolute -top-1 -right-3 w-4 h-4 bg-pink-400 rounded-full animate-pulse opacity-70"></div>
                <div className="absolute top-1/4 -left-3 w-5 h-5 bg-green-400 rounded-full animate-ping opacity-60"></div>
                <div className="absolute bottom-1/4 -right-2 w-7 h-7 bg-blue-400 rounded-full animate-bounce delay-300 opacity-75"></div>
                {/* header */}
                <div className={`p-6 flex justify-center items-center flex-col bg-gradient-to-r ${themeColor.bgGradient} rounded-t-3xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                        <div className="absolute top-8 right-8 w-6 h-6 bg-white/30 rounded-full animate-bounce"></div>
                        <div className="absolute bottom-6 left-12 w-4 h-4 bg-white/25 rounded-full animate-ping"></div>
                        <div className="absolute bottom-4 right-6 w-5 h-5 bg-white/15 rounded-full animate-pulse delay-300"></div>
                    </div>
                    <div className="relative text-center z-10">
                        <div className="text-6xl flex justify-center space-x-1 mb-4">
                            <div className="animate-bounce filter drop-shadow-lg">{themeColor.emoji}</div>
                            <div className="animate-bounce delay-150 filter drop-shadow-lg">�</div>
                            <div className="animate-bounce delay-300 filter drop-shadow-lg">{themeColor.emoji}</div>
                        </div>
                        <h1 className="text-5xl uppercase font-black tracking-wider text-white mb-3 drop-shadow-2xl">Tổng kết</h1>
                        <p className="text-2xl text-white font-bold drop-shadow-lg bg-white/20 px-4 py-2 rounded-full">{themeColor.message}</p>
                        <div className="mt-6 w-32 h-1.5 bg-white/70 mx-auto rounded-full shadow-lg"></div>
                    </div>
                </div>

                {/* body modal */}
                <div className="p-8 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-slate-800">
                    {/* Kết quả chính */}
                    <div className="mb-8">
                        <h3 className="text-3xl text-center font-black uppercase mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Kết quả tổng quan</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-200 dark:from-cyan-900 dark:via-blue-900 dark:to-indigo-800 p-8 rounded-2xl shadow-xl text-center transform hover:scale-105 hover:rotate-1 transition-all duration-300 border-2 border-cyan-200 dark:border-cyan-700">
                                <div className="text-4xl font-black mb-3">
                                    <span className={`text-5xl ${themeColor.color} drop-shadow-lg`}>{correctQuestions.length}</span>
                                    <span className="text-3xl text-slate-700 dark:text-slate-300">/{totalQuestions}</span>
                                </div>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full">Câu đúng</span>
                            </div>
                            <div className="bg-gradient-to-br from-emerald-100 via-green-100 to-teal-200 dark:from-emerald-900 dark:via-green-900 dark:to-teal-800 p-8 rounded-2xl shadow-xl text-center transform hover:scale-105 hover:-rotate-1 transition-all duration-300 border-2 border-emerald-200 dark:border-emerald-700">
                                <div className={`text-5xl font-black mb-3 ${themeColor.color} drop-shadow-lg`}>
                                    {percentage}%
                                </div>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full">Độ chính xác</span>
                                <div className={`text-2xl animate-bounce ${themeColor.color} mt-2 filter drop-shadow-lg`}>⚡</div>
                            </div>
                        </div>
                    </div>

                    {/* Chi tiết đúng/sai */}
                    <div className="mb-8">
                        <h4 className="text-xl font-black text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-3">
                            <span className="text-2xl">📊</span>
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Phân tích chi tiết</span>
                        </h4>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-green-200 via-emerald-200 to-teal-300 dark:from-green-800 dark:via-emerald-800 dark:to-teal-700 border-2 border-green-300 dark:border-green-600 p-6 rounded-2xl text-center shadow-xl transform hover:scale-105 transition-all duration-300">
                                <div className="text-4xl mb-3 filter drop-shadow-lg">✅</div>
                                <div className="text-3xl font-black text-green-700 dark:text-green-300 drop-shadow-lg">
                                    {correctQuestions.length}
                                </div>
                                <div className="text-sm text-green-800 dark:text-green-200 font-bold uppercase tracking-wide bg-white/40 dark:bg-gray-800/40 px-3 py-1 rounded-full mt-2">
                                    Câu đúng
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-red-200 via-rose-200 to-pink-300 dark:from-red-800 dark:via-rose-800 dark:to-pink-700 border-2 border-red-300 dark:border-red-600 p-6 rounded-2xl text-center shadow-xl transform hover:scale-105 transition-all duration-300">
                                <div className="text-4xl mb-3 filter drop-shadow-lg">❌</div>
                                <div className="text-3xl font-black text-red-700 dark:text-red-300 drop-shadow-lg">
                                    {wrongQuestions.length}
                                </div>
                                <div className="text-sm text-red-800 dark:text-red-200 font-bold uppercase tracking-wide bg-white/40 dark:bg-gray-800/40 px-3 py-1 rounded-full mt-2">
                                    Câu sai
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Thống kê theo loại từ */}
                    {wordTypeStats.length > 0 && (
                        <div className="mb-8">
                            <h4 className="text-xl font-black text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-3">
                                <span className="text-2xl">📝</span>
                                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Thống kê theo loại từ</span>
                            </h4>
                            <div className="space-y-4">
                                {wordTypeStats.map((stat, index) => (
                                    <div 
                                        key={index}
                                        className={`
                                            p-6 rounded-2xl border-l-6 transition-all duration-300 hover:shadow-xl hover:scale-102 transform
                                            ${stat.wrongPercentage > 50 
                                                ? 'bg-gradient-to-r from-red-100 via-rose-100 to-pink-200 dark:from-red-900/30 dark:via-rose-900/30 dark:to-pink-800/30 border-red-500 dark:border-red-400' 
                                                : stat.wrongPercentage > 25
                                                ? 'bg-gradient-to-r from-yellow-100 via-amber-100 to-orange-200 dark:from-yellow-900/30 dark:via-amber-900/30 dark:to-orange-800/30 border-yellow-500 dark:border-yellow-400'
                                                : 'bg-gradient-to-r from-green-100 via-emerald-100 to-teal-200 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-teal-800/30 border-green-500 dark:border-green-400'
                                            }
                                            shadow-lg
                                        `}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className={`
                                                    w-12 h-12 rounded-full flex items-center justify-center text-2xl font-black text-white shadow-lg
                                                    ${stat.wrongPercentage > 50 
                                                        ? 'bg-gradient-to-br from-red-500 to-rose-600' 
                                                        : stat.wrongPercentage > 25
                                                        ? 'bg-gradient-to-br from-yellow-500 to-orange-600'
                                                        : 'bg-gradient-to-br from-green-500 to-emerald-600'
                                                    }
                                                `}>
                                                    {stat.wrongPercentage > 50 ? '😰' : stat.wrongPercentage > 25 ? '😊' : '🎯'}
                                                </div>
                                                <div>
                                                    <span className="font-black text-lg text-slate-800 dark:text-slate-200 capitalize bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full">
                                                        {stat.type}
                                                    </span>
                                                    <div className="text-sm text-slate-700 dark:text-slate-300 mt-1 font-semibold">
                                                        {stat.correct}/{stat.total} câu đúng
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`
                                                    font-black text-2xl drop-shadow-lg
                                                    ${stat.wrongPercentage > 50 
                                                        ? 'text-red-600 dark:text-red-400' 
                                                        : stat.wrongPercentage > 25
                                                        ? 'text-yellow-600 dark:text-yellow-400'
                                                        : 'text-green-600 dark:text-green-400'
                                                    }
                                                `}>
                                                    {100 - stat.wrongPercentage}%
                                                </div>
                                                <div className="text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wide bg-white/40 dark:bg-gray-800/40 px-2 py-1 rounded-full">
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
                        <div className="mb-8">
                            <h4 className="text-xl font-black text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-3">
                                <span className="text-2xl">🎯</span>
                                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Cần cải thiện</span>
                            </h4>
                            <div className="bg-gradient-to-br from-orange-200 via-red-200 to-pink-300 dark:from-orange-900/40 dark:via-red-900/40 dark:to-pink-800/40 border-2 border-orange-300 dark:border-orange-600 p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-3xl shadow-lg animate-pulse">
                                        ⚠️
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-black text-xl text-orange-800 dark:text-orange-200 capitalize bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full inline-block mb-2">
                                            Loại từ "{mostWrongType.type}"
                                        </div>
                                        <div className="text-sm text-orange-700 dark:text-orange-300 font-semibold bg-white/30 dark:bg-gray-800/30 px-3 py-1 rounded-full inline-block mr-2">
                                            Tỷ lệ sai: {mostWrongType.wrongPercentage}% ({mostWrongType.wrong}/{mostWrongType.total} câu)
                                        </div>
                                        <div className="text-sm text-orange-600 dark:text-orange-400 mt-2 font-bold flex items-center gap-2">
                                            <span className="text-lg">💡</span>
                                            <span className="bg-white/40 dark:bg-gray-800/40 px-3 py-1 rounded-full">Hãy ôn tập thêm loại từ này nhé!</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Danh sách từ đã làm */}
                    <div className="mb-8">
                        <h4 className="text-xl font-black text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-3">
                            <span className="text-2xl">📚</span>
                            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Từ đã làm</span>
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            {data.map((question, index) => (
                                <div
                                    key={index}
                                    className={`
                                        p-4 rounded-2xl text-center font-bold text-sm border-2 shadow-lg
                                        ${question.status === 1 
                                            ? 'bg-gradient-to-br from-green-200 via-emerald-200 to-teal-300 dark:from-green-800 dark:via-emerald-800 dark:to-teal-700 text-green-800 dark:text-green-200 border-green-400 dark:border-green-500' 
                                            : 'bg-gradient-to-br from-red-200 via-rose-200 to-pink-300 dark:from-red-800 dark:via-rose-800 dark:to-pink-700 text-red-800 dark:text-red-200 border-red-400 dark:border-red-500'
                                        }
                                        transform transition-all duration-300 hover:scale-110 hover:rotate-2 cursor-pointer hover:shadow-xl
                                    `}
                                    title={`${question.question} - ${question.mean}`}
                                >
                                    <div className="text-2xl mb-2 filter drop-shadow-lg">
                                        {question.status === 1 ? '✅' : '❌'}
                                    </div>
                                    <div className="font-black text-lg truncate mb-1 bg-white/50 dark:bg-gray-800/50 px-2 py-1 rounded-full">
                                        {question.question}
                                    </div>
                                    <div className="text-xs opacity-90 truncate font-semibold bg-white/30 dark:bg-gray-800/30 px-2 py-1 rounded-full">
                                        {question.mean}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-8 pb-8 bg-gradient-to-t from-slate-100 via-white to-transparent dark:from-gray-800 dark:via-gray-900 dark:to-transparent">
                    <div className="grid grid-cols-2 gap-6">
                        <button 
                            className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 hover:from-blue-600 hover:via-indigo-700 hover:to-purple-800 text-white p-4 rounded-2xl font-black text-lg flex justify-center items-center gap-3 transform transition-all duration-300 hover:scale-110 hover:-rotate-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 active:scale-95 border-2 border-blue-400/50" 
                            onClick={action}
                        >
                            <i className="fa-solid fa-arrow-rotate-left text-xl"></i>
                            <span>Chơi lại</span>
                            <div className="absolute top-1 right-1 w-3 h-3 bg-white/30 rounded-full animate-ping"></div>
                        </button>
                        <Link 
                            className="bg-gradient-to-br from-slate-500 via-gray-600 to-slate-700 hover:from-slate-600 hover:via-gray-700 hover:to-slate-800 text-white p-4 rounded-2xl font-black text-lg flex justify-center items-center gap-3 transform transition-all duration-300 hover:scale-110 hover:rotate-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-gray-500/50 active:scale-95 border-2 border-gray-400/50 relative" 
                            onClick={action} 
                            to="/"
                        >
                            <i className="fa-solid fa-house text-xl"></i>
                            <span>Trang chủ</span>
                            <div className="absolute top-1 right-1 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

}