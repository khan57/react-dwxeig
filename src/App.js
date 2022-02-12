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
  const MyModal = () => {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Select aria-label="Default select example">
              <option>Select channel type</option>
              <option value="1">User</option>
              <option value="2">Professional</option>
            </Form.Select>
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
      </>
    );
  };
  useEffect(() => {
    getMyChats();
  }, []);

  return (
    <div style={{ padding: 3 }}>
      <div className="container" style={{ marginBottom: 5 }}>
        <Button variant="outline-primary">+ private message</Button>
        <Button variant="outline-primary" onClick={handleShow}>
          + Channel
        </Button>
      </div>
      <div className="container">
        <div style={{ flexGrow: 1 }}>
          {chats.map((chat) => (
            <div style={{ marginBottom: 4 }}>{chat.channel_name}</div>
          ))}
        </div>
        <div className="message-body">no message</div>
      </div>
      <MyModal />
    </div>
  );
}
