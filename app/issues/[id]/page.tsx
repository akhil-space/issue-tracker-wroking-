import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueBtn from './EditIssueBtn'
import IssueDetailsComponent from './IssueDetailsComponent'
import DeleteIssueBtn from './DeleteIssueBtn'
// interface Props{
//     params : { id :string} paramsId
// }
const IssueDetails = async ({ params }: { params: Promise<{ id: string }> }) => {

  const paramsId = await params;
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(paramsId.id)
    }
  })

  if (!issue)
    return notFound()

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">

      <Box className='md:col-span-4'>
        <IssueDetailsComponent issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueBtn issueId={issue.id} />
          <DeleteIssueBtn issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>

  )
}

export default IssueDetails
