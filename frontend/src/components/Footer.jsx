import * as React from 'react';
import { Box, Grid, Container, Typography, Divider, Link } from "@mui/material";

export default function Footer() {
    return (
        <Box
            sx={{
                width: "100%",
                height: 10,
                backgroundColor: "white",
                mt: 2,
                position: "fixed",
                bottom: 40
            }}
        >
            <Container maxWidth="lg">
                <Grid container direction="column" alignItems="center">
                    <Grid item container
                        direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <Divider sx={{ width: "25%", margin: 1 }} variant="middle" />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Typography color="textSecondary" variant="subtitle1">
                         {` SOMA. ${new Date().getFullYear()} ©`}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
