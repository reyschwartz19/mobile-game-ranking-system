import {useContext } from "react";
import {DropBarContext} from "../pages/dashboard.jsx";

export function DropBar({children}){

    const open = useContext(DropBarContext);

    return(
        <aside className={`${open ? 'flex' : 'hidden'}  bg-white shadow-md rounded-md`}>
         <ul className="flex-1 px-3">{children}</ul>
        </aside>
    );
}

export function DropBarItem({icon, text, active, alert}) {

    return(
            <li className={`
     relative flex items-center py-2 px-3 my-1
     font-medium rounded-md cursor-pointer
     transition-colors
     ${active ? 'bg-[#62b1ff]/20 text-[#62b1ff]' : 'text-gray-600 hover:bg-gray-100'}
    `}>
            {icon}
            <span className={`ml-3 overflow-hidden transition-all`}>{text}</span>
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400
                     top-2`
                }/>
            )}
         </li>
    );
}

