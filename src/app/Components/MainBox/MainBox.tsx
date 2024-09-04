"use client";

import { Button, Container, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'

const MainBox = () => {

    const [link, setLink] = useState('')

    const createLink = () => {
        // const uniqueLink = `https://blinkchat.app/chat/${Math.random().toString(36).substring(2, 9)}`
        const uniqueLink = `http://localhost:3000/chat/${Math.random().toString(36).substring(2, 9)}`
        setLink(uniqueLink)
    }

    return (
        <Container>
            <Typography variant='h6' gutterBottom>Create your link here!</Typography>
            <Button
                variant='contained'
                color='primary'
                onClick={createLink}
                sx={{ marginTop: '20px' }}
            >
                Generate Link
            </Button>
            {link && (
                <Typography variant='body1' sx={{ marginTop: '10px' }} >
                    Your link: <a href={link}>{link}</a>
                </Typography>)}
        </Container>
    )
}

export default MainBox