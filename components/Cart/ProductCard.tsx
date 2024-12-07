'use client'

import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2Icon, PlusIcon, ShoppingCart } from 'lucide-react';
import { Input } from '../ui/input';
import { 
  Product, 
  sizeOptions, 
  standardOptions, 
  prePostOptions,
  Option 
} from '../../app/types/CartForm/Schemas';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductCardProps {
  products: Product[];
  onProductsChange: (products: Product[]) => void;
  onDeleteAll: () => void;
}

type InputChangeHandler = {
  id: string;
  field: keyof Product;
  value: string | number | Option;
};

const ProductCard: React.FC<ProductCardProps> = ({ products, onProductsChange }) => {
  const handleDelete = (id: string): void => {
    const updatedProducts = products.filter(product => product.id !== id);
    onProductsChange(updatedProducts);
  };

  const handleInputChange = ({ id, field, value }: InputChangeHandler): void => {
    const updatedProducts = products.map(product => 
      product.id === id ? { ...product, [field]: value } : product
    );
    onProductsChange(updatedProducts);
  };

  const handleNumberInput = (id: string, field: keyof Product, e: ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value) || 0;
    handleInputChange({ id, field, value });
  };

  const handleTextInput = (id: string, field: keyof Product, e: ChangeEvent<HTMLInputElement>): void => {
    handleInputChange({ id, field, value: e.target.value });
  };

  if (products.length === 0) {
    return (
      <Card className="w-full border-none rounded-sm bg-slate-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">Your Cart is Empty</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="relative">
            <ShoppingCart size={100} className="text-gray-300" />
          </div>
          <p className="text-gray-600 text-center text-xs">
            Please visit the Shop.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-100 rounded-sm border-none p-2 lg:p-4">
      {products.map((product, index) => (
        <Card className='rounded-sm bg-white border-none m-1' key={product.id}>
          {index === 0 || product.name !== products[index - 1].name ? (
            <h2 className="font-bold uppercase p-1">{product.name}</h2>
          ) : null}
          
          <div className="grid p-3 grid-cols-12 content-center justify-center gap-2">
            <div className='flex gap-1 flex-col content-start uppercase col-span-3'>
              <p className='uppercase'>{product.subName}</p>
              <div className='w-18 lg:w-24 h-8 rounded-lg ring-1 ring-gray-400'>
                {product.imageSrc && (
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    layout='responsive'
                    width={100}
                    height={100}
                    className='w-full h-full rounded-lg ring-1 ring-gray-400'
                  />
                )}
              </div>
              <a className="text-left p-0">
                <PlusIcon size={18} className="text-gray-400" />
              </a>
            </div>

            <div className='uppercase col-span-6 flex-col'>
              <div className='p-0 m-0 flex gap-2 flex-col'>
                <div className='flex'>
                  <Select
                    value={product.size.value}
                    onValueChange={(value: string) => {
                      const newSize = sizeOptions.find(size => size.value === value);
                      if (newSize) {
                        handleInputChange({ id: product.id, field: 'size', value: newSize });
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Please Select the Size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizeOptions.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='flex gap-2 flex-col lg:flex-row md:flex-row'>
                  <Select
                    value={product.standard.value}
                    onValueChange={(value: string) => {
                      const newStandard = standardOptions.find(std => std.value === value);
                      if (newStandard) {
                        handleInputChange({ id: product.id, field: 'standard', value: newStandard });
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Standard" />
                    </SelectTrigger>
                    <SelectContent>
                      {standardOptions.map((standard) => (
                        <SelectItem key={standard.value} value={standard.value}>
                          {standard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={product.prePost.value}
                    onValueChange={(value: string) => {
                      const newPrePost = prePostOptions.find(pp => pp.value === value);
                      if (newPrePost) {
                        handleInputChange({ id: product.id, field: 'prePost', value: newPrePost });
                      }
                    }}
                  >
                    <SelectTrigger className="w-full lg:w-1/2 md:w-1/2">
                      <SelectValue placeholder="pre" />
                    </SelectTrigger>
                    <SelectContent>
                      {prePostOptions.map((prePost) => (
                        <SelectItem key={prePost.value} value={prePost.value}>
                          {prePost.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='flex gap-1'>
                  <Input
                    type="text"
                    placeholder="quality"
                    value={product.quality}
                    onChange={(e) => handleTextInput(product.id, 'quality', e)}
                  />
                  <Input
                    type='number'
                    className='w-1/2'
                    placeholder='20'
                    value={product.quantity}
                    onChange={(e) => handleNumberInput(product.id, 'quantity', e)}
                  />
                </div>
              </div>
            </div>

            <div className='uppercase col-span-2 flex flex-col justify-between'>
              <Input
                type="number"
                value={product.rate}
                onChange={(e) => handleNumberInput(product.id, 'rate', e)}
              />
              <p className='text-gray-300 font-bold p-1 m-1'>@{product.price}</p>
            </div>

            <div className='flex justify-center content-center'>
              <a
                onClick={() => handleDelete(product.id)}
                className="text-center hover:rounded-full hover:bg-gray-200 transition duration-200 ease-in-out p-2"
              >
                <Trash2Icon className="h-4 w-4 text-gray-600 hover:text-gray-900" />
              </a>
            </div>
          </div>
        </Card>
      ))}
    </Card>
  );
};

export default ProductCard;