// src/pages/Confirm.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabse_client';
import bg1 from '../assets/bg1.jpg';

const Confirm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let subscription = null;
    const handleRedirect = async () => {
      try {
        console.log('Confirm: attempting to exchange session from URL');

        if (typeof supabase.auth.getSessionFromUrl === 'function') {
          const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });
          if (error) {
            console.error('Error exchanging session:', error);
          } else if (data?.session) {
            console.log('Session confirmed from URL:', data.session);
            navigate('/dashboard');
            return;
          }
        } else {
          // Parse fragment for access_token if getSessionFromUrl not available
          const hash = window.location.hash || '';
          const params = new URLSearchParams(hash.replace(/^#/, ''));
          const access_token = params.get('access_token');
          const refresh_token = params.get('refresh_token');
          if (access_token) {
            const { data: setData, error: setError } = await supabase.auth.setSession({ access_token, refresh_token });
            if (setError) {
              console.error('Confirm: error setting session from fragment:', setError);
            } else {
              console.log('Confirm: session set from fragment:', setData.session ?? setData);
              navigate('/dashboard');
              return;
            }
          }
        }

        // Fallback: check existing session
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData?.session) {
          console.log('Confirm: existing session found, navigating to dashboard');
          navigate('/dashboard');
          return;
        }

        // Subscribe to auth state changes
        subscription = supabase.auth.onAuthStateChange((event, session) => {
          console.log('Confirm onAuthStateChange:', event, session);
          if (event === 'SIGNED_IN' && session) {
            navigate('/dashboard');
          }
        });
      } catch (err) {
        console.error('Confirm: unexpected error during confirmation flow', err);
      }
    };

    handleRedirect();

    return () => {
      try {
        if (subscription && typeof subscription?.unsubscribe === 'function') {
          subscription.unsubscribe();
        } else if (subscription && subscription.data) {
          subscription.data?.subscription?.unsubscribe?.();
        }
      } catch (err) {
        console.warn('Confirm: error cleaning up subscription', err);
      }
    };
  }, [navigate]);

  return (
    <section className='flex items-center justify-center w-full h-screen bg-cover bg-center sm:py-4' style={{backgroundImage: `url(${bg1})`}}>
      <p className='flex items-center text-lg bg-white/30  text-center h-[80px]'>Account confirmed, proceed to  &nbsp;<span className='text-[#62b1ff] cursor-pointer '
      onClick={()=>navigate('/?mode=signin')}>
        Sign in</span></p>
    </section>
  );
};

export default Confirm;
