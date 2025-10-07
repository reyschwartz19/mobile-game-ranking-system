import gIcon from '../assets/google-icon.svg'
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthOptions = () =>{

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const mode = searchParams.get("mode");

    const showButtons = !mode;

    return(
        <section className="w-full px-10">
            <p className="font-roboto text-5xl mb-1.5 text-gray-600 text-center">Match<span className="text-[#62b1ff]">Point</span></p>
            <p className="text-center text-2xl text-gray-800 mb-5">Leveling up the comps Scene</p>
            <div className="flex flex-col justify-center w-full">
             { showButtons ? ( 
                <div>
                    <button className="bg-[#62b1ff] text-white py-1.5 w-full h-[60px] my-2.5 rounded-lg text-2xl mb-5 cursor-pointer"
                    onClick={()=> setSearchParams({mode: "signup"})}
                    >
                        Sign Up with Email
                    </button>
                               
                    <div className="flex w-full gap-4 mb-10">
                        <button className='flex h-[60px] shadow-2xl items-center justify-center rounded-lg w-[50%] text-2xl cursor-pointer bg-white'>
                     <img src={gIcon} className='w-7 h-7'/>&nbsp;
                     <span>Google</span>
                        </button>
                                   <button className='flex h-[60px] shadow-2xl items-center justify-center rounded-lg w-[50%] text-2xl bg-[#ee9e62] text-white cursor-pointer'
                                   onClick={()=> setSearchParams({mode: "signin"})}
                                   >
                       <span>Sign In</span>
                                   </button>
                                </div>
                </div>
                ) : (
                <div className='w-full'>
                    { mode === "signup" && (
                        <form className='w-full justify-center'>
                            <input type='email' placeholder='Email' className='text-gray-900 w-[50%]'/>
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
    );

}

export default AuthOptions