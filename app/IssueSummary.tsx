import { Status } from "@prisma/client";
import { Badge, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary: React.FC<Props> = ({ open, inProgress, closed }) => {
  const containers: Array<{
    label: string;
    value: number;
    status: Status;
    color: "red" | "yellow" | "green";
  }> = [
    {
      label: "Open Issues",
      value: open,
      status: "OPEN",
      color: "red",
    },
    {
      label: "In-Progress Issues",
      value: inProgress,
      status: "IN_PROGRESS",
      color: "yellow",
    },
    {
      label: "Closed Issues",
      value: closed,
      status: "CLOSED",
      color: "green",
    },
  ];

  return (
    <Flex gap="4" justify="between">
      {containers.map(({ label, value, status, color }) => (
        <Card key={label} style={{ flex: 1 }}>
          <Flex direction="column" gap="2" align="start">
            <Badge color={color} variant="soft">
              {label}
            </Badge>
            <Text size="6" weight="bold">
              {value}
            </Text>
            <Link
              href={`/issues/list?status=${status}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                fontSize: "14px",
              }}
            >
              View Details
            </Link>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;