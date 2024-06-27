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
import JokeEditForm from "./pages/jokes/JokeEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ReportPage from "./pages/admin/ReportPage";
import ReportCreateForm from "./pages/admin/ReportCreateForm";
import ReportEditForm from "./pages/admin/ReportEditForm";
import Report from "./pages/admin/Report";

function App() {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  
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
              <Route exact path="/jokes/:id/edit" render={() => <JokeEditForm /> } />
              <Route exact path="/jokes/:id" render={() => <JokePage /> } />
              <Route exact path="/profiles/:id" render={() => <ProfilePage /> } />
              <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />}/>
              <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />}/>
              <Route exact path="/report/:id" render={() => <Report />}/>
              <Route exact path="/report" render={() => <ReportPage />}/>
              <Route exact path="/report/create/:id" render={() => <ReportCreateForm />}/>
              <Route exact path="/report/edit/:id" render={() => <ReportEditForm />}/>
              <Route exact path="/pagenotfound" render={() => <><h2>page not found</h2><p>sorry, something went wrong!</p></>} />
              <Route render={() => <><h2>page not found</h2><p>sorry, something went wrong!</p></>} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;
