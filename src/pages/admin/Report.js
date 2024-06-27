import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Media } from 'react-bootstrap'
import { axiosRes } from '../../api/axiosDefaults';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';
import btnStyles from '../../styles/Button.module.css'
import { MoreDropdown } from '../../components/MoreDropdown';
import { useCurrentUser } from '../../context/CurrentUserContext';

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
    const history = useHistory();
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === author

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
            history.goBack();
        } catch(err){
            console.log(err)
        }
    }

    const handleEdit = () => {
        history.push(`/report/edit/${id}`)
    }
    

  return (
    <Card>
        <Card.Body>
            <Media className='align-items-center justify-content-between'>
                <p>Report written by: {author}</p>
                <div className='d-flex align-items-center'>
                    <span>{created_at}</span>
                    {is_owner  && <MoreDropdown handleDelete={handleDelete} handleEdit={handleEdit}/>}
                </div>
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
    </Card>
  )
}

export default Report