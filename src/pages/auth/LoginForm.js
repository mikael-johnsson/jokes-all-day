import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import { useSetCurrentUser } from "../../context/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";

function LoginForm() {
    const setCurrentUser = useSetCurrentUser()
    useRedirect('loggedIn')

    const [loginData, setLoginData] = useState({
        username:"",
        password:"",
    })

    const {username, password} = loginData
    const history = useHistory()
    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data} = await axios.post('/dj-rest-auth/login/', loginData)
            setCurrentUser(data.user)
            history.goBack()
        } catch(err){
            setErrors(err?.response.data)
        }
    }

  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2">
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>login</h1>

          <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label className="d-none">username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="username" 
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors.username?.map((message, idx) => 
                    <Alert variant="warning" key={idx}>{message}</Alert>
                )}

                <Form.Group controlId="password">
                    <Form.Label className="d-none">password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="password" 
                        name="password" 
                        value={password}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors.password?.map((message, idx) => 
                    <Alert variant="warning" key={idx}>{message}</Alert>
                )}
                <Button className={`${btnStyles.Button}`} type="submit">
                    sign in
                </Button>
                {errors.non_field_errors?.map((message, idx) => 
                    <Alert variant="warning" key={idx}>{message}</Alert>
                )}
            </Form>

        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            don't have an account? <span>sign up now!</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
}

export default LoginForm;