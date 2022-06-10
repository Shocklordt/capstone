import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import "./shop.styles.scss";
import { getCategoriesAndDocuments } from "../../utils/firebase/firbase.utils";
import { setCategories } from "../../store/categories/category.action";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categories = await getCategoriesAndDocuments("categories");
      dispatch(setCategories(categories));
    };

    getCategoriesMap();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;
