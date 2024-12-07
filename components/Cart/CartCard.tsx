import { Trash2Icon } from 'lucide-react'
import ProductCard from './ProductCard'
import React, { useState } from 'react';
import { products as initialProducts } from '../../lib/data/data';
import { Product } from '@/app/types/CartForm/Schemas';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';




const CartCard = () => {
const [products, setProducts] = useState<Product[]>(initialProducts);
  const handleProductsChange = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
  };

  const handleDeleteAll = () => {
    setProducts([]);
  };
  return (
<>
<div className="grid grid-cols-12 gap-2 bg-green-200 p-1 font-bold text-xs">
    <p className='uppercase col-span-3'>
        quality:
    </p>
    <p className='uppercase col-span-6'>
        size
    </p>
    <p className='uppercase col-span-2'>
        pcs
    </p>
    <p className='uppercase col-span-1'>
       <a
  className='h-4 w-4 rounded-sm'
  onClick={handleDeleteAll}
>
  {products.length > 0 ? <Trash2Icon className='h-4 w-4'/> : null}
</a>
       
    </p>
</div>
<ProductCard 
        products={products}
        onProductsChange={handleProductsChange}
        onDeleteAll={handleDeleteAll}
      />
<Separator className='border-black'/>

  <div className='flex justify-between '>
  <h1 className='text-xl font-bold uppercase'>total:</h1>
  <div className='flex justify-between flex-col'>
    <Input type='number' placeholder='6'/>
    <p className='text-lg text-gray-300 font-bold'>972 Kgs</p>
  </div>
  </div>

  </>


  )
}

export default CartCard
