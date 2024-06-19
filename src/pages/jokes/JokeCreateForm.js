import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/JokeCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

function JokeCreateForm() {
    
  const [errors, setErrors] = useState({});
  const [jokeData, setJokeData] = useState({
    title: "",
    content: ""
  })
  const {title, content} = jokeData;

  const handleChange = (event) => {
    try{
        setJokeData({
            ...jokeData,
            [event.target.name]: event.target.value
        })
    } catch(err){
        console.log(err)
    }
  }


  const textFields = (
    <div className="text-center">
      <FormGroup controlId="title">
        <FormLabel>title</FormLabel>
        <FormControl
            type="text"
            name="title"
            placeholder="title"
            onChange={handleChange}
            value={title}
        />
      </FormGroup>
      <FormGroup controlId="content">
        <FormLabel>joke</FormLabel>
        <FormControl
            as="textarea"
            name="content"
            placeholder="joke"
            rows={6}
            onChange={handleChange}
            value={content}
        />
      </FormGroup>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {}}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default JokeCreateForm;