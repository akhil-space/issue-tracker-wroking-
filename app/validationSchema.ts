import z from "zod";

export const schema = z.object({
    title: z.string().min(3),
    description: z.string()
});
