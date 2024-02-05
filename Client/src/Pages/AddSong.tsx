import { useNavigate } from "react-router-dom"
import { MuiFileInput } from 'mui-file-input'
import { useState } from "react"
import { addSong } from "../Services/songsService"
const AddSong = () => {
    const navigate = useNavigate()
    const [body, setBody] = useState({})
    const [genres, setGenres] = useState([

        { id: "00", name: "Metal" },
        { id: "01", name: "Rock" },
        { id: "02", name: "Folk" },
        { id: "03", name: "Hip Hop" },
        { id: "04", name: "EDM" },
        { id: "05", name: "Techno" },
    ])
    const [lengths, setLengths] = useState([

        { id: 1, name: "30sec" },
        { id: 2, name: "60sec" },
        { id: 3, name: "90sec" },
    ])


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        console.log(body)

        if (Object.keys(body).length !== 5) {
            alert("Please fill all fields")
            return
        }

        await addSong(body)
        
        navigate("/")

    }

    return (
        <div>
            <form style={{ border: "2px solid black" }} onSubmit={e => handleSubmit(e)}>
                <h2>Drop Song</h2>
                <input type="file" style={{ border: "2px solid red" }} onChange={(e: any) => {
                    console.log(e.target.files[0].path)
                    setBody({ ...body, documentPath: e.target.files[0].path })

                }} /> <br />

                <h2>Band Name</h2>
                <input type="text" onChange={(e: any) => {
                    setBody({ ...body, bandName: e.target.value })
                }} /> <br />

                <h2>Song Name</h2>
                <input type="text" onChange={(e: any) => {
                    setBody({ ...body, songName: e.target.value })
                }} /> <br />

                <h2>Choose Genre</h2>
                <select name="genre" id="genre" onChange={(e: any) => {
                    setBody({ ...body, genreId: e.target.value })
                }}>
                    <option disabled selected>Choose Genre</option>

                    {genres.map((genre) => {
                        return <option key={genre.id} value={genre.id}>{genre.name}</option>
                    })}
                </select> <br />

                <h2>Choose Length</h2>
                <select name="length" id="length" onChange={(e: any) => {
                    setBody({ ...body, length: e.target.value })
                }}>
                    <option disabled selected>Choose Lengths</option>
                    {lengths.map((length) => {
                        return <option key={length.id} value={length.id}>{length.name}</option>
                    })}
                </select> <br />

                <button type="submit">Submit</button>

            </form>
        </div>
    )
}

export default AddSong
