import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { collection, addDoc, onSnapshot, doc, query, orderBy } from "firebase/firestore";
import db from "./firebase";
import "./SidebarChat.css";

function SidebarChat({ id, name, addnewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if(id) {
        const docRef = doc(db, "rooms", id);
        const q = query(collection(docRef, "messages"), orderBy("timestamp", "desc"));
        const messageUnsubscribe = onSnapshot(q, (snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
        setSeed(Math.floor(Math.random() * 5000));
    
        return () => {
            messageUnsubscribe(); 
        }
    }
  }, [id]);

  const createChat = async () => {
    const roomName = prompt("Please enter name for chat");
    if (roomName) {
      await addDoc(collection(db, "rooms"), {
        name: roomName,
      });
    }
  };

  return !addnewChat ? (
    <Link to={`rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat_info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat;
