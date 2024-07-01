import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        //if user is logged in, this code wil run
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        console.log(err);
        console.log(userAuthStatus);
        console.log("we are in catch in useRedirect");
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };
    handleMount();
  }, [history, userAuthStatus]);
};
