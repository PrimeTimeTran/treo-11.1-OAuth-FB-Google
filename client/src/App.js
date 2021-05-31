import { useState } from 'react'

import FacebookLogin from 'react-facebook-login';
import './App.css';

const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;

function App() {
  const [user, setUser] = useState(null)
  const loginWithFacebook = async (user) => {
    try {

    console.log({user})

    const access_token = user.accessToken;

    const response = await fetch(
      "http://localhost:5000/api/auth/login/facebook",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer,
        body: JSON.stringify({
          user,
          access_token,
        }),
        // body: {
        //   user,
        //   access_token,
        // },
      },
    );
    const json = await response.json()
    console.log({ user: json });

    setUser(json.user)

    } catch (error) {
      console.log('Error', error)
    }
  }

  if (user?.name) return <h1>Hello {user.name}</h1>

  return (
    <div className="App">
      <h1>Treo 2 The Best CoderSociaBlog</h1>
      <h1>Facebook Login</h1>
      <FacebookLogin
        appId={FB_APP_ID}
        fields="name,email,picture"
        callback={loginWithFacebook}
        icon="fa-facebook"
        onFailure={(err) => {
          console.log("FB LOGIN ERROR:", err);
        }}
        containerStyle={{
          textAlign: "center",
          backgroundColor: "#3b5998",
          borderColor: "#3b5998",
          flex: 1,
          display: "flex",
          color: "#fff",
          cursor: "pointer",
          marginBottom: "3px",
        }}
        buttonStyle={{
          flex: 1,
          textTransform: "none",
          padding: "12px",
          background: "none",
          border: "none",
        }}
      />
      <h1>Google Login</h1>
    </div>
  );
}

export default App;
