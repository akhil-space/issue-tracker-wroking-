'use client'
import React from 'react'
// import IssueForm from '../_component/IssueForm'
import dynamic from 'next/dynamic'
import IssueScheletonForm from '../_component/IssueScheletonForm';
import { Metadata } from 'next';

const IssueForm = dynamic(
  ()=>import('@/app/issues/_component/IssueForm'),
{
  ssr: false,
  loading: ()=> <IssueScheletonForm/>

});

const NewIssuePage = () => {
  return (
   <IssueForm/>
  )
}

export default NewIssuePage
