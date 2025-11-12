

const DashboardCards = ({select,handleCompleteSelect,smTitle,mdtitle,description,number}) => {

    return (
        <button
              className={`border-1 border-gray-300 px-4 py-1.5 rounded-md hover:bg-gray-100
                   ${select==='completed'?'text-[#1A73E8] bg-[#1A73E8]/30': ''}  flex flex-col md:w-[22%] gap-2 text-center md:h-[180px] justify-center items-center`}
          onClick={handleCompleteSelect}>
           <span className="md:hidden">{smTitle}</span>
           <span className={`hidden md:inline text-xl text-gray-600`}>{mdtitle}</span>
           <span className="hidden md:inline text-2xl font-bold">{number}</span>
           <span className={`hidden md:inline ${select==='completed'?'text-white': 'text-gray-500'}`}>{description}</span>
        </button>
    )
}
export default DashboardCards;