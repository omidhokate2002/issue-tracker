import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text, Box, Separator } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { Calendar, Clock } from "lucide-react";

interface IssueDetailsProps {
  issue: Issue;
}

const IssueDetails: React.FC<IssueDetailsProps> = ({ issue }) => {
  return (
    <Box>
      <Heading size="6" mb="3">{issue.title}</Heading>
      <Flex gap="3" align="center" mb="4">
        <IssueStatusBadge status={issue.status} />
        <Flex align="center" gap="1">
          <Calendar size={16} />
          <Text size="2">{issue.createdAt.toLocaleDateString()}</Text>
        </Flex>
        <Flex align="center" gap="1">
          <Clock size={16} />
          <Text size="2">{issue.createdAt.toLocaleTimeString()}</Text>
        </Flex>
      </Flex>
      <Separator size="4" mb="4" />
      <Card className="prose max-w-full">
        <ReactMarkdown className="">
          {issue.description}
        </ReactMarkdown>
      </Card>
    </Box>
  );
};

export default IssueDetails;