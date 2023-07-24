import React, { useEffect, useState } from "react";
import "./css/style.css";
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  Input,
  Button,
  Navbar,
} from "reactstrap";
function App() {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFormData(initialState);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    fetch("http://localhost:5000/api/user/user-list")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setUsers(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <div>
      <Row>
        <div className="d-flex justify-content-around mb-4 mt-2 immence_header">
          <Col sm="1" classnName="col-sm-auto offset-sm-1">
            <h1 className="text-primary">immence</h1>
          </Col>
        </div>
      </Row>
      <Row>
        <div className="d-flex justify-content-around">
          <Col
            sm="4"
            className="col-sm-auto offset-sm-2 "
            style={{
              borderRight: "2px solid #aaaaaa",
            }}
          >
            <Card
              style={{
                width: "25rem",
                border: "none",
              }}
            >
              <CardTitle tag="h4" className="my-5">
                Create User
              </CardTitle>
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="text-primary" htmlFor="firstName">
                    First Name:
                  </label>
                  <Input
                    className="mb-2"
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="text-primary" htmlFor="lastName">
                    Last Name:
                  </label>
                  <Input
                    className="mb-2"
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="text-primary" htmlFor="email">
                    Email:
                  </label>
                  <Input
                    className="mb-2"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="text-primary " htmlFor="phoneNumber">
                    Phone Number:
                  </label>
                  <Input
                    className="mb-2"
                    type="phoneNumber"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="text-center mt-3">
                  <Button
                    type="submit"
                    color="primary"
                    style={{
                      width: "100%",
                    }}
                  >
                    Create
                  </Button>
                </div>
              </form>
            </Card>
          </Col>
          <Col sm="4" className="col-sm-3 col-md-5 offset-md my-5">
            <Card
              style={{
                width: "25rem",
                border: "none",
              }}
            >
              <CardTitle tag="h5">Users</CardTitle>
              {users.length > 0 ? (
                <ul>
                  {users.map((user) => (
                    <h6 className="user_list" key={user.id}>
                      <span className="user_logo">
                        {user.firstName[0].toUpperCase()}
                      </span>{" "}
                      {user.firstName} {user.lastName}
                    </h6>
                  ))}
                </ul>
              ) : (
                <h3>No User Found</h3>
              )}
            </Card>
          </Col>
        </div>
      </Row>
    </div>
  );
}

export default App;
