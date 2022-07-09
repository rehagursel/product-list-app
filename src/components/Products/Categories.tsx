import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listActions } from "../../store/list-slice";
import { RootState } from "../../store";
import { ProductsData } from "../../models/data.models";
import {
  Box,
  FormControlLabel,
  Checkbox,
  FormControl,
  Typography,
  InputLabel,
  Select
} from "@mui/material";
import { v4 as uuid } from "uuid";

interface Category {
  category: string;
  amount: number;
}

const Categories = () => {
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const productsList: ProductsData[] = useSelector(
    (state: RootState) => state.list.sortedList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listActions.filterListItems(checkedCategories));
  }, [checkedCategories, dispatch]);

  const categoriesList: Category[] = [];
  productsList.forEach((product) => {
    const existingCategoryItemIndex = categoriesList.findIndex(
      (item) => item.category === product.category
    );
    const existingCategoryItem = categoriesList[existingCategoryItemIndex];
    if (!existingCategoryItem) {
      categoriesList.push({ category: product.category, amount: 1 });
    } else {
      const updatedCategoryItem = {
        ...existingCategoryItem,
        amount: existingCategoryItem.amount + 1,
      };
      categoriesList[existingCategoryItemIndex] = updatedCategoryItem;
    }
  });

  const categoryChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const index = checkedCategories.indexOf(event.target.value);
    if (index === -1) {
      setCheckedCategories([...checkedCategories, event.target.value]);
    } else {
      setCheckedCategories(
        checkedCategories.filter((category) => category !== event.target.value)
      );
    }
  };
  return (
    <Box
      justifyContent="center"
      sx={{
        p: {md: 3},
        border: "2px solid",
        borderColor: { xs: "transparent", lg: "primary.main" },
        display: "flex",
      }}
    >
      <FormControl fullWidth>
        <InputLabel htmlFor="select">Categories</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          label="Categories"
          sx={{ width: "100%" }}
        >
          {categoriesList.map((categoryItem) => (
            
              <Box
                component="form"
                display="flex"
                alignItems="center"
                sx={{ mt: 1, px: 2, width: {xs: "100%",lg: 220} }}
                key={uuid()}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      value={categoryItem.category}
                      checked={checkedCategories.includes(
                        categoryItem.category
                      )}
                      onChange={categoryChangeHandler}
                    />
                  }
                  label={categoryItem.category}
                  sx={{ width: "100%" }}
                />
                <Typography>
                  (
                  <Box display="inline" color="primary.main">
                    {categoryItem.amount}
                  </Box>
                  )
                </Typography>
              </Box>
           
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Categories;
