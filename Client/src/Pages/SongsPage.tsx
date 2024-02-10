


import { useEffect, useState } from 'react'
import { getAllSongs } from '../Services/songsService'
import { useDispatch } from 'react-redux'


import { deleteSong } from '../Services/songsService';

import "../../public/Iconstyle.css"

import CustomModal from '../Components/CustomModal'
import SongsTable from '../Components/SongsTable';
import CustomSelect from '../Components/CustomSelect';


const SongsPage = () => {




    const dispatch = useDispatch()
    const [rows, setRows] = useState([])
    // // u_[genre ID]_[song ID]_[length]-[text] - for future reference


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


            <div >
                
                <SongsTable setRows={setRows} handleRemove={handleRemove} rows={rows} />




            </div>






        </div >

    )
}

export default SongsPage
