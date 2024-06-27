import React from 'react'
import styles from '../../styles/Joke.module.css'
import { useCurrentUser } from '../../context/CurrentUserContext';
import { Button, Card, Form, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { MoreDropdown } from '../../components/MoreDropdown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import { Rating } from 'react-simple-star-rating';


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
        setJokes,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === author
    const history = useHistory();

    const createRating = async (rate) => {
        const dividedRating = (rate / 20)
        try {
            const {data} = await axiosRes.post('/ratings/', {joke: id, rating: dividedRating});
            setJokes((prevJokes) => ({
                ...prevJokes,
                results: prevJokes.results.map((joke) => {
                    return joke.id === id ?
                    {...joke, rating_count: joke.rating_count + 1, rating_id: data.id} : //this row needs average rating to display the new average rating to stars
                    joke;
                })
            }))
        } catch(err){
            console.log(err)
        }
    }

    const editRating = async (rate) => {
        const dividedRating = (rate / 20)
        try{
            await axiosRes.put(`/ratings/${rating_id}`, {joke: id, rating: dividedRating});
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
            history.goBack();
        } catch(err){
            console.log(err)
        }
    }

  return <Card className={styles.Joke}>
            <Card.Body>
                <Media className='align-items-center justify-content-between'>
                    <Link to={`/profiles/${profile_id}`}>
                        <p>{author}</p>
                    </Link> 
                    <div className='d-flex align-items-center'>
                        <span>{created_at}</span>
                        {is_owner && jokePage && <MoreDropdown handleDelete={handleDelete} handleEdit={handleEdit}/>}
                    </div>
                </Media>
            </Card.Body>
            <Card.Body>
                {title && <Link to={`/jokes/${id}`}><Card.Title className='text-center'>{title}</Card.Title></Link>}
                {content && <Card.Text>{content}</Card.Text>}
                <div>
                    {is_owner ? (
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
                            <OverlayTrigger
                                placement='top'
                                overlay={<Tooltip>clear your rating</Tooltip>}>
                                    <i 
                                onClick={deleteRating}
                                className="fa-solid fa-eraser" />
                            </OverlayTrigger>
                            
                            
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
                <Link to={`/report/create/${id}`}>
                    <OverlayTrigger
                        placement='top'
                        overlay={<Tooltip>report this joke</Tooltip>}
                    >
                        <i className="fa-regular fa-face-angry" />
                    </OverlayTrigger>
                </Link>
            </Card.Body>
        </Card>
}

export default Joke


