import React, { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../types";
interface childrenProps {
  children: ReactNode;
}

interface userProps {
  userId: string;
  name: string;
  mobileNo: string;
  busName: string;
  from: string;
  to: string;
  busId: string;
  seat: string[];
  ticketAmount: number;
  useremail: string;
}

interface contextType {
  authUser: User | undefined;
  setAuthUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  logged: boolean | undefined;
  setLogged: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  theme: boolean | undefined;
  setTheme: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  userInfo: userProps | null;
  setUserInfo: React.Dispatch<React.SetStateAction<userProps | null>>;
}

const authContext = createContext<contextType | null>(null);

export const AuthProvider = ({ children }: childrenProps) => {
  const [authUser, setAuthUser] = useState<User>();
  const [logged, setLogged] = useState<boolean>();
  const [theme, setTheme] = useState<boolean | undefined>(true);
  const [userInfo, setUserInfo] = useState<userProps | null>(null);
  return (
    <authContext.Provider
      value={{
        authUser,
        setAuthUser,
        logged,
        setLogged,
        theme,
        setTheme,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  } else {
    return context;
  }
};
