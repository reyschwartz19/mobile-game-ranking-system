import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/Authcontext";
import { Menu, Plus, Search, LayoutDashboard, Settings,ChevronDown, ChevronUp  } from "lucide-react";
import { useState, useContext, createContext } from "react";
import { SideBarItem, SideBar } from "../components/sidebar";
import { DropBar } from "../components/dropbar";
import DashboardCards from "../components/dashboardCards";

const DropBarContext = createContext();

const Dashboard = () =>{
    const [open, setOpen] = useState();
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
  <section className="w-full  bg-[#F9FAFB] font-roboto flex gap-4">
    <aside className="max-sm:hidden">
      <SideBar>
      <SideBarItem icon={<LayoutDashboard />} text="Dashboard" active={true} alert/>
      <SideBarItem icon={<Plus/>} text="New Tournament"/>
      <SideBarItem icon={<Settings />} text="Settings" alert/>
      </SideBar>
    </aside>
    <section className="w-full bg-[#F9FAFB] px-3 py-2">
       <section className="w-full flex justify-between border-b-2 border-gray-300 pb-1.5 items-center">
        <button className="sm:hidden" onClick={() => setOpen(curr => !curr)}>
        {open ? <ChevronUp /> : <ChevronDown />}
        </button>
        <p className="text-2xl font-bold text-gray-900">Dashboard</p>
        <button className="flex gap-2 items-center text-[1.2rem] border-2 border-[#62b1ff] p-1.5 rounded-md text-[#62b1ff] hover:bg-[#62b1ff] hover:text-white cursor-pointer">
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
         <DashboardCards
          select={select} 
          selectType={handleAllSelect} 
          smTitle={'All'} 
          mdtitle={'All tournaments'} 
          number={'6'} 
          description={'All Tournaments managed'} 
          type={'all'}/>
         <DashboardCards
          select={select} 
          selectType={handleLiveSelect} 
          smTitle={'Live'} 
          mdtitle={'Live'} 
          number={'3'} 
          description={'Curretly Going On'} 
          type={'live'}/>
         <DashboardCards
          select={select} 
          selectType={handleUpcomingSelect} 
          smTitle={'Upcoming'} 
          mdtitle={'Upcoming tournaments'} 
          number={'4'} 
          description={'Starting Soon'} 
          type={'upcoming'}/>
         <DashboardCards 
         select={select} 
         selectType={handleCompleteSelect} 
         smTitle={'Completed'}
         mdtitle={'Completed tournaments'}
         number={'4'} 
         description={'Finished Tournaments'} 
         type={'completed'}/>

       </section>
    </section>
 </section>
    );

}

export default Dashboard;