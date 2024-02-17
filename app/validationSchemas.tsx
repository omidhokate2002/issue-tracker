import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(155),
  description: z.string().min(1, "Description is required.").max(65535),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(155).optional(),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "Assigned to user id is required.")
    .max(155)
    .optional()
    .nullable(),
});
