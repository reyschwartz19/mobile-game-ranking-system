import bg1 from '../assets/bg1.jpg';
import {Eye,EyeClosed } from 'lucide-react';
import gIcon from '../assets/google-icon.svg';
import {  useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { UserAuth } from '../context/Authcontext';                                                                                                
import { useNavigate } from 'react-router-dom';

const Authentication = () =>{

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const mode = searchParams.get("mode");
    const [showPassword,setShowPassword] = useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    const [loading,setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const {signUp,signIn,googleSignIn} = UserAuth();
   

    const handleSignUp = async (e) =>{
      e.preventDefault();
      
      setLoading(true);
      setErrorMessage('');
      try{
        const result = await signUp(email,password,{emailRedirectTo: `${window.location.origin}/confirm`});
        if(result.success){
          setSuccess(true);
        }
      }catch(error){
        setErrorMessage('Sign up failed. Please try again.',error);
      }finally{
        setLoading(false);
        setErrorMessage('');
      }
    }

    const handleSignIn = async (e) =>{
      e.preventDefault();
      setLoading(true);
      setErrorMessage('');
      try{
        const result = await signIn(email,password);
        if(result.success){
          console.log('Sign in successful');
          navigate('/dashboard');
        }else{
          setErrorMessage('Sign in failed, please check your credentials and try again.');
          console.log(errorMessage);
        }
        
      }catch(error){
        setErrorMessage( error.message || 'Sign in failed. Please try again.' );
      }finally{
        setLoading(false);
        
      }   //old code didnt work like sign up because with sign in supabse throws an error that goes to the catch block but sign up returns a resolved promise even on failure
    }

    const hanldeGoogleSignIn = async (e) =>{
      e.preventDefault();
      setLoading(true);
      setErrorMessage('');
      try{
            const result = await googleSignIn();
            if(result.success){
              console.log('Sign in succesful');
             
            }else{
              setErrorMessage('Sign in Error, please try again');
            }
      }catch(error){
           setErrorMessage(error.message || 'Sign in failed. Please try again.')
      }finally{
         setLoading(false);
      }
    }

    const handlePressStart = () =>{
        setShowPassword(true);
    };

    const handlePressEnd = () =>{
          setShowPassword(false);
    };

    const showButtons = !mode;

  return(
    <section className='flex items-center justify-center w-full h-screen bg-cover bg-center sm:py-4' style={{backgroundImage: `url(${bg1})`}}>
    <div className={`flex ${showButtons ? 'items-baseline-last': 'items-center'} py-3 justify-center pb-6 w-full h-full bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,1))]
                    sm:bg-none sm:w-[60%] sm:h-auto sm:bg-white/30 sm:backdrop-blur-md sm:border sm:border-white/20
                    md:w-[50%]`}>
        <section className="w-full px-10">
            <p className="font-roboto text-5xl mb-1.5 text-gray-600 text-center">Match<span className="text-[#62b1ff]">Point</span></p>
            <p className="text-center text-2xl text-gray-800 mb-5">{showButtons? ('Leveling up the comps Scene'): ('Log in or sign up') }</p>
            <div className="flex flex-col justify-center w-full">
                  { showButtons ? ( 
                        <div>
                            <button className="bg-[#62b1ff] text-white py-1.5 w-full h-[60px] my-2.5 rounded-lg text-2xl mb-5 cursor-pointer hover:bg-[#3b7ec2]"
                            onClick={()=> setSearchParams({mode: "signup"})}
                            >
                                Sign Up with Email
                            </button>
                                       
                            <div className="flex w-full gap-4 mb-10">
                                <button className='flex h-[60px] shadow-2xl items-center justify-center rounded-lg w-[50%] text-2xl cursor-pointer bg-white hover:bg-[#3b7ec2]'
                                 onClick={hanldeGoogleSignIn}
                                 disabled = {loading}
                                 >
                             <img src={gIcon} className='w-7 h-7'/>&nbsp;
                             <span>Google</span>
                                </button>
                                           <button className='flex h-[60px] shadow-2xl items-center justify-center rounded-lg w-[50%] text-2xl bg-[#ee9e62] text-white hover:bg-[#c57f49] cursor-pointer '
                                           onClick={()=> setSearchParams({mode: "signin"})}
                                           >
                               <span>Sign In</span>
                                           </button>
                                        </div>
                        </div>
                        ) : (
                        <div className='w-full'>
                            { mode === "signup" && (
                                <form className='flex flex-col gap-4 w-full justify-center items-center'>
                                    <input 
                                          type='email' 
                                          placeholder='Email' 
                                          className='text-gray-900 w-[70%] outline-1 outline-black p-1.5 rounded-lg  ' 
                                          onChange={(e)=>setEmail(e.target.value)}/>
                                     <div className='w-[70%]  outline-black outline-1 rounded-lg flex items-center pr-1.5'>
                                       <input 
                                             type={showPassword? "text" : "password"} 
                                             placeholder='Password' 
                                             autoComplete='new-password'
                                             className='text-gray-900 w-full  p-1.5  outline-none'
                                             onChange={(e)=>setPassword(e.target.value)} />
                                       <button  type='button'
                                       onMouseDown={handlePressStart}
                                       onMouseUp={handlePressEnd}
                                       onTouchStart={handlePressStart}
                                       onTouchEnd={handlePressEnd}
                                       >
                                          {showPassword?(
                                             <Eye/>
                                          ):(
                                             <EyeClosed/>
                                          )
                                          
                                       }
                                       </button>
                                    </div>
                                     <button
                                            className='bg-[#62b1ff] text-white rounded-lg h-[40px] w-[100px] cursor-pointer hover:bg-[#3b7ec2]'
                                            onClick={handleSignUp}
                                            disabled={loading}>
                                             {loading?'Signing Up...':'Continue'}
                                     </button>
                                    { errorMessage !== ''? (<div className='flex items-center justify-center w-[70%]  border-red-500 border-2 rounded-lg p-2'>
                                        <p>{errorMessage}</p>
                                     </div>): ''}
                                     {
                                       success ? (
                                        <div className='flex items-center justify-center w-[70%]  border-green-500 border-2 rounded-lg p-2'>
                                        <p>Sign Up Successful! Please check your email to confirm your account and proceed to <span className='text-[#62b1ff] cursor-pointer'
                                                                                                                              onClick={()=> setSearchParams({mode: "signin"})}
                                                                                                                              >sign in</span>.</p>
                                     </div>
                                       ) : ''
                                     }
                                     <div>Already Have an account? <span className='text-[#62b1ff] cursor-pointer'
                                         onClick={()=> setSearchParams({mode: "signin"})}>
                                      Sign In</span></div>
                                      <div className='flex items-center gap-4 w-full my-2.5'>
                                           <hr className='flex-grow border-t border-gray-900'/>
                                           <p>OR</p>
                                           <hr className='flex-grow border-t border-gray-900'/>
                                      </div>
                                       <button className='flex h-[40px] shadow-lg items-center justify-center rounded-lg w-[70%]  cursor-pointer bg-white mb-2.5'
                                        onClick={hanldeGoogleSignIn}>
                             <img src={gIcon} className='w-7 h-7'/>&nbsp;
                             <span>Continue with Google</span>
                                </button>
                                </form>
                                
                            )
        
                            }
                            {
                              mode === 'signin' && (
                                  <form className='flex flex-col gap-4 w-full justify-center items-center'>
                                    <input type='email' 
                                           placeholder='Email' 
                                           onChange={(e)=>setEmail(e.target.value)}
                                           className='text-gray-900 w-[70%] outline-1 outline-black p-1.5 rounded-lg  ' />
                                     <div className='w-[70%]  outline-black outline-1 rounded-lg flex items-center pr-1.5'>
                                       <input type={showPassword? "text" : "password"} 
                                              placeholder='Password' 
                                              autoComplete='new-password'
                                              onChange={(e)=>setPassword(e.target.value)}
                                              className='text-gray-900 w-full  p-1.5  outline-none' />
                                       <button  type='button'
                                       onMouseDown={handlePressStart}
                                       onMouseUp={handlePressEnd}
                                       onTouchStart={handlePressStart}
                                       onTouchEnd={handlePressEnd}
                                       >
                                          {showPassword?(
                                             <Eye/>
                                          ):(
                                             <EyeClosed/>
                                          )
                                          
                                       }
                                       </button>
                                    </div>
                                      <button
                                            className='bg-[#62b1ff] text-white rounded-lg h-[40px] w-[100px] cursor-pointer hover:bg-[#3b7ec2]'
                                            onClick={handleSignIn}
                                            disabled={loading}>
                                             {loading?'Logging In...':'Continue'}
                                     </button>
                                    { errorMessage !== ''? (<div className='flex items-center justify-center w-[70%]  border-red-500 border-2 rounded-lg p-2'>
                                        <p>{errorMessage}</p>
                                     </div>): ''}
                                     <div>Don't Have an account? <span className='text-[#62b1ff] cursor-pointer'
                                         onClick={()=> setSearchParams({mode: "signup"})}>
                                      Sign Up</span></div>
                                      <div className='flex items-center gap-4 w-full my-2.5'>
                                           <hr className='flex-grow border-t border-gray-900'/>
                                           <p>OR</p>
                                           <hr className='flex-grow border-t border-gray-900'/>
                                      </div>
                                       <button className='flex h-[40px] shadow-lg items-center justify-center rounded-lg w-[70%]  cursor-pointer bg-white mb-2.5'
                                        onClick={hanldeGoogleSignIn}>
                             <img src={gIcon} className='w-7 h-7'/>&nbsp;
                             <span>Continue with Google</span>
                                </button>
                                </form>
                              )
                            }
                        </div>
                    )
                    }
                    <p className='text-center text-gray-500'>By continuing, you are agreeing to our&nbsp;
                          <a href="#" className='text-gray-900'>Terms</a> & <a href="#" className='text-gray-900'>Privacy Policy</a></p>
                    </div>        
                </section> 
     </div>
    </section>
   );

}

export default Authentication