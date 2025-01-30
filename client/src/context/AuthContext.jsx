/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loginError, setLoginError] = useState(null)
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });
    console.log("loginInfo", loginInfo);
    // console.log("registerInfo", registerInfo);
    // using the above console.log things we can see the op iwhile we inspect in thwebpage and also can see the values fille to the keys.
    console.log("User", user);
    
    useEffect(() => {
        const user = localStorage.getItem("User");
        setUser(JSON.parse(user));
    }, []);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, []);
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info)
    }, []);


    const registerUser = useCallback(async (e) => {
        e.preventDefault()

        setIsRegisterLoading(true)
        setRegisterError(null)
        const response = await postRequest(
            `${baseUrl}/users/register`,
            JSON.stringify(registerInfo)
        );
        setIsRegisterLoading(false)
        if (response.error) {
            return setRegisterError(response);
        }
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    }, [registerInfo]);


    const loginUser = useCallback(async (e) => {

        e.preventDefault()
        setIsLoginLoading(true);
        setLoginError(null)
        const response = await postRequest(
            `${baseUrl}/users/login`,
            JSON.stringify(loginInfo)
        );
        setIsLoginLoading(false)
        if (response.error) {
            return setLoginError(response)
        }
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response);
    }, [loginInfo])


    const logoutUser = useCallback(() => {
        localStorage.removeItem("User");
        setUser(null);

    }, []);





    return (
        <AuthContext.Provider
            value={{
                user,
                registerInfo,
                updateRegisterInfo,
                registerUser,
                registerError,
                isRegisterLoading,
                logoutUser,
                loginUser,
                loginError,
                loginInfo,
                isLoginLoading,
                updateLoginInfo,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}