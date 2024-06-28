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
                if (err?.response.status === 404){
                    history.push('/pagenotfound')
                }
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
        <Card.Body className='align-items-center justify-content-between'>
                <span className='d-flex align-items-center'>
                    <MoreDropdown handleDelete={handleDelete} handleEdit={handleEdit}/>
                </span>
                <p>reported by: {author}</p>
                <p>created: {created_at}</p>
                <p>reason: {reason}</p>
                <p>message: {content}</p> 
                <div>
                    <hr/>
                    <p>title of joke: <Link to={`/jokes/${reportJoke.id}`}>{joke_title}</Link> </p>
                    <p>joke: {reportJoke.content}</p>
                    <p>author: {reportJoke.author}</p>
                    </div>
        </Card.Body>
        <Card.Body>
        <Form>
            <Form.Check 
                disabled
                type="checkbox" 
                label="handled" 
                value={handled}
            />
        </Form>
        </Card.Body>
    </Card>
  )
}

export default Report