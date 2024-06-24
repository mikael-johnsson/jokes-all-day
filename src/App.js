import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import LoginForm from "./pages/auth/LoginForm";
import JokeCreateForm from "./pages/jokes/JokeCreateForm";
import JokePage from "./pages/jokes/JokePage";
import JokeFeed from "./pages/jokes/JokeFeed";
import { useCurrentUser } from "./context/CurrentUserContext";

function App() {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  // /feed route is for jokes from followed users. might need to adjust filter to my model field names
  
  return (
    
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <JokeFeed message="No results found"/>} />
              <Route exact path="/feed" render={() => <JokeFeed 
              message="No results found. Adjust search or follow a user"
              filter={`author__followed__owner__profile=${profile_id}&`} />} /> 
              <Route exact path="/login" render={() => <LoginForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/jokes/create" render={() => <JokeCreateForm /> } />
              <Route exact path="/jokes/:id" render={() => <JokePage /> } />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;
