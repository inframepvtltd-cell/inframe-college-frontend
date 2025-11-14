import React from 'react'

function RelevantToolsAndFeatures() {

    const features = [
        "Become a Interior Designer in 12 months",
        "4+ Tools & 4+ Hands on projects",
        "Programme expert from industry",
        "100% Placement guarantee",
        "4.5 Lacs + CTC"
    ];

    const tools = ["Autocad", "Sketchup", "3ds Max", "Photoshop"];

    const additionalFeatures = [
        "Library Access",
        "200+ Editable Templates (SVG)",
        "SKP Files Access",
        "Industry Visits",
        "Educational Trips",
        "Live Projects",
        "Internship Opportunities"
    ];

    return (
        <>     {/* Tools Section */}
            <div className="m-12 sm:mb-16">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-8 sm:mb-10 text-center">
                    🛠️ Master Industry Relevant Tools:
                </h3>
                <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6">
                    {tools.map((tool, index) => (
                        <div
                            key={index}
                            className="
                group 
                bg-gradient-to-br from-black to-gray-900
                text-yellow-400 
                px-8 py-6 sm:px-10 sm:py-8 lg:px-12 lg:py-10
                rounded-3xl 
                font-bold 
                text-xl sm:text-2xl lg:text-3xl
                border-2 border-yellow-500 
                shadow-[0_0_20px_rgba(255,200,0,0.4)] 
                hover:shadow-[0_0_35px_rgba(255,200,0,0.6)] 
                hover:scale-105
                transform
                transition-all 
                duration-500 
                ease-out
                flex 
                items-center 
                gap-4 sm:gap-6 lg:gap-8
                min-w-[280px] sm:min-w-[320px] lg:min-w-[360px]
                hover:border-yellow-300
                hover:bg-gradient-to-br hover:from-gray-900 hover:to-black
                cursor-pointer
            "
                        >
                            {/* Icon Circle - Larger */}
                            <div className="
                w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24
                bg-gradient-to-br from-yellow-500/30 to-yellow-600/20
                rounded-full 
                flex items-center justify-center 
                border-2 border-yellow-500/60
                shadow-lg
                group-hover:bg-gradient-to-br group-hover:from-yellow-500/40 group-hover:to-yellow-600/30
                group-hover:border-yellow-300
                group-hover:scale-110
                group-hover:shadow-xl
                group-hover:shadow-yellow-500/20
                transition-all duration-500 ease-out
            ">
                                <span className="text-3xl sm:text-4xl lg:text-5xl">💻</span>
                            </div>

                            {/* Tool Name */}
                            <span className="tracking-wide drop-shadow-lg group-hover:text-yellow-300 transition-colors duration-300">
                                {tool}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Additional Features */}
            <div className="mb-12 sm:mb-16">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-8 sm:mb-10 text-center">🌟 Additional Features:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {additionalFeatures.map((feature, index) => (
                        <div key={index} className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 p-4 sm:p-5 rounded-xl text-center hover:shadow-lg hover:border-yellow-300 transition-all duration-300 group">
                            <div className="text-yellow-500 text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">⭐</div>
                            <span className="text-black font-bold text-base sm:text-lg">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default RelevantToolsAndFeatures