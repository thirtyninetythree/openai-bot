import {
    Button,
    IconButton,
    TextField,
    InputAdornment,
} from '@mui/material'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
export default function ChatQueryForm({queryValue, setQueryValue, currentDocument, handleSubmit}) {
    const onTextChange = (e) => setQueryValue(e.target.value)
    return (
        <TextField
            onChange={onTextChange}
            value={queryValue}
            label={'Ask and you shall receive'}
            required
            sx={{ width: "80%" }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            color={currentDocument != null ? "primary" : "inherit"}
                            aria-label="send outlined icon"
                            onClick={handleSubmit}
                        >
                             <SendOutlinedIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
}
