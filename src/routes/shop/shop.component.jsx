import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils.js';
import { useDispatch } from 'react-redux';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import './shop.styles.scss';
import { setCategoriesMap } from '../../store/categories/category.action.js'
const Shop = () => {
    const disptach = useDispatch();
    useEffect(()=>{
        const getCategoriesMap = async () => {
          const catrgoryMap =  await getCategoriesAndDocuments();
          disptach(setCategoriesMap(catrgoryMap));
        }
        getCategoriesMap();
      },[])
    return (
        <Routes>
            <Route index element={<CategoriesPreview/>}></Route>
            <Route path=':category' element={<Category/>}></Route>
        </Routes>
    );
}
export default Shop;