
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useEffect, useState } from 'react'
import { getAllSongs } from '../Services/songsService'
import { useSelector, useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom';

import { deleteSong } from '../Services/songsService';

import "../../public/Iconstyle.css"

import CustomModal from '../Components/CustomModal'


const SongsPage = () => {
    // Reminder to self: seperate the table into a different component


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [rows, setRows] = useState([])
    // // u_[genre ID]_[song ID]_[length]-[text] - for future reference
    const [isDeleteHover, setIsDeleteHover] = useState(false)
    const [songHover, setSongHover] = useState("")

    const [modalOpen, setModalOpen] = useState(false)

    const checkLength = (length: any) => {

        return !length ? length = 'NA' : length
    }



    function createData(bandName: string, songName: string, songId: string, songLength: string) {
        if (songLength.includes('undefined')) songLength = songLength.replace('undefined', 'NA')

        return { bandName, songName, songId, songLength };
    }



    const fetchData = async () => {
        const documentPath: any = localStorage.getItem('documentsPath')
        const songs = await getAllSongs(documentPath)
        const data = songs.map((song: any) => createData(song.songs[0].bandName, song.songs[0].songName, song.songId, `${checkLength(song.songs[0]?.songLength)}/${checkLength(song.songs[1]?.songLength)}/${checkLength(song.songs[2]?.songLength)}`))
        setRows(data)
        dispatch({ type: 'SET_SONGS', payload: songs })
    }


    const handleRemove = async (songId: any) => {
        const documentPath: any = localStorage.getItem('documentsPath')
        const status = await deleteSong(songId, documentPath)
        alert(status)
        fetchData()
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div >
            <h1>Test</h1>
            {/* public id: number,
        public genre: number,
        public length: number,
        public text: string */}
            <div >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1600, minHeight: 200 }} aria-label="simple table">
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
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        hover={true}

                                    >

                                        {modalOpen ? <CustomModal confirmRemove={() => handleRemove(row.songId)} closeWindow={() => setModalOpen(false)} /> : null}
                                        <TableCell style={{ fontSize: "large" }} component="th" scope="row">
                                            {row.songId}
                                        </TableCell>
                                        <TableCell style={{ fontSize: "large" }} align="right" >{row.bandName}</TableCell>
                                        <TableCell style={{ fontSize: "large" }} align="right">{row.songName}</TableCell>
                                        <TableCell style={{ fontSize: "large" }} align="right">{row.songLength}</TableCell>
                                        {row.songLength === '30sec/60sec/90sec' ? <TableCell align="right">Maximum Lengths</TableCell> : <TableCell align="right">  <button onClick={() => navigate(`/song/${row.songId}`)}>Add Length</button></TableCell>}

                                        <TableCell align="right">
                                            {isDeleteHover && songHover===row.songId  ? <DeleteForeverIcon className='delete-forever-icon' fontSize={'large'} onMouseLeave={() => setIsDeleteHover(false)} onClick={() => setModalOpen((prev) => true)} /> : <DeleteIcon fontSize={'large'} onMouseOver={() => {
                                                setSongHover(row.songId)
                                                setIsDeleteHover(true)
                                            }} />

                                            }
                                        </TableCell>



                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>




            </div>






        </div >

    )
}

export default SongsPage
