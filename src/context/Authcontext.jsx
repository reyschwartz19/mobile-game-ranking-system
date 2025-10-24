import { useEffect, createContext,useState, useContext } from "react";
import { supabase } from "../supabse_client";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [session,setSession] = useState(null);

  //sign up
  const signUp  = async(email, password,options={})=>{
    const {data,error} = await supabase.auth.signUp({
        email: email,
        password: password,
        options,
    });
    if(error){
        console.error('Error signing up:', error);
        return{success: false, error};
    }
    return{success: true, data};

  };
 const googleSignIn = async()=>{
    const{data,error} = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/auth/callback`,
        },
    });
    if(error){
        console.error('Error with Google sign-in:', error);
        return {success: false, error};
    }
    return {success: true, data};
 }

  useEffect(()=>{
    supabase.auth.getSession().then(({data: {session}})=>{
        setSession(session);
    });
    const{data: subsription}=supabase.auth.onAuthStateChange((_event, session)=>{
        setSession(session);
    });

    return () => {
       subsription.subscription.unsubscribe();
    }
  },[])

  //sign out
const signOut = async()=>{
    const {error} = supabase.auth.signOut();
    if(error){
        console.error('Error signing out:', error);
    }

}
  //sign in
  const signIn = async (email, password)=>{
   try{ const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });
     if(error){
        console.error('Error signing in:', error);
        return {success: false, error};
     }
     console.log('Sign-in successful:', data);
        return {success: true, data};
}catch(error){
        console.error('Error occurred:', error);
    }
  }

 return(
    <AuthContext.Provider value={{session,signUp,signOut,signIn,googleSignIn}}>
        {children}
    </AuthContext.Provider>
 )
}

export const UserAuth = () =>{
    return useContext(AuthContext);
}

