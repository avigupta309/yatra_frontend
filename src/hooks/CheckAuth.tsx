import { useCallback, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./Auth";

export const useCheckAuth = () => {
  const backUrl = import.meta.env.VITE_BACKEND_URL;
  const { setAuthUser, setLogged } = useAuth();

  const checkAuth = useCallback(async () => {
    try {
      const res = await axios.get(`${backUrl}`, {
        withCredentials: true,
      });
      setAuthUser(res.data.user);
      setLogged(true);
      // eslint-disable-next-line
    } catch (error: any) {
      setAuthUser(undefined);
      setLogged(false);
    }
  }, [setAuthUser, setLogged]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { checkAuth };
};
