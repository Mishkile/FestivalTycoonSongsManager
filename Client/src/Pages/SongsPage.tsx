
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
import SongsTable from '../Components/SongsTable';


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

            {/* public id: number,
        public genre: number,
        public length: number,
        public text: string */}
            <div >
               <SongsTable handleRemove={handleRemove} rows={rows} />




            </div>






        </div >

    )
}

export default SongsPage
