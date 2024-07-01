import React, { useEffect, useState } from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';

const ReportEditForm = () => {
    const [reportData, setReportData] = useState({
        content: "",
        reason: "",
        joke: "",
        joke_title: "",
    });
    const {content, reason, joke, joke_title} = reportData;

    const [reportJoke, setReportJoke] = useState({
        author:""
    })
    const {author} = reportJoke;

    const [errors, setErrors] = useState({})

    //get id of report from URL
    const {id} = useParams();
    const history = useHistory();

    useEffect(() => {
        const handleMount = async () => {
            try{
                const {data: report} = await axiosRes.get(`/report/${id}`)
                const {joke} = report;
                const {data: fetchedJoke} = await axiosRes.get(`/jokes/${joke}`)
                setReportData(report)
                setReportJoke(fetchedJoke)
            } catch(err){
                console.log(err)
            }
        } 
        handleMount()
    }, [id])

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
        formData.append('joke', joke)
        try{
            await axiosReq.put(`/report/${id}`, formData)
            history.push(`/report`, {message: 'the report was updated'})
        } catch(err){
            console.log(err)
            if (err.response?.status !== 401){
                setErrors(err.response?.data)
            }
        }
      }


    
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
            <Button type="submit">save report</Button>
            {errors?.no_field_error?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
            ))}
            <span>This report is regarding the joke: <strong>{joke_title}</strong> by <strong>{author}</strong></span>
        </Container>
    </Form>
  )
}

export default ReportEditForm