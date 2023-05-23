import { Box, Button, Stack, Typography } from '@mui/material'
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';

function HomePage(props) {
    return (
        <Box sx={{ height: "100vh", width: "100vw", backgroundColor: blue[700], display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Stack sx={{ textAlign: "center", width: "fit-content" }} spacing={2}>
                <Typography variant='h2' fontWeight="bold" textAlign="center" color="white">InterBuddy</Typography>
                <Typography variant='h6' textAlign="center" color="white" gutterBottom>Your AI assistant to hone your job interview skills.</Typography>
                <Button variant='contained' color='success' component={Link} to="/mock-interview">start practicing</Button>
            </Stack>
        </Box>
    )
}

export default HomePage;