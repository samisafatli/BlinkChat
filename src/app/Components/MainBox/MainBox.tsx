"use client";

import { Button, Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import Link from "next/link"
import mainBoxStyle from './mainBoxStyle';

const MainBox = () => {
    const [link, setLink] = useState('');

    const createLink = () => {
        const uniqueId = Math.random().toString(36).substring(2, 9);
        const uniqueLink = `/chat/${uniqueId}`;
        setLink(uniqueLink);
    };

    return (
        <Container sx={mainBoxStyle.boxContainer}>
            <Typography variant="h6" gutterBottom>
                Create your link here!
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={createLink}
                sx={{ marginTop: '20px' }}
            >
                Generate Link
            </Button>
            {link && (
                <Typography variant="body1" sx={{ marginTop: '10px' }}>
                    Your link:{" "}
                    <Link href={link}>{link}</Link>
                </Typography>
            )}
        </Container>
    );
};

export default MainBox;
