'use client';
import { ErrorMessage, Spinner } from '@/app/components';
import { schema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";

import { useRouter } from 'next/navigation';
import { useState } from 'react';;
import { Controller, useForm } from 'react-hook-form';

import { z } from 'zod';
// const SimpleMDE = dynamic(
  // () => import('react-simplemde-editor'),
  // { ssr: false }
// 
// 
// )
// 

import SimpleMDE from 'react-simplemde-editor';

type IssueFormData = z.infer<typeof schema>;
// interface IssueForm {
//   title: string;
//   description: string;
// }
// interface Props {
  // issue?: Issue
// }
const IssueForm = ({ issue }: { issue?: Issue }) => {

  const router = useRouter();
  const [isSubmiting, setSubmitting] = useState(false);
  const { register, control, handleSubmit, formState: { errors } } =
    useForm<IssueFormData>(
      {
        resolver: zodResolver(schema)

      }
    );


  // console.log("ragister :", register);
  const [error, setError] = useState('');


  return (

    <div>
      {error && <Callout.Root color='red'>
        <Callout.Text> {error}</Callout.Text>
      </Callout.Root>}
      <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {
        try {
          // console.log("data:", data);
          if (issue) await axios.patch(`/api/issues/${issue.id}`, data)
          else await axios.post('/api/issues', data);
          setSubmitting(true);
          router.push('/issues/list')
        } catch (error) {
          console.log(error);
          setError('Form cannot be empty');
        }


      })}>
        <TextField.Root defaultValue={issue?.title} placeholder='Title' {...register('title')}>

          {/* <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} /> */}

        </TextField.Root>
        {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller name='description'
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Decription' {...field} />} />

        {<ErrorMessage> {errors.description?.message}</ErrorMessage>}

        <Button disabled={isSubmiting}>
          {issue ? "Update Issue" : "Submit new issue"} {'  '}
          {isSubmiting && <Spinner />}</Button>
      </form>
    </div>

  )
}

export default IssueForm
