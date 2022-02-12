import React, { useEffect, useState } from 'react';
import './global.css';

export default function App() {
  const [chats, setChats] = useState([]);
  const getMyChats = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjFmZmM2Nzk0YWUwYjA4MWQ1OGNiMGRlIiwiaWF0IjoxNjQ0MzMyNjgxfQ.7GgW7t4uIRwCWf8kFyUM6e9WTv6Ff6Jav5ulVOsGuUQ'
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('http://localhost:3000/api/v1/conversation/', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setChats(result.data);
      })
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    getMyChats();
  }, []);
  return (
    <div className="app">
      <div className="container">
        <div style={{ flexGrow: 1 }}>
          {chats.map((chat) => (
            <div style={{ marginBottom: 4 }}>{chat.channel_name}</div>
          ))}
        </div>
        <div className="message-body">sakdjas</div>
      </div>
    </div>
  );
}
