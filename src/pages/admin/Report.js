import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Media } from 'react-bootstrap'
import { axiosRes } from '../../api/axiosDefaults';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import btnStyles from '../../styles/Button.module.css'

const Report = (props) => {
    const {
        id,
        author, 
        content,
        reason,
        created_at,
        joke, 
        joke_title,
        handled,
        setReport,
        } = props;
    
    const [reportJoke, setReportJoke] = useState({})

    useEffect(() => {
        const fetchJoke = async () => {
            try{
                const {data} = await axiosRes.get(`/jokes/${joke}`)
                setReportJoke(data)
            } catch(err){
                console.log(err)
            }
        }
        fetchJoke();
    }, [])

    const handleDelete = async (event) => {
        event.preventDefault()
        try{
            await axiosRes.delete(`/report/${id}`)
        } catch(err){
            console.log(err)
        }
    }
    

  return (
    <Card>
        <Card.Body>
            <Media>
                <p>Report written by: {author}</p>
                <p>Created at: {created_at}</p>
            </Media>
        </Card.Body>
        <Card.Body>
            <Media>
                <p>Reason of report: {reason}</p>
                <p>report message:</p> 
                <br/>
                <p>{content}</p>
            </Media>
        </Card.Body>
        <Card.Body>
            <Media>
                <p>title of joke: {joke_title} </p>
                <p>content of joke: {reportJoke.content}</p>
                <p>author of joke: {reportJoke.author}</p>
            </Media>
        </Card.Body>
        <Form>
            <Form.Check 
                disabled
                type="checkbox" 
                label="handled" 
                value={handled}
            />
        </Form>
        <Link to={`/report/edit/${id}`}>
            <Button className={`${btnStyles.Button}`}>edit report</Button>
        </Link>
        
        <Button 
            className={`${btnStyles.Button} ${btnStyles.Delete}`} 
            onClick={handleDelete}>
            delete report
        </Button>
        
        
    </Card>
  )
}

export default Report