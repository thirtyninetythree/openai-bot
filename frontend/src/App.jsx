import { useState, useEffect } from 'react'
import {
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Typography,
  Box,
  Grid,
  Stack,
  Divider,
  LinearProgress,
} from '@mui/material'

import axios from 'axios'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import Notifications from './components/Notifications';
import ResponseCard from './components/ResponseCard';
import DocumentSelectorMenu from './components/DocumentSelectorMenu';
import ChatQueryForm from './components/ChatQueryForm';

import { handleQuerySubmit, uploadFile } from './api_helpers';

function App() {
  //stream response from openai
  const [completion, setCompletion] = useState("")
  //waiting for stream from openai
  const [streamIsLoading, setStreamIsLoading] = useState(false)
  //query form 
  const [queryValue, setQueryValue] = useState()
  const [isFileUploading, setIsFileUploading] = useState(false)
  //LOADED FROM LOCAL STORAGE
  const [currentDocument, setCurrentDocument] = useState();
  const [documents, setDocuments] = useState([]);
  //NOTIFICATION STATE HANDLERS
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [messageSeverity, setMessageSeverity] = useState("")


  //ACCESS LOCAL STORAGE AND GET DOCUMENTS
  useEffect(() => {
    let temp = JSON.parse(localStorage.getItem("documents"))
    setDocuments(temp)
    if (temp != null || temp != undefined) {
      setCurrentDocument(temp[0])
    }
  }, []);

  const handleNotifications = (message, severity) => {
    setOpen(true)
    setErrorMessage(message)
    setMessageSeverity(severity)
  }

  const handleSubmit = () => {
    if (typeof queryValue == 'undefined') {
      return
    }
    handleQuerySubmit(queryValue, currentDocument, setCompletion, handleNotifications, setStreamIsLoading);
  }

  const handleFileUpload = () => {
    setIsFileUploading(true)
    const file = document.getElementById('file-input').files[0]
    uploadFile(file, setIsFileUploading, documents, setDocuments, setCurrentDocument, handleNotifications)
  }

  return (
    <div className="App">
      <Navbar isFileUploading={isFileUploading} handleFileUpload={handleFileUpload} />
      {open && <Notifications
        open={open}
        setOpen={setOpen}
        error={errorMessage}
        severity={messageSeverity}
      />}

      
      <Stack direction="column"
        justifyContent="center"
        alignItems="center"
        marginBottom={16}
      >
        { streamIsLoading && <LinearProgress/ >}
        <Grid container direction="row" justifyContent="start"
          alignItems="center" sx={{ mt: 1.5,width: "80%" }}>
          <Grid item xs={4}>
            <DocumentSelectorMenu documents={documents} currentDocument={currentDocument} setCurrentDocument={setCurrentDocument} />
          </Grid>
          
        </Grid>
        <ResponseCard completion={completion} />
        <ChatQueryForm queryValue={queryValue} setQueryValue={setQueryValue} currentDocument={currentDocument} handleSubmit={handleSubmit}/>
      </Stack>
      <Footer />
    </div>
  )
}

export default App
