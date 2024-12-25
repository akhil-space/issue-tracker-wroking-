import { Skeleton } from '@/app/components'
import { Box, Card, Flex } from '@radix-ui/themes'
const IssueDetailsLoadingPage = () => {
  return (
    <Box className='max-w-xl'>
     <Skeleton/>

      <Flex gap={"5"}>
      <Skeleton width={"5rem"}/>

      <Skeleton/>
      </Flex>

    <Card className='prose' mt={"5"}>
    <Skeleton count={3}/>

    </Card>

    
    </Box>
  )
}

export default IssueDetailsLoadingPage
