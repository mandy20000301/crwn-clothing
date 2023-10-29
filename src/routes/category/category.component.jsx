import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectCategoriesMap } from '../../store/categories/category.selector';
import './category.styles.scss';
import ProductCard from '../../components/product-card/product-card';
const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    
    const [products, setProsucts] = useState([]);
    useEffect(() => {
        setProsucts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <>
            <h2 className='category-container-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {products &&
                    products.map((product) => <ProductCard key={product.id} product={product} />)
                }
            </div>
        </>
    )
}

export default Category;