import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/Authcontext";

const Dashboard = () =>{

    const {session, signOut} = UserAuth();
    const navigate = useNavigate();

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
    return(
        <div>
            Hello!
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );

}

export default Dashboard;