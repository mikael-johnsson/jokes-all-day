import React from 'react'
import styles from '../../styles/Joke.module.css'
import { useCurrentUser } from '../../context/CurrentUserContext';
import { Button, Card, Form, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { MoreDropdown } from '../../components/MoreDropdown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';

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

    console.log("set jokes log= ",setJokes)

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === author

    const history = useHistory();

    const handleRating = async () => {
        try {
            const {data} = await axiosRes.post('/ratings/', {joke: id, rating: 5});
            console.log("innan" + data)
            setJokes((prevJokes) => ({
                ...prevJokes,
                results: prevJokes.results.map((joke) => {
                    return joke.id === id ?
                    {...joke, rating_count: joke.rating_count + 1, rating_id: data.id} :
                    joke;
                })
            }))
            console.log("efter" + data)
            console.log("rating created")
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
                        <span>Your average rating: {average_rating} from {rating_count} ratings</span>
                    ) : rating_id ? (
                        <span>You have rated this joke. This jokes average rating: {average_rating} from {rating_count} ratings</span>
                    ): (<Button onClick={handleRating}>Submit</Button>)}
                </div>
            </Card.Body>
        </Card>
}

export default Joke