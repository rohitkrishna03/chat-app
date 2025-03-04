/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";

const Chat = () => {
    const { user } = useContext(AuthContext);
    const { userChats, isUserChatsLoading, userChatsError } = useContext(ChatContext);

    console.log("UserChats", userChats);


    return (
        <Container>
            <PotentialChats/>
            {userChats?.length < 1 ? null : (
                <Stack direction="horizontal" gap={4}
                    className="align-item-start">
                    <Stack className="message-box flex-grow-0" gap={3}>
                        {isUserChatsLoading && <p>loading chats ..</p>}
                        {userChats?.map((chat, index) => {
                            return (
                                <div key={index}>
                                    <UserChat chat={chat} user={user} />

                                </div>
                            );

                        })}
                    </Stack>
                    <p>ChatBox</p>
                </Stack>
            )}
        </Container>
    );

};

export default Chat;