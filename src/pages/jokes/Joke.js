import React from 'react'
import styles from '../../styles/Joke.module.css'
import { useCurrentUser } from '../../context/CurrentUserContext';
import { Card, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Joke = (props) => {
    const {
        id,
        author,
        content,
        is_owner,
        title,
        rating_count,
        rating_id,
        created_at,
        jokePage
    } = props;

    // const currentUser = useCurrentUser();
    // const is_owner = currentUser?.username === author
    // why is is_owner returning true?

    //change Link to {`/profiles/${profile_id}`}
  return <Card className={styles.Joke}>
            <Card.Body>
                <Media className='align-items-center justify-content-between'>
                    <Link to={`/profiles`}>
                        <p>{author}</p>
                    </Link> 
                    <div className='d-flex align-items-center'>
                        <span>{created_at}</span>
                        {is_owner && jokePage && "..."}
                    </div>
                </Media>
            </Card.Body>
            <Card.Body>
                {title && <Card.Title className='text-center'>{title}</Card.Title>}
                {content && <Card.Text>{content}</Card.Text>}
                <div>
                    {is_owner ? (
                        <span>Your rating count: {rating_count}</span>
                    ) : rating_id ? (
                        <span>You have rated this joke. This jokes rating count is: {rating_count}</span>
                    ): <span> You have not rated this joke. This jokes rating count is: {rating_count}</span>}
                </div>

            </Card.Body>
        </Card>
}

export default Joke