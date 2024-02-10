import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';

export default function Search({ data }: { data: any[] }) {
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

            <Autocomplete
                freeSolo
                sx={{
                    backgroundColor: "rgba(255,255,255,0.55)",
                    width: "80%",
                    borderRadius: "20px"

                }}

                disableClearable
                options={bandNames.map((option: string) => {
                  
                    return option
                })}
                renderInput={(params) => (
                    <TextField
                        color='warning'
                        {...params}
                        label="Search input"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
        </Stack>
    );
}

