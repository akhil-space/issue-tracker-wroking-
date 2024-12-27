import z from "zod";

export const schema = z.object({
    title: z.string().min(3),
    description: z.string()
});

export const patchIssueSchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(1, "Description is required").max(65535).optional(),
    assignedToUserId:z.string()
    .min(1, "AssignTOUserId required")
    .max(255)
    .optional()
    .nullable()
    
});
