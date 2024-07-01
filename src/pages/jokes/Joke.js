import React, { useEffect, useState } from 'react'
import styles from '../../styles/Joke.module.css'
import { useCurrentUser } from '../../context/CurrentUserContext';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { MoreDropdown } from '../../components/MoreDropdown';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import { Rating } from 'react-simple-star-rating';
import { Alert } from "react-bootstrap";
import AlertStyles from '../../styles/Alert.module.css'


const Joke = (props) => {
    const {
        id,
        profile_id,
        author,
        content,
        title,
        average_rating,
        rating_count,
        rating_id,
        created_at,
        jokePage,
        is_staff,
        setJokes,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === author
    const [alertMessage, setAlertMessage] = useState(null)
    const [message, setMessage] = useState(null)

    const history = useHistory();

    //useEffect to display alertmessage
    useEffect(() => {
        if (message) {
          setAlertMessage(message);
          const timer = setTimeout(() => {
            setAlertMessage(null);
          }, 3500);
          return () => clearTimeout(timer);
        }
      }, [message]);

    const createRating = async (rate) => {
        const dividedRating = (rate / 20)
        try {
            const {data} = await axiosRes.post('/ratings/', {joke: id, rating: dividedRating});
            setJokes((prevJokes) => ({
                ...prevJokes,
                results: prevJokes.results.map((joke) => {
                    return joke.id === id ?
                    {...joke, rating_count: joke.rating_count + 1, rating_id: data.id} :
                    joke;
                })
            }))
            setMessage("rating created")
        } catch(err){
            console.log(err)
        }
    }

    const editRating = async (rate) => {
        const dividedRating = (rate / 20)
        try{
            await axiosRes.put(`/ratings/${rating_id}`, {joke: id, rating: dividedRating});
            setMessage("rating updated")
        } catch(err){
            console.log(err)
        }
    }

    const deleteRating = async (event) => {
        event.preventDefault()
        try{
            await axiosRes.delete(`/ratings/${rating_id}`)
            setJokes((prevJokes) => ({
                ...prevJokes,
                results: prevJokes.results.map((joke) => {
                    return joke.id === id ?
                    {...joke, rating_count: joke.rating_count - 1, rating_id: null} :
                    joke;
                })
            }))
            setMessage("rating deleted")
        } catch(err){
            console.log(err)
        }
    }

    const handleEdit = () => {
        history.push(`/jokes/${id}/edit`)
    }

    const handleDelete = async (event) => {
        event.preventDefault()
        try{
            await axiosRes.delete(`/jokes/${id}`)
            history.push('/', {message: 'Your joke was deleted'})
        } catch(err){
            console.log(err)
        }
    }

  return <Card className={styles.Joke}>
            <Card.Body>
                <div className='d-flex align-items-center justify-content-between'>
                    <Link to={`/profiles/${profile_id}`}>
                        <h5>by: {author}</h5>
                    </Link> 
                    <div className='d-flex align-items-center' style={{gap:12}}>
                        <span>{created_at}</span>
                        {(is_owner || is_staff) && jokePage && <MoreDropdown handleDelete={handleDelete} handleEdit={handleEdit}/>}
                    </div>
                </div>
                {title && 
                    <Link to={`/jokes/${id}`}>
                        <Card.Title className='text-center'>{title}</Card.Title>
                    </Link>}
                {content && <Card.Text>{content}</Card.Text>}
                <div>
                    { !currentUser ? (
                        <Rating 
                        allowHalfIcon={true}
                        initialValue={average_rating}
                        readonly={true}
                />
                    ) :  is_owner ? (
                        <>
                            <Rating 
                                    allowHalfIcon={true}
                                    initialValue={average_rating}
                                    readonly={true}
                            />
                        </>
                    ) : rating_id ? (
                        <>
                            <Rating 
                                    allowHalfIcon={true}
                                    initialValue={average_rating}
                                    onClick={editRating}
                            />
                        </>
                    ) : rating_count !== 0 ? (
                        <>
                            <Rating 
                                allowHalfIcon={true}
                                onClick={createRating}
                                initialValue={average_rating}
                            />
                        </>
                    ) : (
                        <> 
                            <Rating 
                                allowHalfIcon={true}
                                onClick={createRating} 
                                initialValue={average_rating}
                            />
                        </>
                    )}
                </div>
                {currentUser && !is_owner && (
                    <Link to={`/report/create/${id}`}>
                    <OverlayTrigger
                        placement='top'
                        overlay={<Tooltip>report this joke</Tooltip>}
                    >
                        <i className="fa-regular fa-face-angry" />
                    </OverlayTrigger>
                </Link>
                )}
                {currentUser && !is_owner && rating_id && (
                    <OverlayTrigger
                        placement='top'
                        overlay={<Tooltip>clear your rating</Tooltip>}>
                            <i 
                        onClick={deleteRating}
                        className="fa-solid fa-eraser" />
                    </OverlayTrigger>
                )}
                {alertMessage && (<Alert className={`${AlertStyles.alert} ${AlertStyles.alertSmall}`}>{alertMessage}</Alert>)}
            </Card.Body>
        </Card>
}

export default Joke


