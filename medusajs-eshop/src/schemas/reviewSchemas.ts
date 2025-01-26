import z from "zod";

export const createReviewSchema = z.object({
    title: z.string().min(1),
    user_name: z.string().min(1),
    rating: z.number().int().min(1).max(5),
    content: z.string().min(1),
});

export type CreateReviewSchemaFields = z.infer<typeof createReviewSchema>;
