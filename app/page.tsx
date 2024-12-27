import prisma from "@/prisma/client";
import IssueSummry from "./IssueSummry";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home () {

  const closed = await prisma.issue.count({
    where:{
      status:'CLOSED'
    }
  })
  const inProgress = await prisma.issue.count({
    where:{
      status:'IN_PROGRESS'
    }
  })
  const open = await prisma.issue.count({
    where:{
      status:'OPEN'
    }
  })
  return (
  <Grid columns={{ initial:"1" , md:"2"}} gap={"5"}>
<Flex direction={"column"} gap={"5"}>
<IssueSummry open={open} inProgress={inProgress} closed={closed}/>
  <IssueChart open={open} inProgress={inProgress} closed={closed}/>
 
</Flex>
<LatestIssues/>
  </Grid>
);
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues'
};