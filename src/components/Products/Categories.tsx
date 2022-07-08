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
  FormLabel,
  FormGroup,
  Typography,
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
    <Box>
      <FormControl
        sx={{
          display: "flex",
          p: 2,
          pb: 5,
          border: "2px solid",
          borderColor: "primary.main",
        }}
      >
        <FormLabel>Categories</FormLabel>
        <FormGroup sx={{ mt: 3 }}>
          {categoriesList.map((categoryItem) => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 1, width: "90%" }}
              key={uuid()}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={categoryItem.category}
                    checked={checkedCategories.includes(categoryItem.category)}
                    onChange={categoryChangeHandler}
                  />
                }
                label={categoryItem.category}
              />
              <Typography>({categoryItem.amount})</Typography>
            </Box>
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default Categories;
