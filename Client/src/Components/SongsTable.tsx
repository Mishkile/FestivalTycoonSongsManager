


import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomModal from './CustomModal';
import { useNavigate } from 'react-router-dom';
import Search from './Search';
import CustomSelect from './CustomSelect';
const SongsTable = ({ setRows, rows, handleRemove }: { setRows: Function, rows: any[], handleRemove: Function }) => {
    const navigate = useNavigate()
    const [isDeleteHover, setIsDeleteHover] = React.useState(false)
    const [songHover, setSongHover] = React.useState("")
    const [modalOpen, setModalOpen] = React.useState(false)

    const remove = (id: string) => {
        handleRemove(id)
    }



    const sortRows = (category: string) => {
        const rowsCopy = [...rows]

        switch (category) {
            case 'Band':
                const sortedArray = rowsCopy.sort((a: any, b: any) => a.bandName.localeCompare(b.bandName))
                setRows(sortedArray)
                break;

            case 'ID':
                const sortedArray2 = rowsCopy.sort((a: any, b: any) => a.songId.localeCompare(b.songId))
                setRows(sortedArray2)
                break;
        }


    }



    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

            <search style={{ display: "flex", justifyContent: "space-around", gap: 15, width: "50%" }}>

                <div style={{ width: "20%" }}>
                    <CustomSelect returnCategory={(data: string) => sortRows(data)} /> <br />

                </div>

                <div style={{ borderRadius: "30px", height: "5em", backgroundColor: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center" }}>
                    <Search data={rows} />
                </div>

            </search>


            <br />

            <div >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1600, minHeight: 200, backgroundColor: "#949494" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Band</TableCell>
                                <TableCell align="right">Song Name</TableCell>
                                <TableCell align="right">Length</TableCell>
                                <TableCell align="right">Add Length File</TableCell>
                                <TableCell align="right">Remove</TableCell>





                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map((row: any) => {

                                    return <TableRow

                                        key={row.songId}
                                        
                                        sx={{  '&:last-child td, &:last-child th': { border: 0 } }}
                                        hover={true}

                                    >

                                        <TableCell style={{ fontSize: "large", backgroundColor: "gray", color: "darkgray", fontFamily: 'cursive' }} component="th" scope="row">
                                            {row.songId}

                                        </TableCell>
                                        <TableCell style={{ fontSize: "large", color: "white" }} align="right" >{row.bandName}</TableCell>
                                        <TableCell style={{ fontSize: "large", color: "white", backgroundColor: "gray" }} align="right">{row.songName}</TableCell>
                                        <TableCell style={{ fontSize: "large", color: "white" }} align="right">{row.songLength}</TableCell>
                                        {row.songLength.includes('/') && !row.songLength.includes("NA") ? (
                                            <TableCell sx={{ color: "white", backgroundColor: "gray" }} align="right">Maximum Lengths</TableCell>
                                        ) : (
                                            <TableCell align="right" sx={{backgroundColor: "gray"}}>
                                            
                                                <button onClick={() => navigate(`/song/${row.songId}`)}>Add Length</button>
                                            </TableCell>
                                        )}
                                        <TableCell align="right">

                                            {isDeleteHover && songHover === row.songId ? <DeleteForeverIcon className='delete-forever-icon' fontSize={'large'} onMouseLeave={() => setIsDeleteHover(false)} onClick={() => setModalOpen((prev) => true)} /> : <DeleteIcon fontSize={'large'} onMouseOver={() => {
                                                setSongHover(row.songId)
                                                setIsDeleteHover(true)
                                            }}
                                                sx={{ color: "darkred" }}
                                            />

                                            }

                                            {modalOpen ? <CustomModal confirmRemove={() => {
                                                remove(row.songId)
                                                setModalOpen(false)
                                            }} closeWindow={() => setModalOpen(false)} /> : null}

                                        </TableCell>



                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>




            </div>







        </div>
    )
}

export default SongsTable
