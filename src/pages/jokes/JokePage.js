import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useHistory, useLocation, useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Joke from "./Joke";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Alert } from "react-bootstrap";
import AlertStyles from '../../styles/Alert.module.css'

function JokePage() {
  const {id} = useParams();
  const [joke, setJoke] = useState({results: []})
  const currentUser = useCurrentUser();
  const [userProfile, setUserProfile] = useState({})
  const is_staff = userProfile.is_staff
  const history = useHistory();
  const [alertMessage, setAlertMessage] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const handleMount = async () => {
        try{
            const [{data: joke}, {data: fetchedProfile}] = await Promise.all([
                axiosReq.get(`/jokes/${id}`),
                axiosReq.get(`/profiles/${currentUser?.profile_id}`)
            ])
            setJoke({results: [joke]})
            setUserProfile(fetchedProfile)
        } catch(err){
            console.log(err)
            if (err?.response.status === 404){
              history.push('/pagenotfound')
            }
        }
    } 
    handleMount();
  }, [id, setJoke])

    // useEffect for displaying alert message
  useEffect(() => {
    if (location?.state && location?.state?.message) {
      setAlertMessage(location?.state?.message);
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 5000);
      console.log("nu är vi i alertMessage useEffect")
      return () => clearTimeout(timer);
    }
    console.log("if statement ville inte")
  }, [location]);

  return ( 
  <>
    {alertMessage && (<Alert className={AlertStyles.alert}>{alertMessage}</Alert>)}
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Joke {...joke.results[0]} setJokes={setJoke} jokePage is_staff={is_staff} />
      </Col>
    </Row>
  </>
  );
}

export default JokePage;