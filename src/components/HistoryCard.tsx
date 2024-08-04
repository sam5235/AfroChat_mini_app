
const HistoryCard = () => {
  return (
    <div className="flex bg-background p-2 rounded-lg gap-3">
      <div className="w-10 h-10 ">
        <img className="rounded-full" src="https://res.cloudinary.com/dc1nwdl5w/image/upload/v1706686254/uux5xutgmiz5orgqztk3.jpg" alt="" />
      </div>
      <div>
        <p className="text-sm font-semibold">AfroChat</p>
        <p className="text-xs">Hello</p>
      </div>
      <div className="flex items-end justify-end ml-44">

      <p className="text-xs">Tue</p>
      </div>

    </div>
  )
}

export default HistoryCard
