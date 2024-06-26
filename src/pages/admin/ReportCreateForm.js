import React, { useEffect, useState } from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';

const ReportCreateForm = () => {
    const [reportData, setReportData] = useState({
        content: "",
        reason: "",
        joke:""
    });
    const {content, reason} = reportData;

    const [joke, setJoke] = useState({
        title: "",
        author:""
    })
    const {title, author} = joke;

    const [errors, setErrors] = useState({})

    //get id of joke from URL
    const {id} = useParams();
    const history = useHistory();

    const handleChange = (event) => {
        try{
            setReportData({
                ...reportData,
                [event.target.name]: event.target.value
            })
        } catch(err){
            console.log(err)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('reason', reason)
        formData.append('content', content)
        formData.append('joke', id)
        console.log(formData)
        try{
            const {data} = await axiosReq.post('/report/', formData)
            history.goBack();
        } catch(err){
            console.log(err)
            if (err.response?.status !== 401){
                setErrors(err.response?.data)
            }
        }
      }

    useEffect(() => {
        const handleMount = async () => {
            try{
                const {data} = await axiosRes.get(`/jokes/${id}`)
                setJoke(data)
            } catch(err){
                console.log(err)
            }
        } 
        handleMount()
    }, [id])
    
    
  return (
    <Form onSubmit={handleSubmit}>
        <Container>
            {/*form for report content*/}
            <Form.Group controlId='content'> 
                <Form.Label>report</Form.Label>
                <Form.Control 
                    as="textarea"
                    name="content"
                    placeholder='add report message'
                    value={content}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
            ))}
            <Form.Group controlId='reason'> 
                <Form.Label>reason</Form.Label>
                <Form.Control 
                    as="select"
                    name="reason"
                    value={reason}
                    onChange={handleChange}
                >
                    <option value="choose_an_option">Choose an option</option>
                    <option value="racism">racism</option>
                    <option value="sexism">sexism</option>
                    <option value="inappropriate">inappropriate</option>
                    <option value="personal_attack">personal attack</option>
                </Form.Control>
            </Form.Group>
            {errors?.reason?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
            ))}
            <Button type="submit">submit report</Button>
            {errors?.no_field_error?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
            ))}
            <span>This report is regarding the joke: <strong>{title}</strong> by <strong>{author}</strong></span>
        </Container>
    </Form>
  )
}

export default ReportCreateForm