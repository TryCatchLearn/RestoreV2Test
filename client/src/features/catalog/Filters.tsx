import { Box, Button, Paper, Typography } from "@mui/material";
import { useFetchFiltersQuery } from "./catalogApi"
import Search from "./Search";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import { resetParams, setBrands, setOrderBy, setTypes } from "./catalogSlice";
import CheckboxButtons from "../../app/shared/components/CheckboxButtons";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price: High to low' },
    { value: 'price', label: 'Price: Low to high' },
]

export default function Filters() {
    const { data } = useFetchFiltersQuery();
    const dispatch = useAppDispatch();
    const { orderBy, brands, types } = useAppSelector(state => state.catalog);

    if (!data?.brands || !data.types) return <Typography>Loading...</Typography>

    return (
        <Box display='flex' flexDirection='column' gap={2}>
            <Paper>
                <Search />
            </Paper>
            <Paper sx={{ p: 3 }}>
                <RadioButtonGroup
                    selectedValue={orderBy}
                    options={sortOptions}
                    onChange={e => dispatch(setOrderBy(e.target.value))}
                />
            </Paper>
            <Paper sx={{ p: 3 }}>
                <CheckboxButtons
                    items={data.brands}
                    checked={brands}
                    onChange={(items: string[]) => dispatch(setBrands(items))}
                />
            </Paper>
            <Paper sx={{ p: 3 }}>
            <CheckboxButtons
                    items={data.types}
                    checked={types}
                    onChange={(items: string[]) => dispatch(setTypes(items))}
                />
            </Paper>
            <Button onClick={() => dispatch(resetParams())}>Reset filters</Button>
        </Box>
    )
}