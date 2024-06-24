import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import LoginForm from "./pages/auth/LoginForm";
import JokeCreateForm from "./pages/jokes/JokeCreateForm";
import PostPage from "./pages/jokes/JokePage";

function App() {
  
  return (
    
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <h1>Home page</h1>} />
              <Route exact path="/login" render={() => <LoginForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/jokes/create" render={() => <JokeCreateForm /> } />
              <Route exact path="/jokes/:id" render={() => <PostPage /> } />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;
