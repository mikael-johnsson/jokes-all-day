import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import styles from "../../styles/JokeFeed.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Joke from "./Joke";
import SadFace from '../../assets/sad_face.png'
import { Image } from "react-bootstrap";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../context/CurrentUserContext";
import AlertStyles from '../../styles/Alert.module.css'
import { Alert } from "react-bootstrap";


function JokeFeed({message, filter = ""}) {
    const [jokes, setJokes] = useState({ results: [] })
    // useLocation returns an object with info about the url. 
    // we need this to know if user us in Home or Feed
    const {pathname, state} = useLocation();
    const [query, setQuery] = useState("")
    const currentUser = useCurrentUser();
    const [alertMessage, setAlertMessage] = useState(null)

    useEffect(() => {
        const fetchJokes = async () => {
            try{
                const {data} = await axiosReq.get(`/jokes/?${filter}search=${query}`)
                setJokes(data)
            } catch(err){
                console.log(err)
            }
        }
        fetchJokes()
    }, [filter, pathname, query, currentUser])

    //useEffect for displaying alertmessage
    useEffect(() => {
        if (state && state?.message) {
          setAlertMessage(state?.message);
          const timer = setTimeout(() => {
            setAlertMessage(null);
          }, 5000);
          return () => clearTimeout(timer);
        }
      }, [state, pathname]);
  
  return (<>
    {alertMessage && (<Alert className={AlertStyles.alert}>{alertMessage}</Alert>)}
    <Row className="h-100 justify-content-center">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
      <Form 
        className={styles.SearchBar} 
        onSubmit={(event) => event.preventDefault()}>
            <Form.Control 
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="text"
                className="mr-sm-2"
                placeholder="search jokes" 
            />
      </Form>
        {jokes.results.length ? (
            <InfiniteScroll 
            children={jokes.results.map(joke => (
                    <Joke key={joke.id} {...joke} setJokes={setJokes}/>
                ))
            } 
            dataLength={jokes.results.length}
            loader={<h4>Loading...</h4>}
            hasMore={!!jokes.next}
            next={() => fetchMoreData(jokes, setJokes)}
            />
        ) : (
            <Container className={`${appStyles.Content} text-center`}>
                <Image className={styles.SadFace} src={SadFace} />
                <p>{message}</p>
            </Container>
        )}
      </Col>
    </Row>
    </>
  );
}

export default JokeFeed;