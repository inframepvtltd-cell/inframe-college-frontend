import React from 'react'

export default function Customizecourse() {
    return (
        <div className="w-full lg:p-3">
            <div className='max-w-4xl grid sm:grid-cols-2 gap-10  p-3 lg:p-0 mx-auto lg:my-[80px] my-[20px]'>
                <div className='border-[1px] border-gray-300 rounded-[20px] lg:px-5 px-2 py-8 shadow-lg'>
                    <div className='flex justify-between items-center '>
                        <h3 className='lg:text-[25px] text-[18px] font-semibold'>Customized course Pack</h3>
                        <button className="lg:px-5 lg:py-2 px-3 py-1 bg-yellow-100 text-amber-600 border border-yellow-400 rounded-full text-sm font-medium">
                            New
                        </button>
                    </div>
                    <p className='text-amber-500 font-semibold'>Choose Any 4 or 4+ Courses</p>
                    <button className="my-4 px-5 py-2 w-full bg-yellow-100 text-amber-600 border border-yellow-400 rounded-full text-sm font-medium">
                        Avail 100% REFUND in 1 year
                    </button>
                    <div className='flex items-center justify-between mt-4'>
                        <div>
                            <span className='text-[20px] font-semibold text-orange-500'>₹1,499</span>
                            <span className='line-through ml-3'>₹2,796</span>
                            <p className='text-gray-700'>You get 45% off</p>
                        </div>
                        <button className='bg-amber-300 font-semibold text-[16px] px-5 py-[8px] rounded-[10px]'>Know More</button>
                    </div>
                </div>
                <div className='border-[1px] border-gray-300 rounded-[20px] lg:px-5 px-2 py-8 shadow-lg'>
                    <div className='flex justify-between items-center '>
                        <h3 className='lg:text-[25px] font-semibold'>All Access course Pack</h3>
                        <button className="px-5 py-2 bg-yellow-100 text-amber-600 border border-yellow-400 rounded-full text-sm font-medium">
                            Popular
                        </button>
                    </div>
                    <p className='text-amber-500 font-semibold'>Choose Any 4 or 4+ Courses</p>
                    <button className="my-4 px-5 py-2 w-full bg-yellow-100 text-amber-600 border border-yellow-400 rounded-full text-sm font-medium">
                        Avail 100% REFUND in Lifetime
                    </button>
                    <div className='flex items-center justify-between mt-4'>
                        <div>
                            <span className='text-[20px] font-semibold text-orange-500'>₹3,999</span>
                            <span className='line-through ml-3'>₹31,455</span>
                            <p className='text-gray-700'>You get 85% off</p>
                        </div>
                        <button className='bg-amber-300 font-semibold text-[16px] px-5 py-[8px] rounded-[10px]'>Know More</button>
                    </div>
                </div>
            </div>
        </div>
    )
}