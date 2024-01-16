import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import moment from "moment"
import Modal from 'react-bootstrap/Modal';

const Home = () => {

    const [data, setData] = useState([]);

    const [show, setShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(false);

    const getUserData = async () => {
        const res = await axios.get("/getdata", {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.data.status == 201) {
            console.log("data get");
            setData(res.data.data)

        } else {
            console.log("error")
        }
    }


    const dltUser = async (id) => {
        console.log(id)
        const res = await axios.delete(`/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.data.status == 201) {
            getUserData()
            setShow(true)
        } else {
            console.log("error")
        }
    }
    const handleCardClick = (user) => {
        setSelectedUser(user);
        setShow(true);
      };

    const handleAuthorize = (e) => {
        e.preventDefault();
        // Implement your authorization logic here
        setIsAuthorized(true);
      };

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <>
            
            <div className="container mt-2">
                <h1 className='text-center mt-2'>Employee Data</h1>

                <div className='text-end'>
                    <Button variant="primary"><NavLink to="/register" className="text-decoration-none text-light"> Add User</NavLink></Button>
                    <Button variant="success"><NavLink to="/tokenGen" className="text-decoration-none text-light"> Generate Token</NavLink></Button>
                </div>

                <div className='d-flex justify-content-between align-iteams-center mt-5'>
                    {
                        data.length > 0 ? data.map((el, i) => {
                            return (
                                <>
                                    <Card style={{ width: '22rem', height: "18rem" }} className="mb-3" onClick={() => handleCardClick(el)}>
                                        <Card.Img variant="top" src={`/uploads/${el.userimg}`} style={{ width: '100px', textAlign: "center", margin: "auto" }} className="mt-2" />
                                        <Card.Body className='text-center'>
                                            <Card.Title>UserName : {el.username}</Card.Title>
                                            <Card.Text>
                                                Date Added : {moment(el.date).format("DD-MM-YYYY")}
                                            </Card.Text>
                                            <Button variant="danger"  className='col-lg-6 text-center'> Authorize user</Button>
                                        </Card.Body>
                                    </Card>
                                </>
                            )
                        }) : ""
                    }

                </div>
            </div>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
          <Modal.Title>User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              <p>Username: {selectedUser.username}</p>
              <p>Joining Date: {moment(selectedUser.joiningDate).format('DD-MM-YYYY')}</p>
              <p>Adhar Card: {selectedUser.adharCard}</p>
              <p>Birthdate: {moment(selectedUser.birthdate).format('DD-MM-YYYY')}</p>
              {!isAuthorized && (
                <div>
                  <input type="checkbox" id="authorizeCheckbox" onChange={handleAuthorize} />
                  <label htmlFor="authorizeCheckbox"> Authorize User</label>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default Home