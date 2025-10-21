// src/pages/Confirm.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabse_client';
import bg1 from '../assets/bg1.jpg';

const Confirm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
     
      const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });
      if (error) {
        console.error('Error exchanging session:', error);
        return;
      }
      console.log('Session confirmed:', data.session);
    
    };

    handleRedirect();
  }, []);

  return (
    <section className='flex items-center justify-center w-full h-screen bg-cover bg-center sm:py-4' style={{backgroundImage: `url(${bg1})`}}>
      <p className='flex items-center text-lg bg-white/30  text-center h-[80px]'>Account confirmed, proceed to  &nbsp;<span className='text-[#62b1ff] cursor-pointer '
      onClick={()=>navigate('/?mode=signin')}>
        Sign in</span></p>
    </section>
  );
};

export default Confirm;
