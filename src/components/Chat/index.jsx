import React from 'react';
import './Chat.scss';

function Chat({ socket, messages, setMessages }) { 
  React.useEffect(() => {
    socket.on("message", (data) => {
      let temp = messages;
      console.log(messages);
      if (data.user === "client") {
        temp.push({
          id: messages.length+1,
          user: data.user,
          text: data.text,
        });
      } else {
        temp.push({
          id: messages.length+1,
          user: "admin",
          text: data.text,
        });
      }
      setMessages([...temp]);
    });
  }, [socket]);

  return (
    <div className="chat-container">
      {messages.map((i) => {
        return (
          <div key={i.id} className={i.user === "admin" ? "message-admin" : 'message-client'}>
            <div className="message-container">
              <p>{i.text}</p>
              {(i.user === "client") && <span>Cliente</span>}
              {(i.user === "admin") && <span>Admin</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Chat }
