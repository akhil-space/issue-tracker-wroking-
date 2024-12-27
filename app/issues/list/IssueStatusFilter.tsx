'use client'
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation';

// import { useRouter } from '';
import React from 'react'

const IssueStatusFilter = () => {
  const router = useRouter()
 const searchPArams = useSearchParams();
  const statuses: { label: string; value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
  ];


  const handleFilter = (status: any) => {
    // console.log("check status :", status);
    // const query = status ? `?status=${status}` : ''
    // router.push('/issues/list' + query);

    const params = new URLSearchParams();

    if(status) params.append('status' , status);
    if(searchPArams.get('orderBy'))
      params.append('orderBy', searchPArams.get('orderBy')!);

    const query = params.size ? '?'+ params.toString()
    : '';

    router.push('/issues/list' + query)


  }


  return (
    <Select.Root 
    defaultValue={searchPArams.get('status') || ''}

    onValueChange={handleFilter}>
      <Select.Trigger placeholder='filter by status' />
      <Select.Content>
        {
          statuses.map(stauts => <Select.Item key={stauts.label} value={stauts.value || "default"}>{stauts.label}</Select.Item>)
        }
      </Select.Content>

    </Select.Root>
  )
}

export default IssueStatusFilter
