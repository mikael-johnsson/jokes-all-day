import React, { useEffect, useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';
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
        setReports,
        } = props;
    
    const [reportJoke, setReportJoke] = useState({})
    const [userProfile, setUserProfile] = useState({})
    const history = useHistory();
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === author
    const is_staff = userProfile.is_staff

    const handleHandled = async (event) => {
        const formData = new FormData();
        formData.append('reason', reason)
        formData.append('content', content)
        formData.append('joke', joke)
        formData.append('handled', event.target.checked)
        try{
            await axiosReq.put(`/report/${id}/`, formData)
            setReports((prevReport) => ({
                ...prevReport,
                [event.target.name]: event.target.checked
            }))
            history.go(0)
        }
        catch(err){
            console.log(err)
        }
      }

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

    useEffect(() => {
        const fetchJoke = async () => {
            try{
                const [{data: fetchedJoke}, {data: fetchedProfile}] = await Promise.all([
                    axiosRes.get(`/jokes/${joke}`),
                    axiosRes.get(`/profiles/${currentUser.profile_id}`)
                ])
                setUserProfile(fetchedProfile)
                setReportJoke(fetchedJoke)
            } catch(err){
                console.log(err)
                if (err?.response.status === 404){
                    history.push('/pagenotfound')
                }
            }
        }
        fetchJoke();
    }, [joke, handled, currentUser, history])
    
    

    return (
    <Card>
        <Card.Body className='align-items-center justify-content-between'>
            {(is_owner || is_staff) && (
                <span className='d-flex align-items-center'>
                    <MoreDropdown handleDelete={handleDelete} handleEdit={handleEdit}/>
                </span>
            )}
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
        {is_staff ? (
            <Form>
                <Form.Check 
                    type="checkbox" 
                    label="handled"
                    name="handled" 
                    checked={handled}
                    onChange={handleHandled}
                />
            </Form>
        ) : (<Form>
                <Form.Check 
                    disabled
                    type="checkbox" 
                    label="handled" 
                    checked={handled}
                />
            </Form>)}
        </Card.Body>
    </Card>
  )
}

export default Report