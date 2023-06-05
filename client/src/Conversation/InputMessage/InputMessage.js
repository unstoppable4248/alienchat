import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../ContextApi/socketProvider.js";
import { Button, Tooltip } from "@mui/material";
import "./InputMessage.css";
import ReplayIcon from "@mui/icons-material/Replay";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import MoodIcon from "@mui/icons-material/Mood";

const InputMessage = () => {
  const [socket, io] = useContext(SocketContext);
  const [inputValue, setInputValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (socket) {
      socket.on("room-count", (data) => {
        if (data === 2) {
          toast.success("Alien 👽 Connected!", {
            position: "bottom-left",
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setFlag(false);
        }
      });

      socket.on("alien-disconnected", () => {
        toast.error("Alien 👽 Disconnected!", {
          position: "bottom-left",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setFlag(true);
      });

      socket.on("connect", () => {
        setInputValue("");
        setFlag(true);
      });

      socket.on("disconnect", () => {
        setInputValue("");
        setFlag(true);
      });
    }
  }, [socket, io]);

  const handleSendMessage = () => {
    if (inputValue !== "" && flag === false && socket && socket.connected)
      socket.emit("send-message", {
        id: socket.id,
        content: inputValue,
        time: new Date().toLocaleTimeString("en-US", {
          hour12: true,
          hourCycle: "h12",
          hour: "numeric",
          minute: "numeric",
        }),
      });
    setInputValue("");
  };

  const handleChange = (e) => {
    if (flag === false) setInputValue(e.target.value);
  };

  const handleEmojiChange = (emoji) => {
    if (flag === false) setInputValue(inputValue + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleOpenEmoji = () => {
    setShowEmojiPicker(true);
  };

  const handleCloseEmoji = () => {
    setShowEmojiPicker(false);
  };

  const handleReconnect = () => {
    if (socket) {
      socket.disconnect();
      socket.connect();
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="input-message-container">
      <Tooltip title="Reconnect" placement="top">
        <Button variant="outlined" size="medium" onClick={handleReconnect}>
          <ReplayIcon />
        </Button>
      </Tooltip>

      <input disabled={flag} value={inputValue} onKeyDown={handleEnterKey} onChange={handleChange} type="text" placeholder="Type a message...." className="input" />

      <Button variant="text" onClick={handleOpenEmoji}>
        <MoodIcon />
      </Button>

      <div className="emoji-picker" onMouseLeave={handleCloseEmoji} onMouseOut={handleCloseEmoji}>
        {showEmojiPicker && <Picker data={data} onEmojiSelect={handleEmojiChange} />}
      </div>

      <Button variant="outlined" onClick={handleSendMessage}>
        <SendIcon />
      </Button>

      <ToastContainer />
    </div>
  );
};

export default InputMessage;
