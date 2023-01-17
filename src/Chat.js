import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import { useParams } from "react-router-dom";
import {
  doc,
  onSnapshot,
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { useStateValue } from "./StateProvider";
import db from "./firebase";
import "./Chat.css";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();
  let { roomId } = useParams();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (roomId) {
      const docRef = doc(db, "rooms", roomId);
      const q = query(collection(docRef, "messages"), orderBy("timestamp", "asc"));
      const roomNameUnsubscribe = onSnapshot(docRef, (doc) => {
        setRoomName(doc.data().name);
      });
      const messageUnsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });

      return () => {
        roomNameUnsubscribe();
        messageUnsubscribe();
      };
    }
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "rooms", roomId);
    await addDoc(collection(docRef, "messages"), {
      name: user.displayName,
      message: input,
      timestamp: serverTimestamp()
    });
    setInput("");
  };

  return (
    <div className="Chat">
      <div className="chat_header">
        <IconButton aria-label="avatar">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        </IconButton>

        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at {new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()}</p>
        </div>

        <div className="chat_headerRight">
          <IconButton aria-label="search">
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton aria-label="attachfile">
            <AttachFileIcon />
          </IconButton>
          <IconButton aria-label="more">
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((message, index) => (
          <p className={`chat_message ${message.name === user.displayName && "chat_reciever"}`} key={`message_${index}`}>
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <IconButton aria-label="insert-emoticon">
          <InsertEmoticonIcon />
        </IconButton>
        <form>
          <input
            type="text"
            value={input}
            placeholder="Type a message"
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <IconButton aria-label="mic">
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
