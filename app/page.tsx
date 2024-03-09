import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import LatestIssue from "./LatestIssue";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma?.issue.count({
    where: { status: "OPEN" },
  });
  const closed = await prisma?.issue.count({
    where: { status: "CLOSED" },
  });
  const inProgress = await prisma?.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  return (
    <div>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="5">
          <IssueSummary open={open} inProgress={inProgress} closed={closed} />
          <IssueChart open={open} inProgress={inProgress} closed={closed} />
        </Flex>
        <LatestIssue />
      </Grid>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
