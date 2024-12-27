import { IssueStatusBadge } from '@/app/components'
import { Issue, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'

interface IssueQuery{
  status: Status; 
  orderBy: keyof Issue; 
  page: string
}
interface Props {
   searchParams : IssueQuery,
    issues : Issue[]
  }
  
const IssueTable = async ( {searchParams ,issues }:Props) => {

  return (
    <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>

            {
              colums.map(colum => <Table.ColumnHeaderCell
                className={colum.className}
                key={colum.value}>
                <Link href={{ query: { ...searchParams, orderBy: colum.value } }}>
                  {colum.label}</Link>
                {colum.value === searchParams.orderBy && <ArrowUpIcon className='inline' />}
              </Table.ColumnHeaderCell>)
            }

          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            issues.map(issue => (
              <Table.Row key={issue.id}>
                <Table.Cell>  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <div className='block md:hidden'><IssueStatusBadge status={issue.status} /></div>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status} /></Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>

      </Table.Root>
  )
}




const colums: {
    label: string,
    value: keyof Issue,
    className?: string
  }[] = [
      { label: 'Issue', value: 'title' },
      { label: 'Status', value: 'status' },
      { label: 'CreatedAt', value: 'createdAt' },

    ]

export const columnNames = colums.map(column => column.value);

export default IssueTable
