import MessagesContainer from "../Messages/MessagesContainer";
import InputMessage from "../InputMessage/InputMessage";
import "./ChatContainer.css";

const Chat = () => {
  return (
    <div className="chatContainer">
      <MessagesContainer />
      <InputMessage />
    </div>
  );
};

export default Chat;

// {
//   // backgroundImage: `url("https://img.freepik.com/free-vector/children-space-illustration_23-2149627316.jpg?w=360&t=st=1682825216~exp=1682825816~hmac=fa1fcc5b671c7920ab24d598840dbc8be707e58cda50640c34d7b13407c51961")`,

//   // backgroundImage: `url("https://img.freepik.com/premium-vector/galaxy-pattern-dark-space-background_739746-92.jpg?w=826")`,
//   backgroundRepeat: "no-repeat",
//   // backgroundSize: "auto",
//   backgroundSize: "100% auto",
// }
