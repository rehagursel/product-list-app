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
  Select,
  MenuItem,
} from "@mui/material";
import { v4 as uuid } from "uuid";

interface Category {
  category: string;
  amount: number;
}

const Categories: React.FC = () => {
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const productsList: ProductsData[] = useSelector(
    (state: RootState) => state.list.items
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
        p: 3,
        border: "2px solid",
        borderColor: { xs: "transparent", sm: "primary.main" },
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
            <MenuItem>
              <Box
                component="form"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: 1, ml: 1, width: "100%" }}
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
                />
                <Typography>({categoryItem.amount})</Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Categories;
