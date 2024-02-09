import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { addSong } from "../Services/songsService"
import "../../public/Draggingstyle.css"
import { useSelector } from "react-redux"


const AddSong = () => {

    const documentsPath = useSelector((state: any) => state.documentsPath)
    
    const [isDragging, setIsDragging] = useState("")


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
        try {
              if (Object.keys(body).length !== 5 && Object.keys(body).length !== 6  ) {
            alert("Please fill all fields")
            return
        }
        console.log()
        await addSong({...body, documentPath: documentsPath})

        navigate("/")
        }catch(e){
            console.log(e)
        }

      

    }

    return (
        <div style={{ width: "100%"}} >


            <form style={{  border: "2px solid black", display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={e => handleSubmit(e)}>
                <h2 >Drop Song</h2>
                <input className={isDragging} onMouseLeave={() => setIsDragging("")} onDragLeave={() => setIsDragging("")} onDragOver={() => {
                    
                   return isDragging === "" ? setIsDragging("dragging-style") : null
                }} type="file" style={{ border: "2px solid darkred", height: "150px" }} onChange={(e: any) => {
                 
                    setBody({ ...body , songFilePath: e.target.files[0].path })

                }} /> <br />

            
                <input placeholder="Band Name" style={{textAlign:"center", width: "20%", height: "40px", fontSize: "large"}} type="text" onChange={(e: any) => {
                    setBody({ ...body, bandName: e.target.value })
                }} /> <br />

             
                <input placeholder="Song Name" style={{textAlign:"center",width: "20%", height: "40px", fontSize: "large"}} type="text" onChange={(e: any) => {
                    setBody({ ...body, songName: e.target.value })
                }} /> <br />

               
                <select style={{textAlign: "center", width: "20%", height: "40px", fontSize: "large"}} name="genre" id="genre" onChange={(e: any) => {
                    setBody({ ...body, genreId: e.target.value })
                }}>
                    <option disabled selected>Choose Genre</option>

                    {genres.map((genre) => {
                        return <option key={genre.id} value={genre.id}>{genre.name}</option>
                    })}
                </select> <br />

              
                <select style={{textAlign: "center", width: "20%", height: "40px", fontSize: "large"}} name="length" id="length" onChange={(e: any) => {
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
