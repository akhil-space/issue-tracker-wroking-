import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueBtn from './EditIssueBtn'
import IssueDetailsComponent from './IssueDetailsComponent'
import DeleteIssueBtn from './DeleteIssueBtn'
import { getServerSession } from 'next-auth'
import AuthOptions from '@/app/auth/authOptions'
import AssineeSelect from './AssineeSelect'
import { cache } from 'react'
interface Props{
    params : Promise<{ id :string}>
}

const fethcUser = cache((issueId :number)=> prisma.issue.findUnique({where:{id:issueId}}))
const IssueDetails = async ({ params }: Props ) => {

  
  const session = await getServerSession(AuthOptions); 
  const paramsId = await params;


  const issue = await fethcUser(parseInt(paramsId.id))

  // const issue = await prisma.issue.findUnique({
  //   where: {
  //     id: parseInt(paramsId.id)
  //   }
  // })

  if (!issue)
    return notFound()

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">

      <Box className='md:col-span-4'>
        <IssueDetailsComponent issue={issue} />
      </Box>
     
     {
      session && <Box>
      <Flex direction="column" gap="4">
        <AssineeSelect issue={issue}/>
        <EditIssueBtn issueId={issue.id} />
        <DeleteIssueBtn issueId={issue.id} />
      </Flex>
    </Box>
     }
      
    </Grid>

  )
}

export default IssueDetails


export async function generateMetadata({params} : Props) {
const paramsId = await params;
 const issue=  await fethcUser(parseInt(paramsId.id))
  
  return {
    title:issue?.title,
    description :"Details of issue" +issue?.id
  }
}