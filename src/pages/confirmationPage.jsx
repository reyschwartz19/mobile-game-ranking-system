// src/pages/Confirm.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabse_client';

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
    <section className="flex items-center justify-center h-screen">
      <p>Account confirmed, proceed to <span className='text-[#62b1ff] cursor-pointer'
      onClick={()=>navigate('/?mode=signin')}>
        Sign in</span></p>
    </section>
  );
};

export default Confirm;
