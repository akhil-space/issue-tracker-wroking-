'use client'
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Skeleton from '@/app/components/Skeleton'
import toast, { Toaster } from 'react-hot-toast';
const AssineeSelect = ({ issue }: { issue: Issue }) => {

  const { isLoading, error, data: users } = useUsers();
  const assignIssue = (userId: any) => {
 console.log( "Triger first time :", userId);

    axios.patch("/api/issues/" + issue.id, {
      assignedToUserId: userId ==="unassign" ? null : userId
    })
      .catch((err) => {
        toast.error("Changes could not be saved.");
        console.log("error : ", err);

      })
  }
  if (isLoading) {
    return <Skeleton />
  }
  if (error) {
    return null
  }
  return (
//   defaultValue={issue.assignedToUserId || ""}
   
<>
<Select.Root
     
      onValueChange={assignIssue}
    >

      <Select.Trigger placeholder='Assinees' />
      <Select.Content>
        <Select.Group>
          <Select.Label> suggestions  </Select.Label>
          <Select.Item value="unassign">Unassigned</Select.Item>
          {
            users?.map((user) =>
              <Select.Item key={user.id}
                value={user.id }>
                {user.name}</Select.Item>)
          }
        </Select.Group>
      </Select.Content>
    </Select.Root>  
    <Toaster />
    </>
  )
}


const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>('/api/users').then((res) => res.data),
    staleTime: 60 * 1000, //this is for caching  if user come withing 60 seconds it give  data within caches memory 
    retry: 3 //after firs failed request , it will retry till count --- in this case 3 
  });

export default AssineeSelect
