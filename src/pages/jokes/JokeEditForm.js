import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/JokeCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Alert, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom/cjs/react-router-dom";

function JokeEditForm() {
    
  const [errors, setErrors] = useState({});
  const [jokeData, setJokeData] = useState({
    title: "",
    content: ""
  })
  const {title, content} = jokeData;
  const history = useHistory()
  const {id} = useParams()

  useEffect(() => {
    const handleMount = async () => {
        try{
            const {data} = await axiosRes.get(`/jokes/${id}`)
            const {title, content, is_owner} = data

            is_owner ? setJokeData({title, content}) : history.push('/')
        } catch(err){
            console.log(err)
        }
    }
    handleMount();
  }, [id, history])

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append('title', title)
    formData.append('content', content)
    try{
        await axiosReq.put(`/jokes/${id}`, formData)
        history.push(`/jokes/${id}`)
    } catch(err){
        console.log(err)
        if (err.response?.status !== 401){
            setErrors(err.response?.data)
        }
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
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>{message}</Alert>
      ))}
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
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>{message}</Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
      {errors?.no_field_error?.map((message, idx) => (
        <Alert variant="warning" key={idx}>{message}</Alert>
      ))}
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
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

export default JokeEditForm;