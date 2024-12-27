'use client';

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Button, Flex ,Text} from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface Props{
    pageSize : number,
    ItemCount : number,
    currentPage : number
}
const Pagination = (
    {pageSize , ItemCount , currentPage} : Props) => {
 const router =   useRouter();
 const searchParams = useSearchParams();
const pageCount = Math.ceil(ItemCount / pageSize) ;
    
const handleChangePage =(page :number)=>{

    const params  = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push('?'+params.toString);

}
  return (
   <Flex>

    <Text>
 Page {currentPage} of {pageCount}
    </Text>
    <Button color='gray' variant='soft'
     disabled={currentPage === 1}
     onClick={()=> handleChangePage(1)}>
        <DoubleArrowLeftIcon/>
    </Button>

    <Button color='gray' variant='soft' 
     onClick={()=> handleChangePage(currentPage -1)}
    disabled={currentPage === 1}>
       <ChevronLeftIcon />
    </Button>
    <Button color='gray' variant='soft'
     onClick={()=> handleChangePage(currentPage +1)}
     disabled={currentPage === pageCount}>
        <ChevronRightIcon/>
    </Button>

    <Button color='gray' variant='soft' 
     onClick={()=> handleChangePage(pageCount)}
    disabled={currentPage === 1}>
        <DoubleArrowRightIcon/>
    </Button>
   </Flex>
  )
}

export default Pagination
