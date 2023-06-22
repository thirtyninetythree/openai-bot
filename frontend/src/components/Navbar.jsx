import * as React from 'react'
import {
    Typography,
    Button,
    IconButton,
    Grid,
    Box,
    AppBar,
    Toolbar,
    CircularProgress,
    Avatar,
    Link,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import TwitterIcon from '@mui/icons-material/Twitter';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';


function Navbar({ isFileUploading, handleFileUpload }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item container justifyContent="left" sx={{ ml: 2 }}>
                            <Typography
                                variant="h4"
                                noWrap
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                }}
                            >
                                SOMA
                            </Typography>
                        </Grid>
                        <Grid item container justifyContent="left" sx={{ ml: 2 }}>
                            <Typography sx={{ fontWeight: 300 }}>
                                Read Smarter with Soma - Your AI Reading Companion.
                            </Typography>
                        </Grid>
                    </Grid>
                    <IconButton color="primary" aria-label="share to twitter" component="label" sx={{mr: 3}}>
                        <Link target="_blank" href="https://twitter.com/intent/tweet?text=I used Soma app to have chat queries with my audio and files. Try it out here: &url=https://soma-ask-document-gpt.web.app&hashtags=ai,ilovesoma">
                            <TwitterIcon />
                        </Link>
                    </IconButton>

                    {
                        isFileUploading ? <CircularProgress /> :
                            <Button
                                variant="outlined"
                                component="label"
                                sx={{ display: 'flex', width: 220 }}
                                startIcon={<FileUploadOutlinedIcon />}
                            >
                                UPLOAD FILE
                                <form
                                    method="POST"
                                    action="/upload"
                                    encType="multipart/form-data"
                                >
                                    <input
                                        id="file-input"
                                        type="file"
                                        hidden
                                        onChange={handleFileUpload}
                                    />
                                </form>
                            </Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}
export default Navbar

