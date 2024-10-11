import { debounce, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { setSearchTerm } from "./catalogSlice";
import { useEffect, useState } from "react";

export default function Search() {
    const {searchTerm} = useAppSelector(state => state.catalog);
    const [term, setTerm] = useState(searchTerm);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTerm(searchTerm)
    }, [searchTerm]);

    const debouncedSearch = debounce(event => {
        dispatch(setSearchTerm(event.target.value))
    }, 500)

    return (
        <TextField
            type="search"
            label='Search products'
            variant="outlined"
            fullWidth
            value={term}
            onChange={e => {
                setTerm(e.target.value);
                debouncedSearch(e);
            }}
        />
    )
}