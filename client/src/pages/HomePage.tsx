import React from 'react';

type Props = {}

const HomePage = (props: Props) => {
    return (
        <section className="absolute top-45 left-30 w-full h-full z-0">
            <div className='mt-4'>
                <div className='flex flex-row gap-4'>
                    {/* Column 1 */}
                    <div className='w-[400px] h-[200px] flex-col bg-white border border-[#A64DFF] rounded-2xl p-4'>
                        <div>
                            <h4 className='text-3xl'>Remaining</h4>
                            <h5>April 01, 2025 - May 01, 2025</h5>
                            <br></br>
                            <h4 className='text-5xl'>₱0.00</h4>
                            <h5 className='text-xl'>0% from last period</h5>
                        </div>
                    </div>
                    {/* Column 2 */}
                    <div className='w-[400px] h-[200px] flex-col bg-white border border-[#A64DFF] rounded-2xl p-4'>
                        <div>
                            <h4 className='text-3xl'>Income</h4>
                            <h5>April 01, 2025 - May 01, 2025</h5>
                            <br></br>
                            <h4 className='text-5xl'>₱0.00</h4>
                            <h5 className='text-xl'>0% from last period</h5>
                        </div>
                    </div>
                    {/* Column 3 */}
                    <div className='w-[400px] h-[200px] flex-col bg-white border border-[#A64DFF] rounded-2xl p-4'>
                        <div>
                            <h4 className='text-3xl'>Expenses</h4>
                            <h5>April 01, 2025 - May 01, 2025</h5>
                            <br></br>
                            <h4 className='text-5xl'>₱0.00</h4>
                            <h5 className='text-xl'>0% from last period</h5>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row mt-5 gap-4'>
                <div className='w-[820px] h-[400px] flex-col bg-white border border-[#A64DFF] rounded-2xl p-4'>
                        <div>
                            <h4 className='text-3xl'>Transactions</h4>
                        </div>
                    </div>
                    {/* Column 2 */}
                    <div className='w-[400px] h-[400px] flex-col bg-white border border-[#A64DFF] rounded-2xl p-4'>
                        <div>
                            <h4 className='text-3xl'>All Statistics</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomePage;
