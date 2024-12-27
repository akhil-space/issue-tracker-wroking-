import Pagination from '@/app/components/Pagination'
import prisma from '@/prisma/client'
import { Issue, Status } from '@prisma/client'
import IssueActions from './IssueActions'
import IssueTable, { columnNames as colums } from './IssueTable'
import { Metadata } from 'next'

interface Props{
  searchParams : Promise<{
    status: Status; 
    orderBy: keyof Issue; 
    page: string
  }>
}

const IssuePage = async (   {searchParams}: Props) => {


  const searchParamsAsync = await searchParams;  
  const statues = Object.values(Status);
  const status = statues.includes(searchParamsAsync.status) ? searchParamsAsync.status : undefined;
  const where = { status };
 
  const orderBy = colums
    .includes(searchParamsAsync.orderBy)
    ? { [searchParamsAsync.orderBy]: 'asc' }
    : undefined;
  const page = parseInt(searchParamsAsync.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany(
    {
      where,
      orderBy,
      skip: (page - 1) * pageSize
    },

  );
  const issuecount = await prisma.issue.count({ where })

  return (
    <div>
      <IssueActions />
      <IssueTable  searchParams={searchParamsAsync} issues ={issues}/>
      <Pagination pageSize={pageSize} currentPage={page}

        ItemCount={issuecount} />
    </div>
  )
}

export default IssuePage;
// export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = {
  title: 'Issue List ',
  description: 'View a summary of project issues'
};