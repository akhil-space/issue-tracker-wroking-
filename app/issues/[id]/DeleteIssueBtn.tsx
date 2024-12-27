'use client';
import { Spinner } from '@/app/components';
import { AlertDialog, Button, Flex, Link } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueBtn = ({ issueId }: { issueId: number }) => {
    const[error , setError]=useState(false);
 const [isDeleting , setIsDeleting]= useState(false);
  const router = useRouter();

  async function handleDelete() {
    try{
      setIsDeleting(true)
      const result = await axios.delete(`/api/issues/${issueId}`);
      console.log("Result :", result);
      router.push('/issues/list')
    }catch(err){
      setIsDeleting(false)
setError(true);
console.log("error :" , err);

    }
  }



  return (
    <>
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red' disabled={isDeleting}>Delete Issue   {isDeleting && <Spinner/>}</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title> Confirm Deletetion</AlertDialog.Title>

        <AlertDialog.Description> Are you sure , want to delete it </AlertDialog.Description>

        <Flex mt="4" gap={"3"}>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'>  Cancel</Button>
          </AlertDialog.Cancel>

          <AlertDialog.Action>
            <Button color='red' onClick={() => handleDelete()}>
              {/* <Link href={`/issues/${issueId}/delete`}> Delete</Link>  */}
              delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>


    </AlertDialog.Root>

    <AlertDialog.Root open={error}>

      <AlertDialog.Content>
        <AlertDialog.Title> Error</AlertDialog.Title>
      <AlertDialog.Description>
        Opps something is not right ... we areworking on it
      </AlertDialog.Description>
      <Button color='gray' variant='soft' mt={"2"} onClick={()=> setError(false)}> Ok</Button>
      </AlertDialog.Content>
    </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueBtn
