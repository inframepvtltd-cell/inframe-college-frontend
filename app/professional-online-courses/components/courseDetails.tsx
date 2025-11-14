import React from 'react'

function CourseInfo() {
    const features = [
        "Become an Interior Designer",
        "4+ Tools & 4+ Hands-on Projects",
        "Program Experts from the Industry",
        "Live Doubts Support on App",
        "Weekly Faculty Interaction via App",
    ];
    return (
        <div>
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black mb-4 sm:mb-6">
                    Interior Design Course
                </h2>
                <p className="text-xl sm:text-2xl lg:text-3xl text-gray-800 mb-6 sm:mb-8 font-semibold">
                    🎓 Learn from Masters
                </p>

                {/* Price Section */}
                <div className="mb-6 sm:mb-8">
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">

                        {/* Original Price (Cut) */}
                        <span className="text-red-500 line-through mr-3 text-xl sm:text-2xl lg:text-3xl">
                            ₹5000/-
                        </span>

                        {/* Discounted Price */}
                        <span className="text-yellow-600 text-3xl sm:text-4xl lg:text-5xl">
                            ₹1499/-
                        </span>

                        <span className="text-black ml-2">Lifetime Access</span>
                    </p>


                </div>

                {/* Description */}
                <p className="text-lg sm:text-xl text-gray-800 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto">
                    {/* Get growth in your career with UGC entitled diploma/UG/PG degree programme. */}
                    Get growth in your career with Certificate
                    <span className="block font-semibold text-yellow-600 mt-3 sm:mt-4 text-xl sm:text-2xl">🎯 Jobs ready.</span>
                </p>
            </div>

            {/* Features List */}
            <div className="mb-12 sm:mb-16">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-8 sm:mb-10 text-center">✨ Course Features:</h3>
                <ul className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center text-lg sm:text-xl text-gray-800 bg-gradient-to-r from-yellow-50 to-white p-4 sm:p-5 rounded-lg border-2 border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
                            <span className="text-yellow-500 mr-3 sm:mr-4 text-xl sm:text-2xl">✅</span>
                            <span className="font-semibold">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default CourseInfo