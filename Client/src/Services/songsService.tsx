import axios from 'axios';
// u_[genre ID]_[song ID]_[length]-[text] - for future reference
// i need to get to a txt file and read it line by line, convert every line to json and return an array of json 

const getAllSongs = async (documentPath: string) => {
    const { data } = await axios.post("http://127.0.0.1:8000/api/songsWithIds", { documentPath })
    console.log(data)
    return data

}

const addSong = async (body : any) => {
    const {data: status} = await axios.post("http://127.0.0.1:8000/api/add", body)
    return status
}

const addLength = async (body : any) => {
    try {
        const {data: status} = await axios.post("http://127.0.0.1:8000/api/addlength", body)
        return status
    }catch(err:any) {
        return err.message
    }
    
}

const deleteSong = async (songId : string, documentPath: string) => {
    const body : any = {documentPath}
    const {data} = await axios.delete(`http://127.0.0.1:8000/api/${songId}`, {data: body})
    return data
}
export { getAllSongs, addSong, addLength, deleteSong }