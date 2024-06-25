import React, {useState} from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
    useRedirect('loggedIn')
    //set signupdata props
    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: ""
    })

    //deconstruct props so that dot notation is not needed
    const {username, password1, password2} = signUpData

    //useHistory gives access to history instance in React
    const history = useHistory()

    //set errors props
    const [errors, setErrors] = useState({})

    //updates value of signupdata on change
    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value
        })
    }

    //sends signupdata to database
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/registration/', signUpData)
            history.push('/login')
        } catch (err){
            setErrors(err.response?.data)
        }
    }

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2">
        <Container className={`${appStyles.Content} p-4 `}>
            <h1 className={styles.Header}>sign up</h1>
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

                <Form.Group controlId="password1">
                    <Form.Label className="d-none">password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="password" 
                        name="password1" 
                        value={password1}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors.password1?.map((message, idx) => 
                    <Alert variant="warning" key={idx}>{message}</Alert>
                )}

                <Form.Group controlId="password2">
                    <Form.Label className="d-none">repeat password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="repeat password" 
                        name="password2"
                        value={password2}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors.password2?.map((message, idx) => 
                    <Alert variant="warning" key={idx}>{message}</Alert>
                )}

                <Button className={`${btnStyles.Button}`} type="submit">
                    sign up
                </Button>
                {errors.non_field_errors?.map((message, idx) => 
                    <Alert variant="warning" key={idx}>{message}</Alert>
                )}
            </Form>

        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/login">
            already have an account? <span>login</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUpForm;