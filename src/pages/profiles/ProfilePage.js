import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";


import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useCurrentUser } from "../../context/CurrentUserContext"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../context/ProfileDataContext";
import { Button } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Joke from "../jokes/Joke";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const {id} = useParams()
  const {setProfileData, handleFollow} = useSetProfileData()
  const {pageProfile} = useProfileData();
  const [profile] = pageProfile.results
  const is_owner = currentUser?.username === profile?.owner
  const [profileJokes, setProfileJokes] = useState({results: []});
  

  useEffect(() => {
    const fetchData = async () => {
        try{
            const [{data: pageProfile}, {data: profileJokes}] = await Promise.all([
                axiosReq.get(`/profiles/${id}`),
                axiosReq.get(`/jokes/?author__profile=${id}`)
            ])
            setProfileData(prevState => ({
                ...prevState,
                pageProfile: {results: [pageProfile]}
            }))
            setProfileJokes(profileJokes)
            setHasLoaded(true);
        } catch(err){
            console.log(err)
        }
    }
    fetchData()
  }, [id, setProfileData])

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col className="my-2">
                <div>{profile?.jokes_count}</div>
                <div>jokes</div>
            </Col>
            <Col className="my-2">
                <div>{profile?.followers_count}</div>
                <div>followers</div>
            </Col>
            <Col className="my-2">
                <div>{profile?.following_count}</div>
                <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
        {currentUser && !is_owner && (
            profile?.following_id ? (
            <Button onClick={() => {}} className={`${btnStyles.Button}`}>unfollow</Button>
            )
            : (
            <Button onClick={() => handleFollow(profile)} className={`${btnStyles.Button}`}>follow</Button>
            )
        )}
        </Col>
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s posts</p>
      <hr />
      {profileJokes?.results.length ? (
        <InfiniteScroll 
            children={
                profileJokes.results.map((joke) => (
                    <Joke key={joke.id} {...joke}/>
                ))
            }
            dataLength={profileJokes.results.length}
            hasMore={!!profileJokes.next}
            next={() => fetchMoreData(profileJokes, setProfileJokes)} 
        />
      ) : (<h4>No jokes found...</h4>)}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
                <h4>Loading...</h4>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
      </Col>
    </Row>
  );
}

export default ProfilePage;