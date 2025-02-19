import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const PotentialChats = () => {

    const { PotentialChats } = useContext(ChatContext);
    console.log("PotentialChats", PotentialChats);
    return (
        <>
            <div className="all-users">
                {PotentialChats && PotentialChats.map((u, index) => {
                    return (
                        <div className="single-user" key={index}>
                        {u.name}
                        <span className="user-online"></span>
                    </div>
                    );   
                })}
            </div>
        </>
    );
}

export default PotentialChats;