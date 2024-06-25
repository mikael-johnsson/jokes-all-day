import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Joke from "./Joke";

function JokePage() {
  const {id} = useParams();
  const [joke, setJoke] = useState({results: []})

  useEffect(() => {
    const handleMount = async () => {
        try{
            const [{data: joke}] = await Promise.all([
                axiosReq.get(`/jokes/${id}`)
            ])
            setJoke({results: [joke]})
        } catch(err){
            console.log(err)
        }
    } 
    handleMount();
  }, [id])


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Joke {...joke.results[0]} setJokes={setJoke} jokePage />
      </Col>
    </Row>
  );
}

export default JokePage;