import React, { useEffect, useState } from "react";

import { FormControl, InputAdornment, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import "./styles.scss";

function SearchBar({ onChangeSearch }) {
    const [search, setSearch] = useState(null);

    useEffect(() => {
        if (search !== null) {
            const timer = setTimeout(() => {
                onChangeSearch(search);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [search]);

    return (
        <FormControl fullWidth>
            <TextField
                id="filled-search"
                label="Search by name"
                type="search"
                // variant="filled"
                onChange={(evt) => setSearch(evt.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </FormControl>
    );
}

export default SearchBar;
