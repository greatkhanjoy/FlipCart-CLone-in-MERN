const Cards = () => {
  return (
    <div className="page-content grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="py-3 text-center rounded-md bg-gradient-to-r from-[#0BD48E] to-[#0DF2A2] text-white">
        <span className="text-5xl font-bold">10</span>
        <p className="text-xl uppercase">Products</p>
      </div>
      <div className="py-3 text-center bg-[#01ABAE] rounded-md bg-gradient-to-r from-[#01AAAD] to-[#01DADE] text-white">
        <span className="text-5xl font-bold ">5</span>
        <p className="text-xl uppercase">Users</p>
      </div>
      <div className="py-3 text-center bg-[#0BD48E] rounded-md bg-gradient-to-r from-[#FE9466] to-[#FEB697] text-white">
        <span className="text-5xl font-bold ">4</span>
        <p className="text-xl uppercase">Order</p>
      </div>
      <div className="py-3 text-center bg-[#0BD48E] rounded-md bg-gradient-to-r from-[#FE5E71] to-[#FE909C] text-white">
        <span className="text-5xl font-bold ">$999</span>
        <p className="text-xl uppercase">Total Sale</p>
      </div>
    </div>
  )
}

export default Cards
