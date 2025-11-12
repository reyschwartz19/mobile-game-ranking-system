import { createContext, useState, useContext } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
const DropBarContext = createContext();

export function DropBar({children}){
    const [open, setOpen] = useState();

    return(
        <aside className="relative">
         <nav className="flex flex-col">

         </nav>
        </aside>
    );
}

