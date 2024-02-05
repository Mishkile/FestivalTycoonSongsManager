import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { addLength } from "../Services/songsService"


const AddLengths = () => {

    const navigate = useNavigate()

    const params = useParams()

    const [songData, setSongData] = useState({})
    const [availableLengths, setAvailableLengths] = useState<any[]>([])

    useEffect(() => {
        if (!params.id) navigate('/')
        let possibleLengths = ["30sec", "60sec", "90sec"]

        let lengths: any[] = song.songs.map((song: any) => song.songLength)
     
        possibleLengths = possibleLengths.filter((length: string) => !(lengths.includes(length)))
        console.log(possibleLengths)
        setAvailableLengths(possibleLengths)

    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const genreId = song.songs[0].songId.split('_')[1]
        const finalObj = { ...songData, existingSongId: params.id, genreId, }
        console.log(finalObj)
        const status = await addLength(finalObj)
        alert(status)

    }
    const song = useSelector((state: any) => state.songs.find((song: any) => {

        return song.songId === params.id
    }))

    return (
        <div>

          
            <h2>Song will be added to: {song.songId} {song.songs[0]?.songName}</h2>

            <form onSubmit={handleSubmit}>
                mp3 file: <input onChange={(e: any) => {

                    setSongData({ ...songData, documentPath: e.target.files[0].path })
                }} type="file" />  <br />
                Length: <select onChange={e => {
                    setSongData({ ...songData, songLength: e.target.value === "30sec" ? 1 : e.target.value === "60sec" ? 2 : 3})
                }} >
                    <option disabled selected>Choose Length</option>
                    {availableLengths.length > 0 && availableLengths.map((length: string) => {
                        return <option key={length} value={length}>{length}</option>
                    })}
                    </select>  <br />

        

                <button type="submit">Add Length</button>
            </form>



        </div>
    )
}

export default AddLengths
