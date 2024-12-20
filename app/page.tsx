'use client'


import DescriptionCard from '@/components/Cart/DescriptionCard'
import Container from '@/components/Container/Container'
import { Separator } from "@/components/ui/separator"
import React from 'react'
import { Button } from '@/components/ui/button'


const handleSubmit = () => {
  console.log("Form submitted:");
};


const Home = () => {
  return (
    <Container>
      <div className='flex flex-col justify-center content-center align-middle'>
        <h1 className='text-foreground/35 text-center font-extrabold lg:text-xl md:text-lg'>Order #1547</h1>
        <h1 className='text-right font-thin lg:text-xl md:text-lg mb-5'>
          Kadam
        </h1>
      </div>
      <Separator/>
      <DescriptionCard onSubmit={handleSubmit} />
      <div className='lg:space-y-6 p-6'>
      <Button className='w-full py-5 bg-gray-200 rounded-sm' onClick={handleSubmit}>
      save order
    </Button>
      </div>
    </Container>
   
  )
}

export default Home
