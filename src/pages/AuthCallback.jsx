import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabse_client";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      try {
        console.log("OAuth callback URL:", window.location.href);
        const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });
        if (error) {
          console.error("OAuth exchange error:", error);
          return;
        }

        console.log("Session established:", data.session);
        setTimeout(() => navigate("/dashboard"), 500);
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    handleOAuthRedirect();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-xl text-gray-700">
      <p>Finishing up your sign-in...</p>
      <p className="text-sm text-gray-500">(You’ll be redirected shortly)</p>
    </div>
  );
};

export default AuthCallback;
