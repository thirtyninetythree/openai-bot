import { useState } from 'react'
import { Box, Typography, Card, CardContent } from '@mui/material';

export default function ResponseCard({ completion }) {
    return (
        <Box sx={{ width: "80%", mb: 1 }}>
            <Card variant="outlined" sx={{ height: "50vh", overflow: 'auto', mt: 1 }}>
                <CardContent>
                    <Typography variant="body2">
                        {completion ? completion :
                            `Hello, I'm Soma. Your AI reading companion. 
                        I can summarize documents and answer any question about your documents. 
                        Upload a file or audio and let's start. My responses will appear here.  
                        `}
                    </Typography>
                </CardContent>
            </Card>
        </Box >
    );
}
