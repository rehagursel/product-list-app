import { useState, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import { listActions } from "../../store/list-slice";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  OutlinedInput,
} from "@mui/material";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortParam, setSortParam] = useState<string>("");
  const dispatch = useDispatch();

  const sortChangeHandler = (event: SelectChangeEvent) => {
    setSortParam(event.target.value);
  };

  const queryChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(listActions.querySearchListItems(searchQuery));
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchQuery, dispatch]);

  useEffect(() => {
    dispatch(listActions.sortListItems(sortParam));
  }, [sortParam, dispatch]);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        width: "100%",
        border: "2px solid",
        borderColor: { xs: "transparent", lg: "primary.main" },
        mb: { xs: 2, md: 4 },
        p: { md: 3 },
        mt: { xs: 2, md: 0 },
      }}
    >
      <Box
        component="form"
        sx={{
          width: "50%",
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth>
          <InputLabel htmlFor="input-label">Search</InputLabel>
          <OutlinedInput
            id="input-label"
            value={searchQuery}
            onChange={queryChangeHandler}
            label="Search"
          />
        </FormControl>
      </Box>
      <Box
        component="form"
        sx={{
          width: "30%",
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth>
          <InputLabel htmlFor="select">Sort</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            label="Sort"
            value={sortParam}
            onChange={sortChangeHandler}
          >
            <MenuItem value="DEFAULT">Default</MenuItem>
            <MenuItem value="ASCENDING">Price-low to high</MenuItem>
            <MenuItem value="DESCENDING">Price-high to low</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SearchBar;
