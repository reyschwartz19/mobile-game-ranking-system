import { ChevronFirst, ChevronLast } from "lucide-react";
import { createContext, useContext, useState } from "react";

const SideBarContext =  createContext();

export function SideBar  ({ children})  {
 const [expanded, setExpanded] = useState()

    return(
        <aside className={`
    h-screen

    sm:transition-all sm:duration-300

    ${expanded
      ? "sm:fixed sm:top-0 sm:left-0 sm:z-50 sm:w-auto"
      : " sm:left-0 sm:top-0 sm:w-auto"
    }

    bg-white
  `}>
        <nav className="h-full flex flex-col   shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
           <p className={`font-roboto text-2xl mb-1.5 text-gray-600  text-left
           overflow-hidden transition-all ${expanded ? 'w-52':'hidden'}
           `}
           >
            Match<span className="text-[#62b1ff]">Point</span>
           </p>
           <button onClick={() => setExpanded(curr =>! curr) } className="p-1.5 rounded-lg bg-gray-50 hover-bg-gray-100 cursor-pointer">
            {expanded ? <ChevronFirst /> : <ChevronLast />}
           </button>
        </div>
     <SideBarContext.Provider value={{expanded}}>
        <ul className="flex-1 px-3">{children}</ul>
    </SideBarContext.Provider>
        <div className={`p-4 border-t border-gray-300 flex justify-between  items-center overflow-hidden transition-all ${expanded ? 'w-full':'hidden'}`}>
            <p className="text-gray-600">njongremy30@gmail.com</p>
            <button className="border-2 border-[#62b1ff] p-1.5 rounded-md text-[#62b1ff] hover:bg-[#62b1ff] hover:text-white cursor-pointer">
                Logout
            </button>
        </div>
        </nav>
        </aside>
    );
}
export function SideBarItem({icon, text, active, alert}) {
    const {expanded} =  useContext(SideBarContext);
  return(
    <li className={`
     relative flex items-center py-2 px-3 my-1
     font-medium rounded-md cursor-pointer
     transition-colors
     ${active ? 'bg-[#62b1ff]/20 text-[#62b1ff]' : 'text-gray-600 hover:bg-gray-100'}
    `}>
            {icon}
            <span className={`ml-3 overflow-hidden transition-all ${expanded ? 'w-52':'hidden'}`}>{text}</span>
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400
                     ${expanded ? '' : 'top-2'}`
                }/>
            )}
         </li>
  )
}