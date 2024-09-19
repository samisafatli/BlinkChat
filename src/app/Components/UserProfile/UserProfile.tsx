import { Avatar, Box, Typography } from '@mui/material'

type UserProfileProps = {
    userName: string;
    photoURL?: string;
}

const UserProfile = ({ userName, photoURL }: UserProfileProps) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            <Avatar
                alt={userName}
                src={photoURL || ''}
                sx={{ width: 60, height: 60, marginBottom: 1 }}
            >
                {userName.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant='h6'>
                {userName}
            </Typography>
        </Box>
    )
}

export default UserProfile