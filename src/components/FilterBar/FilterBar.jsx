import React, { useEffect, useState } from "react";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "../DataTable/DataTable";

const FilterBar = ({
    enableSearch = true,
    labelSearch = "Buscar",
    placeholder = "Buscar",
    onPageChange,
    openLoader = false,
    rowCount = 0,
    columns,
    rows,
    pageSize,
    enableExtraFilter = false,
    extraFilterComponent,
    component,
    extraFilterList = [],
}) => {
    const [extraFilter, setExtraFilter] = useState({});
    const [filter, setFilter] = useState("");

    const handleChangeExtraFilter = (evt, key) => {
        setExtraFilter({ ...extraFilter, [key]: evt.target.value });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            onPageChange(
                filter,
                { ...extraFilter, ...extraFilterComponent },
                1,
                pageSize
            );
        }, 500);

        return () => clearTimeout(timer);
    }, [filter]);

    useEffect(() => {
        console.log(extraFilterComponent);
        onPageChange(
            filter,
            { ...extraFilter, ...extraFilterComponent },
            1,
            pageSize
        );
    }, [extraFilter, extraFilterComponent]);

    return (
        <div>
            {enableSearch && (
                <Grid container spacing={2}>
                    {component && (
                        <Grid item xs={8}>
                            {component}
                        </Grid>
                    )}

                    <Grid item xs={4}>
                        <TextField
                            placeholder={placeholder}
                            id="outlined-basic"
                            value={filter}
                            label={labelSearch}
                            variant="outlined"
                            autoComplete="off"
                            fullWidth
                            onChange={(evt) => setFilter(evt.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
            )}
            {enableExtraFilter &&
                extraFilterList.map(
                    (component) =>
                        component.type === "radio" && (
                            <FormControl key={component.key}>
                                <FormLabel id="demo-row-radio-buttons-group-label">
                                    Mostrar:
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={extraFilter[component.key] || ""}
                                    onChange={(e) =>
                                        handleChangeExtraFilter(
                                            e,
                                            component.key
                                        )
                                    }
                                >
                                    {component.items.map((item, idx) => (
                                        <FormControlLabel
                                            key={idx}
                                            value={item.value}
                                            control={<Radio />}
                                            label={item.label}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )
                )}
            <DataTable
                filter={filter}
                extraFilter={extraFilter}
                rows={rows}
                columns={columns}
                height={500}
                onPageChange={onPageChange}
                openLoader={openLoader}
                rowCount={rowCount}
            />
        </div>
    );
};

export default FilterBar;
