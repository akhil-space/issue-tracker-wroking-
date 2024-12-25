// 'use client';
import React from 'react'
import IssueForm from '../../_component/IssueForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

// const IssueForm = dynamic( 
//     ()=> import('@/app/issues/_component/IssueForm'),
//     {
//         ssr: false,
//         loading: ()=> <p>Loading ...</p>
//     }
// )

const EditIssuePage = async( { params }: { params: Promise<{ id: string }> }) => {

const paramsId = await params;
  const issue =  await prisma.issue.findUnique({
        where : {
            id: parseInt(paramsId.id)
        }
    })

if(!issue) notFound();
    return (
       <IssueForm issue={issue}/>
    )
}

export default EditIssuePage
