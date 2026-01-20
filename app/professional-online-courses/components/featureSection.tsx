"use client"
import { CheckCircle } from "lucide-react"

const FeaturesSection = ({ keyFeatures }: any) => {

  return (
    <section className="py-4 w-full bg-gradient-to-br from-white to-gray-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Key Features
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {keyFeatures.map((feature: any, index: any) => (
            <div
              key={index}
              className="
              bg-yellow-100/40 
              rounded-xl 
              p-6 
              shadow-md 
              hover:shadow-2xl 
              hover:bg-yellow-200/50
              transition-all 
              duration-300 
              border border-yellow-300/40 
              hover:border-yellow-500
              group relative
            "
            >
              {/* Glow Top Border */}
              <div
                className="
                absolute top-0 left-0 w-full h-[3px] 
                bg-gradient-to-r from-yellow-400 to-yellow-600 
                opacity-0 group-hover:opacity-100 
                transition-all duration-300
              "
              ></div>

              <div className="flex flex-col items-center text-center">
                <div
                  className="
                  w-14 h-14 
                  bg-yellow-200 
                  rounded-full 
                  flex items-center justify-center 
                  mb-4 
                  group-hover:bg-yellow-500 
                  transition-colors 
                  shadow-inner
                "
                >
                  <CheckCircle className="w-7 h-7 text-yellow-700 group-hover:text-white" />
                </div>

                <h3
                  className="
                  text-2xl font-bold text-gray-900 
                  mb-2 group-hover:text-yellow-700 
                  transition-colors
                "
                >
                  {feature.title}
                </h3>

                <p className="text-gray-700 text-lg  leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

}

export default FeaturesSection