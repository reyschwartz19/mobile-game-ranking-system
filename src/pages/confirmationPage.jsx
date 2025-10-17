// src/pages/Confirm.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabse_client';

const Confirm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      // Handle the fragment from the email link
      const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });
      if (error) {
        console.error('Error exchanging session:', error);
        return;
      }
      console.log('Session confirmed:', data.session);
      navigate('/dashboard'); // or wherever you want to redirect
    };

    handleRedirect();
  }, [navigate]);

  return (
    <section className="flex items-center justify-center h-screen">
      <p>Confirming your account... please wait</p>
    </section>
  );
};

export default Confirm;
