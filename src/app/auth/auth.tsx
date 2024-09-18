"use client"

import React from "react"
import { auth } from "../firebase/clientApp"
import StyledFirebaseAuth from "../firebase/StyledFirebaseAuth"

const uiConfig = {
    SignInSuccessUrl: "/",
    signInOptions: ["github.com"],
    signInFlow: 'popup',
    callbacks: {
        signInSuccessWithAuthResult: () => false,
    },
}

const SignInScreen = () => {

    return (
        <div style={{
            maxWidth: "320px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",

        }}>
            <h3>Login</h3>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
    )
}

export default SignInScreen;