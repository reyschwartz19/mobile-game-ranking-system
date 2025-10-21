import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/Authcontext";

const ProvideRoute = ({children}) =>{
  const {session} = UserAuth();
  
    return <>{session ?<>{children}</>: <Navigate to='/?mode=signin' />}</>;
}

export default ProvideRoute;