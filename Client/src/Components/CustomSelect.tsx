import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function CustomSelect({ returnCategory }: { returnCategory: Function }) {
    const [category, setCategory] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        returnCategory(event.target.value)
        setCategory(event.target.value as string);
    };

    return (
        <Box sx={{ maxWidth: 120, backgroundColor: "white" }}>
            <FormControl fullWidth>
                <InputLabel sx={{ color: "black" }} id="demo-simple-select-label">Sort</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Sort"
                    onChange={handleChange}
                >
                    <MenuItem value={"ID"}>ID</MenuItem>
                    <MenuItem value={"Band"}>Band</MenuItem>

                </Select>
            </FormControl>
        </Box>
    );
}