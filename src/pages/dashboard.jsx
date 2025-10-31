import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/Authcontext";
import { Menu, Plus, Search } from "lucide-react";
import { useState } from "react";

const Dashboard = () =>{

    const {session, signOut} = UserAuth();
    const navigate = useNavigate();
    const [select, setSelect] = useState('all');

    console.log(session);

 const handleSignOut = async (e) =>{
        e.preventDefault();
        try{
            await signOut();
            navigate('/');
        }catch(error){
            console.error('Error signing out:', error);
        }
    }
 const handleUpcomingSelect =() =>{
    setSelect('upcoming');
 }
 const handleLiveSelect =() =>{
    setSelect('live');
 }
 const handleCompleteSelect =() =>{
    setSelect('completed');
 }
 const handleAllSelect =() =>{
    setSelect('all');
 }
 return(
  <section className="w-full px-3 py-2 bg-[#F9FAFB]  h-screen font-roboto">
            {/* Hello!
            <button onClick={handleSignOut}>Sign Out</button> */}
    <section className="w-full flex justify-between border-b-2 border-gray-300 pb-1.5">
     <Menu className="w-8 h-8"/>
     <p className="text-2xl font-bold text-gray-900">Tournaments</p>
     <button className="flex gap-2 items-center text-[1.2rem] bg-[#1A73E8] text-white px-4 py-1.5 rounded-md hover:bg-[#4a90e2]">
      <Plus />
      New
      </button>
      </section>
    <section className="w-full flex justify-center my-2.5">
        <div className="flex items-center w-full gap-2 bg-white h-[40px] px-2.5 rounded-md
         text-[1.1rem] border-1 border-gray-300
         sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px]
         sm:h-[50px]">
         <Search className="text-gray-400"/>
         <input type="text" placeholder="Search Tournament by name...."
          className="w-full h-full outline-none"/>
        </div>
    </section>
    <section className="my-3 flex items-center justify-between">
      <button
       className={`border-1 border-gray-300 px-4 py-1.5 rounded-md hover:bg-gray-100
                ${select==='all'?'text-[#1A73E8] bg-[#1A73E8]/30': ''}  flex flex-col md:w-[22%] gap-2 text-center md:h-[180px] justify-center items-center`}
       onClick={handleAllSelect}>
        <span className="md:hidden">All</span>
        <span className={`hidden md:inline text-xl text-gray-600`}>All tournaments</span>
        <span className="hidden md:inline text-2xl font-bold">6</span>
        <span className={`hidden md:inline ${select==='all'?'text-white': 'text-gray-500'}`}>All Tournaments managed</span>
      </button>
       <button
       className={`border-1 border-gray-300 px-4 py-1.5 rounded-md hover:bg-gray-100
                ${select==='live'?'text-[#1A73E8] bg-[#1A73E8]/30': ''}  flex flex-col md:w-[22%] gap-2 text-center md:h-[180px] justify-center items-center`}
       onClick={handleLiveSelect}>
        <span className="md:hidden">Live</span>
        <span className={`hidden md:inline text-xl text-gray-600`}>Live</span>
        <span className="hidden md:inline text-2xl font-bold">3</span>
        <span className={`hidden md:inline ${select==='live'?'text-white': 'text-gray-500'}`}>Curretly Going On</span>
      </button>
        <button
       className={`border-1 border-gray-300 px-4 py-1.5 rounded-md hover:bg-gray-100
                ${select==='upcoming'?'text-[#1A73E8] bg-[#1A73E8]/30': ''}  flex flex-col md:w-[22%] gap-2 text-center md:h-[180px] justify-center items-center`}
       onClick={handleUpcomingSelect}>
        <span className="md:hidden">Upcoming</span>
        <span className={`hidden md:inline text-xl text-gray-600`}>Upcoming tournaments</span>
        <span className="hidden md:inline text-2xl font-bold">6</span>
        <span className={`hidden md:inline ${select==='upcoming'?'text-white': 'text-gray-500'}`}>Starting Soon</span>
      </button>
       <button
       className={`border-1 border-gray-300 px-4 py-1.5 rounded-md hover:bg-gray-100
                ${select==='completed'?'text-[#1A73E8] bg-[#1A73E8]/30': ''}  flex flex-col md:w-[22%] gap-2 text-center md:h-[180px] justify-center items-center`}
       onClick={handleCompleteSelect}>
        <span className="md:hidden">Completed</span>
        <span className={`hidden md:inline text-xl text-gray-600`}>All tournaments</span>
        <span className="hidden md:inline text-2xl font-bold">6</span>
        <span className={`hidden md:inline ${select==='completed'?'text-white': 'text-gray-500'}`}>Finished Tournaments</span>
      </button>
    </section>
 </section>
    );

}

export default Dashboard;