import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { collection, onSnapshot } from "firebase/firestore";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "./StateProvider";
import { signOut } from "firebase/auth";
import db, { auth } from "./firebase";
import "./Sidebar.css";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }] = useStateValue();
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "rooms"), (snapshot) => {
        const rooms = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        console.log(rooms);
        setRooms(rooms);
    });
    return () => {
        unsubscribe();
    }
  }, []);

  const logout = () => {
    signOut(auth).then(() => {
      console.log("Sign-out successful.");
    }).catch((error) => {
      console.error("An error happened when Signing-out");
    });
  }

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <IconButton aria-label="avatar">
          <Avatar src={user?.photoURL} referrerPolicy="no-referrer"/>
        </IconButton>
        <div className="sidebar_headerRight">
          <IconButton aria-label="status">
            <DonutLargeIcon />
          </IconButton>
          <IconButton aria-label="chat">
            <ChatIcon />
          </IconButton>
          <IconButton aria-label="more" onClick={logout}>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat addnewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
