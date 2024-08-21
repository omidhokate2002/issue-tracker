import { Container, Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import LatestIssue from "./LatestIssue";
import { Metadata } from "next";
// @ts-ignore
import getRandomQuote from "amazing-quotes"

const quote = getRandomQuote();

export const dynamic = "force-dynamic";

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  const inProgress = await prisma.issue.count({
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
      <Container className="max-w-4xl mx-auto my-8 bg-white rounded-none shadow-md overflow-hidden">
        <div className="flex">
          <div className="w-2 bg-[#6e56cf]"></div>
          <div className="flex-1 p-8 sm:p-12">
            <div className="mb-6">
              <svg className="w-10 h-10 text-[#6e56cf]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <blockquote className="mb-8">
              <p className="text-xl sm:text-2xl font-light leading-relaxed text-gray-800">{quote.text}</p>
            </blockquote>
            <cite className="block text-right">
              <span className="font-semibold text-gray-900 not-italic"> - {quote.author}</span>
            </cite>
          </div>
        </div>
      </Container>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
