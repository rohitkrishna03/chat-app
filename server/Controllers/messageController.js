const messageModel = require('../Models/messageModels');

// createMessage

const createMessage = async(req, res) =>{
    const{chatId,senderId,text} =req.body;

    const message = new messageModel({
        chatId,
        senderId,
        text
    });

    try{
        const response = await message.save();
        res.status(200).json(response);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

// getMessages
const getMessages= async(req,res) =>{
    const {chatId} = req.params;

    try{
        const message = await messageModel.find({chatId})
        res.status(200).json(message);
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports ={createMessage,getMessages}