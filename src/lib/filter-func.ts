import { ProductsData } from "../models/data.models";

interface FilterParams {
  categoryParams: string[];
  sortParam: string;
  queryParam: string;
}

export const getFilteredList = (
  filterParams: FilterParams,
  items: ProductsData[]
) => {
  if (items.length === 0) {
    return null;
  }

  const tempArr = [...items];
  let filteredWithCategoryArr: ProductsData[] | null = [];
  let filteredWithQueryArr: ProductsData[] | null = [];
  let lastArr: ProductsData[] | null = [];
  if (filterParams.categoryParams.length > 0) {
    const filteredArr = tempArr.filter((product) =>
      filterParams.categoryParams.includes(product.category)
    );
    filteredWithCategoryArr = filteredArr;
  } else {
    filteredWithCategoryArr = [...items];
  }

  if (filteredWithCategoryArr.length === 0) {
    return null;
  }

  if (filterParams.queryParam.length > 1) {
    const filteredArrSecond = filteredWithCategoryArr.filter((product) =>
      product.title
        .toUpperCase()
        .includes(filterParams.queryParam.toUpperCase())
    );
    filteredWithQueryArr = filteredArrSecond;
  } else if (filterParams.queryParam.length < 1) {
    filteredWithQueryArr = [...filteredWithCategoryArr];
  } else {
    filteredWithQueryArr = [...filteredWithCategoryArr];
  }

  if (filteredWithQueryArr.length === 0) {
    return null;
  }

  let tempArrSecond = [...filteredWithQueryArr];
  if (filterParams.sortParam === "DEFAULT") {
    lastArr = [...filteredWithQueryArr];
  } else if (filterParams.sortParam === "DESCENDING") {
    lastArr = tempArrSecond.sort((productA, productB) =>
      productA.price < productB.price ? 1 : -1
    );
  } else if (filterParams.sortParam === "ASCENDING") {
    lastArr = tempArrSecond.sort((productA, productB) =>
      productA.price > productB.price ? 1 : -1
    );
  } else {
    lastArr = [...filteredWithQueryArr];
  }

  return lastArr;
};
