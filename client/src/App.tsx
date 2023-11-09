import io from "socket.io-client"
import React from 'react'

const socket = io("http://localhost:3001")
type Msg = {
  msg:string
  id:number
}
function App() {
  const [messages,setMessages] = React.useState<Msg[]>([])
  const [message,setMessage]= React.useState("")

  const sendMessage = ()=>{
    socket.emit("message", {msg:message,id:Math.random()})
  }

React.useEffect(() => {
  const receiveMessage = (data: Msg) => {
      setMessages((p: Msg[]) => [...p, data]);
  };

  socket.on("receive", receiveMessage);

  return () => {
    // Clean up the event listener when the component is unmounted
    socket.off("receive", receiveMessage);
  };
}, [socket]);

  return (
    <div>
      <div>
        <input value={message} onChange={(e)=>{setMessage(e.target.value)}}></input>
        <button onClick={sendMessage}>send</button>
      </div>
      <div>
        {messages.map((msg,i)=>{
          return <div key={i}>{msg.msg}</div>
        })}
      </div>
    </div>
  )
}

export default App
