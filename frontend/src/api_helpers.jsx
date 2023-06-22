import axios from 'axios'


const handleQuerySubmit = (query, filename, setCompletion, handleNotifications, setStreamIsLoading) => {
    setStreamIsLoading(true)

    let formData = new FormData()
    formData.append('query', query)
    formData.append('currentDocument', filename)
    axios
        .post('/completion', formData).then((res) => {
            setStreamIsLoading(false)
            streamCompletions(setCompletion)
        })
        .catch((err) => {
            handleNotifications("An error has occurred.", "error")
        })
}

const streamCompletions = (setCompletion) => {
    const sse = new EventSource('/completion',
        { withCredentials: true });
    let sent = "";
    function getRealtimeData(data) {
        sent += data;
        setCompletion(sent)
    }
    sse.onmessage = e => getRealtimeData(e.data);

    sse.onerror = () => {
        // error log here 
        sse.close();
    }

    return () => {
        sse.close();
    }
}

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_FILE_EXTENSIONS = ["txt", "docx", "mp3"]
const uploadFile = (file, setIsFileUploading, documents, setDocuments, setCurrentDocument, handleNotifications) => {
    //FILE TOO BIG
    if (file.size > MAX_FILE_SIZE) {
        setIsFileUploading(false)
        handleNotifications("File too big", "error")
        return
    }
    //WRONG FILE EXTENSION
    if (!ALLOWED_FILE_EXTENSIONS.includes(file.name.split('.').pop())) {
        setIsFileUploading(false)
        handleNotifications("Only TXT, DOCX, MP3 files are allowed", "error")
        return
    }

    let formData = new FormData()
    formData.append('doc', file)
    axios
        .post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            setDocuments([file.name, ...(documents || [])])
            localStorage.setItem("documents", JSON.stringify([file.name, ...(documents || [])]));
            setCurrentDocument(file.name)
            setIsFileUploading(false)
            handleNotifications("File successfully uploaded", "success")
        })
        .catch((err) => {
            setIsFileUploading(false)
            handleNotifications(`Error uploading file ${err}`, "error")
        })
}

export { handleQuerySubmit, uploadFile }