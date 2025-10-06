import bg1 from '../assets/bg1.jpg'
import AuthOptions from '../components/authOptions';

const Authentication = () =>{

   return(
    <section className='flex items-center justify-center w-full h-screen bg-cover bg-center sm:py-4' style={{backgroundImage: `url(${bg1})`}}>
     <div className='flex items-baseline-last justify-center pb-6 w-full h-full bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,1))]
                     sm:bg-none sm:w-[60%] sm:h-auto sm:bg-white/30 sm:backdrop-blur-md sm:border sm:border-white/20
                     md:w-[50%]
     '>
        <AuthOptions />
     </div>
    </section>
   );

}

export default Authentication