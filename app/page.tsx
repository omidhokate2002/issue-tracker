import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";

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
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
    </div>
  );
}
