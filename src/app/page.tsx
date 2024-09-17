'use client'

import { Container } from "@mui/material";
import Header from "./Components/Header/Header";
import MainBox from "./Components/MainBox/MainBox";
import SignInScreen from "./auth/auth";
import { auth } from "./firebase/clientApp"
import { useAuthState } from "react-firebase-hooks/auth"

export default function Home() {

  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log('user', user)
  return (
    <main>
      <Container>
        <Header></Header>
        {user ? <MainBox /> : <SignInScreen />}
      </Container>
    </main>
  );
}
