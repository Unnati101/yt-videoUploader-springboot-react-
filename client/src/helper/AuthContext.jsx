import { createContext, useContext, useState } from "react";
import { getToken, removeToken, saveToken } from "./local";

const AuthContext=createContext();


export const AuthProvider= ({ children })=>{
    //variables

    const[token,setToken]=useState(getToken());
    //authenticated
    //userinformation
    const loginUser=(token)=>{
        setToken(token);
        saveToken(token)
    };

    const logoutUser=()=>{
        setToken(null)
        removeToken()

    };
    return( <AuthContext.Provider value={{
        token,
        setToken,
        loginUser,
        logoutUser,

    }}>{children}</AuthContext.Provider>
    );
};


export const useAuth=()=>useContext(AuthContext)