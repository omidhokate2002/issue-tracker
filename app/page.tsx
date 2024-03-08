import { open } from "fs";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";

export default async function Home() {
  const open = await prisma?.issue.count({
    where: { status: "OPEN" },
  });
  const closed = await prisma?.issue.count({
    where: { status: "CLOSED" },
  });
  const in_Progress = await prisma?.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  return (
    <div>
      <IssueSummary open={open} inProgress={in_Progress} closed={closed} />
    </div>
  );
}
