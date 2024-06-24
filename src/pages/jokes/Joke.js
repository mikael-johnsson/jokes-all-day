import React from 'react'
import styles from '../../styles/Joke.module.css'
import { useCurrentUser } from '../../context/CurrentUserContext';
import { Card, Media } from 'react-bootstrap';
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
        is_owner,
        title,
        average_rating,
        rating_count,
        rating_id,
        created_at,
        jokePage
    } = props;

    // const currentUser = useCurrentUser();
    // const is_owner = currentUser?.username === author
    // why is is_owner returning true?

    const history = useHistory();

    const handleEdit = () => {
        history.push(`/jokes/${id}/edit`)
    }

    const handleDelete = async () => {
        try{
            await axiosRes.delete(`/jokes/${id}`)
            history.goBack();
        } catch(err){
            console.log(err)
        }
    }

    //change Link to {`/profiles/${profile_id}`}
  return <Card className={styles.Joke}>
            <Card.Body>
                <Media className='align-items-center justify-content-between'>
                    <Link to={`/profiles`}>
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
                    ): <span> You have not rated this joke. This jokes average rating: {average_rating} from {rating_count} ratings</span>}
                </div>

            </Card.Body>
        </Card>
}

export default Joke