import { Box, Container, Typography } from '@mui/material'
import React, { useState } from 'react'

const Header = () => {
    return (
        <Container>
            <Box sx={{
                padding: '10px 0',
                marginBottom: '20px',
                borderBottom: '2px solid red'
            }}>
                <Typography variant='h4'>BlinkChat</Typography>
            </Box>
        </Container>
    )
}

export default Header