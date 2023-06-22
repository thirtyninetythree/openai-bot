import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

export default function DocumentSelectorMenu({ documents, currentDocument, setCurrentDocument }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);  
    };

    const handleSelectDocument = (document) => {
        setCurrentDocument(document)
        handleClose() 
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>

            {documents == null ? null :
                <>
                    <Button
                        id="button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        endIcon={open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
                        disabled={currentDocument == null ? true : false}
                    >
                        {currentDocument ?? "YOUR DOCUMENTS"}
                    </Button>
                    <Menu
                        id="document-selector-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'document-selector-button',
                        }}
                    >
                        {documents.map((document) =>
                            <MenuItem key={document} onClick={() => handleSelectDocument(document)}>{document}</MenuItem>
                        )}
                    </Menu>
                </>
            }
        </div>
    );
}