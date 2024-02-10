import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';

export default function Search({ setInput }: { setInput: Function }) {
    const bandNames = useSelector((state: any) => {
        const songs = state.songs.map((song: any) => song.songs)

        const finalArr: string[] = []
        songs.forEach((songArr: any[]) => {
            songArr.forEach((song: any) => finalArr.push(song.bandName))
        })

        return finalArr.filter((bandName, index: number) => finalArr.indexOf(bandName) === index)
    })
    return (
        <Stack spacing={2} sx={{ width: 450, display: "flex", alignItems: "center" }}>




            <TextField
                onChange={(e) => setInput(e.target.value)}

                color='warning'
                sx={{ backgroundColor: "lightgray", borderRadius: "30px", width: "80%" }}
                label="Search input"
                InputProps={{

                    type: 'search',
                }}
            />


        </Stack>
    );
}

