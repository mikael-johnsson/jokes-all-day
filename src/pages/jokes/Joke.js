import React, { useState } from 'react'
import styles from '../../styles/Joke.module.css'
import { useCurrentUser } from '../../context/CurrentUserContext';
import { Button, Card, Form, Media } from 'react-bootstrap';
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

    const handleRating = async (rate) => {
        const dividedRating = (rate / 20)
        console.log("då går vi in i try")
        console.log(dividedRating)
        try {
            console.log("nu är vi inne i try")
            const {data} = await axiosRes.post('/ratings/', {joke: id, rating: dividedRating});
            setJokes((prevJokes) => ({
                ...prevJokes,
                results: prevJokes.results.map((joke) => {
                    return joke.id === id ?
                    {...joke, rating_count: joke.rating_count + 1, rating_id: data.id} : //this row needs average rating to display the new average rating
                    joke;
                })
            }))
            console.log("nu är vi klara med try")
        } catch(err){
            console.log(err)
        }
    }

    const handleRatingDelete = async (event) => {
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
                {title && <Link to={`jokes/${id}`}><Card.Title className='text-center'>{title}</Card.Title></Link>}
                {content && <Card.Text>{content}</Card.Text>}
                <div>
                    {is_owner ? (
                        <>
                            <Rating 
                                    initialValue={average_rating}
                                    readonly={true}
                            />
                        </>
                    ) : rating_id ? (
                        <>
                            <Rating 
                                    initialValue={average_rating}
                                    readonly={true}
                            />
                            <Button onClick={handleRatingDelete}>Reset rating</Button>
                        </>
                    ) : rating_count !== 0 ? (
                        <>
                            <Rating 
                                onClick={handleRating}
                                initialValue={average_rating}
                            />
                        </>
                    ) : (
                        <>
                            <Rating 
                                onClick={handleRating} 
                                initialValue={average_rating}
                            />
                        </>
                    )}
                </div>
            </Card.Body>
        </Card>
}

export default Joke


