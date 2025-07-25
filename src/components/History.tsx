import { HistoryIcon } from "lucide-react"

const History = () => {
  return (  
    <>
      <div className="bg-white mt-12 border-blue-500 border-2 rounded-lg ml-12 px-5 pt-6 pb-14 w-120">
        <div className="flex items-center">
          <HistoryIcon color="gray" />
          <h2 className="ml-3 text-lg font-semibold">История запросов</h2>
        </div>
        <div className="mt-3">
          <p>123123</p>
        </div>
      </div>
    </>
  )
}
 
export default History