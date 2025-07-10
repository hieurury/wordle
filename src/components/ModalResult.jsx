export default function ModalResult({ isOpen, type, question, action }) {
    if (!isOpen) return null;
    
    const heading = type ? 'Correct' : 'Wrong';
    const data = question;
    
    // Dynamic styling based on result type
    const resultConfig = type ? {
        bgGradient: 'from-emerald-500 via-green-600 to-teal-700',
        headerBg: 'bg-gradient-to-r from-emerald-600 to-green-700',
        badgeColor: 'bg-emerald-600 hover:bg-emerald-700',
        buttonColor: 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700',
        icon: '🎉',
        shadowColor: 'shadow-emerald-500/25'
    } : {
        bgGradient: 'from-red-500 via-rose-600 to-pink-700',
        headerBg: 'bg-gradient-to-r from-red-600 to-rose-700',
        badgeColor: 'bg-red-600 hover:bg-red-700',
        buttonColor: 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700',
        icon: '💡',
        shadowColor: 'shadow-red-500/25'
    };

    // Type icon mapping
    const typeIcons = {
        'noun': '📝',
        'verb': '⚡',
        'adjective': '🎨',
        'adverb': '🚀',
        'preposition': '🔗',
        'interjection': '💬'
    };

    return (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className={`
                bg-white dark:bg-slate-800 
                shadow-2xl ${resultConfig.shadowColor}
                rounded-2xl 
                flex flex-col 
                max-w-2xl w-full max-h-[90vh] overflow-hidden
                animate-in zoom-in-95 slide-in-from-bottom-10 duration-500
                border border-gray-200 dark:border-slate-700
            `}>
                {/* Header with gradient and icon */}
                <div className={`${resultConfig.headerBg} p-8 text-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <div className="relative">
                        <div className="text-6xl mb-4 animate-bounce">{resultConfig.icon}</div>
                        <h1 className="text-4xl font-bold text-white uppercase tracking-wider drop-shadow-lg">
                            {heading}
                        </h1>
                        <div className="mt-4 w-24 h-1 bg-white/50 mx-auto rounded-full"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {/* Answer section */}
                    <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                        <div className="text-center">
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-3">Đáp án</p>
                            <span className={`
                                inline-block px-6 py-3 ${resultConfig.badgeColor} 
                                text-white text-2xl font-bold uppercase 
                                rounded-xl shadow-lg transform transition-all duration-200
                                hover:scale-105 cursor-pointer
                            `}>
                                {data.question}
                            </span>
                        </div>
                    </div>

                    {/* Info table */}
                    <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-xl transition-all duration-200 hover:shadow-md">
                                <div className="text-2xl mb-2">🔤</div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">Nghĩa</p>
                                <p className="text-lg font-semibold text-gray-800 dark:text-white mt-1">{data.mean}</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-xl transition-all duration-200 hover:shadow-md">
                                <div className="text-2xl mb-2">{typeIcons[data.type] || '📚'}</div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">Loại từ</p>
                                <p className="text-lg font-semibold text-gray-800 dark:text-white mt-1 capitalize">{data.type}</p>
                            </div>
                        </div>
                    </div>

                    {/* Examples section */}
                    <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">💭</span>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white uppercase">Ví dụ</h3>
                        </div>
                        <div className="space-y-3">
                            {data.includes.map((item, index) => (
                                <div 
                                    key={index}
                                    className="
                                        p-4 bg-gradient-to-r from-gray-50 to-gray-100 
                                        dark:from-slate-700 dark:to-slate-600
                                        rounded-xl border-l-4 border-blue-500
                                        transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md
                                    "
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                                            {index + 1}
                                        </span>
                                        <div 
                                            className="text-gray-700 dark:text-gray-200 leading-relaxed flex-1"
                                            dangerouslySetInnerHTML={{ __html: item }} 
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600">
                    <button 
                        onClick={action} 
                        className={`
                            w-full py-4 px-6 ${resultConfig.buttonColor}
                            text-white font-bold text-lg rounded-xl
                            transform transition-all duration-200
                            hover:scale-105 hover:shadow-lg
                            focus:outline-none focus:ring-4 focus:ring-blue-500/50
                            active:scale-95
                        `}
                    >
                        <span className="flex items-center justify-center gap-2">
                            <span>Tiếp tục</span>
                            <span className="text-xl">→</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}