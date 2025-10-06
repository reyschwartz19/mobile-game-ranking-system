import bg1 from '../assets/bg1.jpg'
import AuthOptions from '../components/authOptions';

const Authentication = () =>{

   return(
    <section className='w-full h-screen bg-cover bg-center' style={{backgroundImage: `url(${bg1})`}}>
     <div className='flex items-baseline-last justify-center pb-6 w-full h-full bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,1))]'>
        <AuthOptions />
     </div>
    </section>
   );

}

export default Authentication