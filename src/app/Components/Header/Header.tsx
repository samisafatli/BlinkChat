import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
    return (
        <Container>
            <Box sx={{
                padding: '10px 0',
                marginBottom: '20px',
                borderBottom: '1px solid black'
            }}>
                <Typography variant='h4'>BlinkChat</Typography>
            </Box>
        </Container>
    )
}

export default Header