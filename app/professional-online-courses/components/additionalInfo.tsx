import React from 'react'

function AdditionalInfo() {
    return (
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="bg-gradient-to-b from-white to-yellow-50 p-5 sm:p-6 rounded-xl border-2 border-yellow-300 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl sm:text-4xl font-bold text-yellow-600">12+</div>
                <div className="text-black text-lg sm:text-xl font-semibold">Months Program</div>
            </div>
            <div className="bg-gradient-to-b from-white to-yellow-50 p-5 sm:p-6 rounded-xl border-2 border-yellow-300 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl sm:text-4xl font-bold text-yellow-600">100%</div>
                <div className="text-black text-lg sm:text-xl font-semibold">Placement Guarantee</div>
            </div>
            <div className="bg-gradient-to-b from-white to-yellow-50 p-5 sm:p-6 rounded-xl border-2 border-yellow-300 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl sm:text-4xl font-bold text-yellow-600">4.5L+</div>
                <div className="text-black text-lg sm:text-xl font-semibold">Average CTC</div>
            </div>
        </div>
    )
}

export default AdditionalInfo