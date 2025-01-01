// src/components/Chat/UserInbox.jsx
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import axios from "axios";

import {
  ArrowLeft,
  Send,
  Image as ImageIcon,
  Circle,
  ChevronDown
} from "lucide-react";
import {
  ScrollArea,
  ScrollBar
} from "@/components/ui/scroll-area";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import api from "@/utils/server";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";

const ENDPOINT = "http:localhost:4000/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

// Main UserInbox Component
const UserInbox = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [images, setImages] = useState();
  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);

  // Socket.io message listener
  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // Handle arrival messages
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // Fetch conversations
  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await api.get(
          `/conversation/get-all-conversation-user/${user?._id}`
        );
        setConversations(response.data.conversations);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    getConversation();
  }, [user, messages]);

  // Handle online users
  useEffect(() => {
    if (user) {
      const userId = user?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  // Check if user is online
  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };

  // Fetch messages for current chat
  useEffect(() => {
    const getMessage = async () => {
      try {
        if (currentChat?._id) {
          const response = await api.get(
            `/message/get-all-messages/${currentChat._id}`
          );
          setMessages(response.data.messages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    getMessage();
  }, [currentChat]);

  // Send message handler
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user?._id
    );

    socketId.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      const response = await api.post(`/message/create-new-message`, message);
      setMessages([...messages, response.data.message]);
      await updateLastMessage();
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Update last message
  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user._id,
    });

    try {
      await api.put(`/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: user._id,
      });
    } catch (error) {
      console.error("Error updating last message:", error);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages(reader.result);
        imageSendingHandler(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Send image message
  const imageSendingHandler = async (imageData) => {
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socketId.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      images: imageData,
    });

    try {
      const response = await api.post(
        `/message/create-new-message`,
        {
          images: imageData,
          sender: user._id,
          text: newMessage,
          conversationId: currentChat._id,
        }
      );
      setImages(null);
      setMessages([...messages, response.data.message]);
      await updateLastMessageForImage();
    } catch (error) {
      console.error("Error sending image:", error);
    }
  };

  // Update last message for image
  const updateLastMessageForImage = async () => {
    try {
      await api.put(
        `/conversation/update-last-message/${currentChat._id}`,
        {
          lastMessage: "Photo",
          lastMessageId: user._id,
        }
      );
    } catch (error) {
      console.error("Error updating last message for image:", error);
    }
  };

  // Auto scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full min-h-screen bg-gray-50">
        <Header/>
      {!open ? (
        <div className="max-w-4xl p-4 mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Messages</CardTitle>
          </CardHeader>
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-[700px] w-full">
                {conversations.map((item, index) => (
                  <React.Fragment key={index}>
                    <MessageList
                      data={item}
                      index={index}
                      setOpen={setOpen}
                      setCurrentChat={setCurrentChat}
                      me={user?._id}
                      setUserData={setUserData}
                      userData={userData}
                      online={onlineCheck(item)}
                      setActiveStatus={setActiveStatus}
                      loading={loading}
                    />
                    {index < conversations.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
                <ScrollBar />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      ) : (
        <ChatWindow
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={user?._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

// MessageList Component
const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  userData,
  online,
  setActiveStatus,
  loading
}) => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveStatus(online);
    const userId = data.members.find((user) => user !== me);
    
    const getUser = async () => {
      try {
        const response = await axios.get(`${server}/shop/get-shop-info/${userId}`);
        setUser(response.data.shop);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    getUser();
  }, [me, data, setActiveStatus, online]);

  const handleClick = () => {
    setActive(index);
    setOpen(true);
    setCurrentChat(data);
    setUserData(user);
    setActiveStatus(online);
    navigate(`/inbox?${data._id}`);
  };

  return (
    <div
      className={`p-4 cursor-pointer hover:bg-gray-100 transition-colors ${
        active === index ? "bg-gray-100" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user?.avatar?.url} alt={user?.name} />
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          </Avatar>
          {online && (
            <Badge 
              className="absolute w-4 h-4 p-0 bg-green-500 rounded-full -top-1 -right-1"
              variant="secondary"
            >
              <Circle className="w-3 h-3 text-white" />
            </Badge>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {user?.name}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {!loading && data?.lastMessageId !== userData?._id
              ? "You:"
              : `${userData?.name?.split(" ")[0]}: `}
            {data?.lastMessage}
          </p>
        </div>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

// ChatWindow Component
const ChatWindow = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  scrollRef,
  handleImageUpload,
}) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={userData?.avatar?.url} alt={userData?.name} />
              <AvatarFallback>{userData?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{userData?.name}</h2>
              {activeStatus && (
                <p className="text-sm text-green-500">Active Now</p>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((item, index) => (
            <div
              key={index}
              className={`flex ${
                item.sender === sellerId ? "justify-end" : "justify-start"
              }`}
              ref={scrollRef}
            >
              {item.sender !== sellerId && (
                <Avatar className="w-8 h-8 mr-2 shrink-0">
                  <AvatarImage src={userData?.avatar?.url} alt={userData?.name} />
                  <AvatarFallback>{userData?.name?.[0]}</AvatarFallback>
                </Avatar>
              )}
              <div className="max-w-[70%]">
                {item.images && (
                  <img
                    src={item.images?.url}
                    alt="Message attachment"
                    className="h-auto max-w-full mb-2 rounded-lg"
                  />
                )}
                {item.text && (
                  <div>
                    <div
                      className={`rounded-lg p-3 ${
                        item.sender === sellerId
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-gray-100"
                      }`}
                    >
                      <p className="break-words">{item.text}</p>
                    </div>
                    <p className={`text-xs text-gray-500 mt-1 ${
                      item.sender === sellerId ? "text-right" : "text-left"
                    }`}>
                      {format(item.createdAt)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <ScrollBar />
      </ScrollArea>

      <div className="p-4 bg-white border-t">
        <form
          onSubmit={sendMessageHandler}
          className="flex items-center max-w-4xl mx-auto space-x-2"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => document.getElementById('image-upload').click()}
          >
            <ImageIcon className="w-5 h-5" />
            <input
              id="image-upload"
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </Button>
          <Input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" className="shrink-0">
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserInbox;