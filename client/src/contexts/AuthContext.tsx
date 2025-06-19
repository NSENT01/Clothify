import { useState, useEffect, createContext } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import axios from 'axios';

type AuthContextType = {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  checked: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

{/* fetches user profile, if it exists set user to profile data, else set null, return values to children components */}
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    axios.get("/api/auth/profile/", {
      withCredentials: true,
    })
      .then(res => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setChecked(true);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, checked }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;