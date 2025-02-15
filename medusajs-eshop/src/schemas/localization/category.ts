import z from "zod";

export const getCategoryLocalizationSchema = z.object({
    category_id: z.string().min(1),
    language_code: z.string().min(1).max(5),
});

export const putCategoryLocalizationSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
    category_id: z.string().min(1),
    language_code: z.string().min(1).max(5),
});

export const deleteCategoryLocalizationSchema = z.object({
    category_id: z.string().min(1),
    language_code: z.string().min(1).max(5),
});

export type GetCategoryLocalizationSchemaFields = z.infer<
    typeof getCategoryLocalizationSchema
>;

export type PutCategoryLocalizationSchemaFields = z.infer<
    typeof putCategoryLocalizationSchema
>;

export type DeleteCategoryLocalizationSchemaFields = z.infer<
    typeof deleteCategoryLocalizationSchema
>;
