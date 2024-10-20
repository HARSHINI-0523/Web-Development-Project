import { userLoginContext } from "./userLoginContext";
import { useState } from "react";

export function UserLoginStore({ children }) {
  //login user state
  let [currentUser, setCurrentUser] = useState(null);
  let [userLoginStatus, setUserLoginStatus] = useState(false);
  let [err, setErr] = useState("");

  //user login
  async function loginUser(userCred) {
    try {
      let res = await fetch(
        `http://localhost:3000/users?username=${userCred.username}&password=${userCred.password}`
      );
      let usersList = await res.json();
      
      if (usersList.length === 0) {
        //invalid credentials
        console.log("invalid user");
        setCurrentUser(null);
        setUserLoginStatus(false);
        setErr('Invalid Username or Password')
       
      } else {
        setCurrentUser(usersList[0]);
        setUserLoginStatus(true);
        setErr('')
      }
    } catch (error) {
      setErr(error.message);
    }
  }

  //user logout
  function logoutUser() {
    //reset state
    setCurrentUser({});
    setUserLoginStatus(false);
    setErr('')
  }

  return (
    <userLoginContext.Provider
      value={{ loginUser, logoutUser, userLoginStatus,err,currentUser,setCurrentUser }}
    >
      {children}
    </userLoginContext.Provider>
  );
}

