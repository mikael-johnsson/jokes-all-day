import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/JokeFeed.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Joke from "./Joke";
import NoResults from '../../assets/no-results.png'
import { Image } from "react-bootstrap";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

function JokeFeed({message, filter = ""}) {
    const [jokes, setJokes] = useState({ results: [] })
    // useLocation returns an object with info about the url. 
    // we need this to know if user us in Home or Feed
    const {pathname} = useLocation();
    const [query, setQuery] = useState("")

    useEffect(() => {
        const fetchJokes = async () => {
            try{
                const {data} = await axiosReq.get(`/jokes/?${filter}search=${query}`) //filtering is not working
                setJokes(data)
                console.log(data)
            } catch(err){
                console.log(err)
            }
        }
        fetchJokes()
    }, [filter, pathname, query])
  
  return (
    <Row className="h-100">
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
            jokes.results.map(joke => (
                <Joke key={joke.id} {...joke}/>
            ))
        ) : (
            <Container className={appStyles.Content}>
                <Image src={NoResults} />
                <span>{message}</span>
            </Container>
        )}
      </Col>
    </Row>
  );
}

export default JokeFeed;