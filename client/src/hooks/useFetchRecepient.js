import { useEffect, useState } from "react";
import { baseUrl,getRequest } from "../utils/services";

export const useFetchRecepient = (chat,user) => {
    const[recipientUser, setRecipientUser] = useState(null);
    const[error, setError] = useState(null);

    const recipientId = chat?.members?.find((id) => id !== user?._id);
    // console.log("chat",chat);

    useEffect(()=>{
        const getUser = async()=>{
            const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);
            if(response.error){
                return setError(response.error)
            }
            setRecipientUser(response)


        };
        getUser();
    },[recipientId,error]);

    return {recipientUser,error}
};