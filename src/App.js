import React, { useEffect, useState } from 'react';
import './global.css';
import { Button, Modal, Form } from 'react-bootstrap';
export default function App() {
  const [chats, setChats] = useState([]);
  const [show, setShow] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelType, setChannelType] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [messages, setMessages] = useState([]);
  const getMyChats = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjIwNzY2ZjdhOWE0MTgyNTEzZjJiMGNiIiwiaWF0IjoxNjQ0NjUzNjg3fQ.IEBgh0VLQZG1aoThRyjPCHe98G5Ebxb7mT-ioQe8LEU'
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
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
  }, []);

  return (
    <div style={{ padding: 3 }}>
      {show && <MyModal />}
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
