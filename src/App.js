import React, { useEffect, useState } from 'react';
import './global.css';
import { Button, Modal, Form } from 'react-bootstrap';
export default function App() {
  const [chats, setChats] = useState([]);
  const [show, setShow] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelType, setChannelType] = useState('');
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState('');
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjIwNzY2ZjdhOWE0MTgyNTEzZjJiMGNiIiwiaWF0IjoxNjQ0NjUzNjg3fQ.IEBgh0VLQZG1aoThRyjPCHe98G5Ebxb7mT-ioQe8LEU'
  );
  const [userTokens, setUserTokens] = useState([
    {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjIwNzY2ZjdhOWE0MTgyNTEzZjJiMGNiIiwiaWF0IjoxNjQ0NjUzNjg3fQ.IEBgh0VLQZG1aoThRyjPCHe98G5Ebxb7mT-ioQe8LEU',
      user: 'Haseeb',
    },
    {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjIwNzY2ZjdhOWE0MTgyNTEzZjJiMGNiIiwiaWF0IjoxNjQ0NjUzNjg3fQ.IEBgh0VLQZG1aoThRyjPCHe98G5Ebxb7mT-ioQe8LEU',
      user: 'Wajahat',
    },
    {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjIwNzY3MTdkNjEzNjhiZmE5NWZkZTI0IiwiaWF0IjoxNjQ0NjUzNzY4fQ.j5O40ncKSq8li1t0UTxoh5i-kux2SyQaw63d6Ukq7_o',
      user: 'Sudais',
    },
    {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjIwNzY3MWUyNjZkNjI4ZTQyOTMwNTU5IiwiaWF0IjoxNjQ0NjUzODAwfQ.1R2KDp5N-BeYf1XiKn5hAP_sokTFJm12U8LSWxX7B7s',
      user: 'Taib',
    },
  ]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [messages, setMessages] = useState([]);
  const getMyChats = (loggedInUser) => {
    let _token = loggedInUser ? loggedInUser : token;
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${_token}`);

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

  const getUsers = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch('http://localhost:3000/api/v1/user', requestOptions)
      .then((response) => response.json())
      .then((result) => setUsers(result.data))
      .catch((error) => console.log('error', error));
  };
  const createChat = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjIwNzY3MTdkNjEzNjhiZmE5NWZkZTI0IiwiaWF0IjoxNjQ0NjUzNzY4fQ.j5O40ncKSq8li1t0UTxoh5i-kux2SyQaw63d6Ukq7_o'
    );
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      channel_name: channelName,
      channel_type: channelType,
      members: [members],
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:3000/api/v1/conversation', requestOptions)
      .then((response) => response.json())
      .then((result) => alert(result.response))
      .catch((error) => console.log('error', error));
  };
  const MyModal = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label htmlFor="inputPassword5">Channel Type</Form.Label>

            <Form.Select
              size="sm"
              onChange={(e) => setChannelType(parseInt(e.target.value))}
              value={channelType}
            >
              <option>Select channel type</option>
              <option value="1">User</option>
              <option value="2">Professional</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="inputPassword5" size="sm">
              Channel Name
            </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setChannelName(e.target.value)}
              value={channelName}
            />
            <Form.Text id="passwordHelpBlock" muted>
              Channel name must be atleat one character
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="inputPassword5">Members</Form.Label>

            <Form.Select
              size="sm"
              onChange={(e) => setMembers([e.target.value])}
              value={members}
            >
              <option>Select members</option>

              {users.map((user) => (
                <option value={user._id}>{user.email}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              createChat();
              handleClose();
            }}
          >
            Create Channel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const getMessages = (id) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    // 61ffc9350c0ac099bd0ba144

    fetch(
      `http://localhost:3000/api/v1/message/messages-by-chat-id/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setMessages(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log('error', error));
  };
  useEffect(() => {
    getMyChats();
    getUsers();
  }, []);

  return (
    <div style={{ padding: 3 }}>
      {show && <MyModal />}
      <div style={{ marginBottom: 5 }}>
        <Form.Group>
          <Form.Label htmlFor="inputPassword5">Login As : </Form.Label>
          <Form.Select
            size="sm"
            onChange={(e) => {
              getMyChats(e.target.value);
              setToken(e.target.value);
              setMessages([]);
            }}
            value={token}
          >
            {userTokens.map((currentToken) => (
              <option value={currentToken.token}>{currentToken.user}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>
      <div className="container" style={{ marginBottom: 5 }}>
        <Button variant="outline-primary">+ private message</Button>
        <Button variant="outline-dark" onClick={handleShow}>
          + Channel
        </Button>
      </div>
      <div className="container">
        <div style={{ flexGrow: 1 }}>
          {chats.map((chat) => (
            <div
              style={{ marginBottom: 4, cursor: 'pointer' }}
              onClick={() => getMessages(chat._id)}
            >
              {chat.channel_name}
            </div>
          ))}
        </div>
        <div className="message-body">
          {messages.length
            ? messages.map((message) => (
                <ol>
                  {message.content} --
                  <strong> {message.author.email.split('.')[0]}</strong>
                </ol>
              ))
            : 'No messages'}
        </div>
      </div>
    </div>
  );
}
