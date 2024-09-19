import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import UserProfile from '../UserProfile/UserProfile'
import { auth } from "../../firebase/clientApp"
import { useAuthState } from "react-firebase-hooks/auth"

const Header = () => {

    const [user, loading, error] = useAuthState(auth)

    return (
        <Container sx={{ padding: "0 !important" }}>
            <Box sx={{
                padding: '10px 0',
                marginBottom: '20px',
                borderBottom: '1px solid black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'

            }}>
                <Typography variant='h4'>BlinkChat</Typography>
                <UserProfile userName={user?.displayName || 'Anonymous'} photoURL={user?.photoURL || ''} />
            </Box>
        </Container>
    )
}

export default Header