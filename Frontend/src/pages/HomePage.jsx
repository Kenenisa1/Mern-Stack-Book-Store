import { useProductStore } from "../Store/product";
import {useEffect} from 'react';
import ProductCard from '../components/ProductCard'
const HomePage = () => {
  const {fetchProducts, products} = useProductStore();

  useEffect(() => {
    fetchProducts();

  }, [fetchProducts])

  console.log(products)
  return (
    <div className="home-page ">
       <div className="justify-center p-4 text-4xl font-bold items-center text-blue-500">
         <h1 className="text-center">Product Home Page</h1>
         <div>
            {products.map((product) => {
              <ProductCard 
                key={product._id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            })}
         </div>
       </div>
    </div>
  )
}

export default HomePage