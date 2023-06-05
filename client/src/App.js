import "./App.css";
import ChatContainer from "./Conversation/ChatContainer/ChatContainer";
import SocketProvider from "./ContextApi/socketProvider.js";
import NavBar from "./Conversation/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <NavBar />
        <ChatContainer />
      </SocketProvider>
    </div>
  );
}

export default App;
