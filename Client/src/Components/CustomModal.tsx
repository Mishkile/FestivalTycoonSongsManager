import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
type CustomModalProps = {
    confirmRemove: () => void;
    closeWindow: () => void;
    header?: string;
    content?: string;
  };
export default function CustomModal({ confirmRemove, closeWindow, header = "Some header", content = "Some Content" }: CustomModalProps) {
   
    const [open, setOpen] = React.useState(true);
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: `gray`,
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleClose = () => {

        closeWindow()
        // setOpen(false)


    }

    return (
        <div >


            <Modal
                
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete Song? it will be removed from the folder as well.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <button onClick={() => confirmRemove()} style={{backgroundColor: "darkred"}}>Delete</button> <button onClick={handleClose}>Cancel</button>
                    </Typography>
                </Box>
            </Modal>


        </div>
    )
}
