'use client'

import { Container } from "@mui/material";
import Header from "./Components/Header/Header";
import MainBox from "./Components/MainBox/MainBox";
import SignInScreen from "./auth/auth";
import { auth } from "./firebase/clientApp"
import { useAuthState } from "react-firebase-hooks/auth"
import SignOutButton from "./Components/SignOutButton/SignOutButton";

export default function Home() {
  const [user, loading, error] = useAuthState(auth)

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <main>
      <Container>
        <Header></Header>
        {user ?
          <>
            <MainBox />
            <SignOutButton />
          </> : <SignInScreen />}
      </Container>
    </main>
  );
}
