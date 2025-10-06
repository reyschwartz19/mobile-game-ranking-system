import gIcon from '../assets/google-icon.svg'

const AuthOptions = () =>{

    return(
        <section className="w-full px-10">
            <p className="font-roboto text-5xl mb-1.5 text-gray-600 text-center">Match<span className="text-[#62b1ff]">Point</span></p>
            <p className="text-center text-2xl text-gray-800 mb-5">Leveling up the comps Scene</p>
            <div className="flex flex-col justify-center w-full">
                <button className="bg-[#62b1ff] text-white py-1.5 w-full h-[60px] my-2.5 rounded-lg text-2xl mb-5">Sign Up with Email</button>
            <div className="flex w-full gap-4 mb-10">
               <button className='flex h-[60px] shadow-2xl items-center justify-center rounded-lg w-[50%] text-2xl'>
                 <img src={gIcon} className='w-7 h-7'/>
                 <span>Google</span>
               </button>
               <button className='flex h-[60px] shadow-2xl items-center justify-center rounded-lg w-[50%] text-2xl bg-[#ee9e62] text-white'>
                   <span>Sign In</span>
               </button>
            </div>
            <p className='text-center text-gray-500'>By continuing, you are agreeing to our&nbsp;
                  <a href="#" className='text-gray-900'>Terms</a> & <a href="#" className='text-gray-900'>Privacy Policy</a></p>
            </div>
        </section>
    );

}

export default AuthOptions