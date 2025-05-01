import React from 'react'

type Props = {}

const TransferPage = (props: Props) => {
  return (
    <section className="absolute top-45 left-25 z-0">
    <div className="mt-4 flex justify-center">
      <div className="flex flex-col gap-4 w-[1225px] bg-white border border-[#A64DFF] rounded-2xl p-6">

        {/* Top Row */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl">Transfer History</h1>
          <button className="bg-[#A64DFF] px-5 py-2 rounded-2xl text-white text-lg font-semibold">
            + ADD NEW
          </button>
        </div>

        {/* Summary / Filters Section */}
        <div className="w-full h-[50px] bg-white border border-[#A64DFF] rounded-xl p-4">
          Summary / Filters
        </div>

        {/* Data Table / Entries */}
        <div className="w-full h-[300px] bg-white border border-[#A64DFF] rounded-xl p-4">
          Transfer Entries
        </div>

        {/* Pagination */}
        <div className="flex justify-end w-full">
          <div className="flex gap-4">
            <button className="text-white px-5 py-2 rounded-2xl text-xl font-medium bg-[#A64DFF]">Prev</button>
            <button className="text-white px-5 py-2 rounded-2xl text-xl font-medium bg-[#A64DFF]">Next</button>
          </div>
        </div>

      </div>
    </div>
  </section>
  );
}

export default TransferPage;