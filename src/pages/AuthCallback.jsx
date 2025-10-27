import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabse_client";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let subscription = null;

    const handleOAuthRedirect = async () => {
      try {
        console.log("AuthCallback: URL:", window.location.href);
        // Prefer getSessionFromUrl when available (some supabase client versions provide it)
        if (typeof supabase.auth.getSessionFromUrl === 'function') {
          const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });

          if (error) {
            console.error("AuthCallback: error exchanging session from URL:", error);
          } else if (data?.session) {
            console.log("AuthCallback: session from URL:", data.session);
            navigate("/dashboard");
            return;
          } else {
            console.log("AuthCallback: no session returned from getSessionFromUrl, checking existing session");
          }
        } else {
          console.log('AuthCallback: getSessionFromUrl not available on this client, parsing URL fragment');
          // Try to parse access token from URL fragment (common with OAuth redirect)
          const hash = window.location.hash || '';
          const params = new URLSearchParams(hash.replace(/^#/, ''));  //manually retrieve params
          const access_token = params.get('access_token');
          const refresh_token = params.get('refresh_token');
          if (access_token) {
            try {
              const { data: setData, error: setError } = await supabase.auth.setSession({ access_token, refresh_token });
              if (setError) {
                console.error('AuthCallback: error setting session from fragment:', setError);
              } else {
                console.log('AuthCallback: session set from fragment:', setData.session ?? setData);
                navigate('/dashboard');
                return;
              }
            } catch (err) {
              console.error('AuthCallback: error while calling setSession:', err);
            }
          }
        }

        // Fallback: check existing session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error('AuthCallback: error getting session:', sessionError);
        }

        if (sessionData?.session) {
          console.log('AuthCallback: found existing session:', sessionData.session);
          navigate('/dashboard');
          return;
        }

        // Subscribe to auth state changes and wait for SIGNED_IN
        console.log('AuthCallback: subscribing to auth state changes');
        subscription = supabase.auth.onAuthStateChange((event, session) => {
          console.log('AuthCallback onAuthStateChange:', event, session);
          if (event === 'SIGNED_IN' && session) {
            console.log('AuthCallback: user signed in — navigating to dashboard');
            navigate('/dashboard');
          }
        });
      } catch (err) {
        console.error('AuthCallback: unexpected error', err);
      }
    };

    handleOAuthRedirect();

    return () => {
      try {
        if (subscription && typeof subscription?.unsubscribe === 'function') {
          subscription.unsubscribe();
        } else if (subscription && subscription.data) {
          // accommodate supabase returns like { data: { subscription } }
          subscription.data?.subscription?.unsubscribe?.();
        }
      } catch (err) {
        console.warn('AuthCallback: error cleaning up subscription', err);
      }
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-xl text-gray-700">
      <p>Finishing up your sign-in...</p>
      <p className="text-sm text-gray-500">(You’ll be redirected shortly)</p>
    </div>
  );
};

export default AuthCallback;
