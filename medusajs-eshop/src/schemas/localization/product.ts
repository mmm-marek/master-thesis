import z from "zod";

export const getProductLocalizationSchema = z.object({
    product_id: z.string().min(1),
    language_code: z.string().min(1).max(5),
});

export const putProductLocalizationSchema = z.object({
    product_id: z.string().min(1),
    language_code: z.string().min(1).max(5),
    title: z.string().min(1),
    subtitle: z.string(),
    description: z.string(),
    material: z.string(),
});

export const deleteProductLocalizationSchema = z.object({
    product_id: z.string().min(1),
    language_code: z.string().min(1).max(5),
});

export type GetProductLocalizationSchemaFields = z.infer<
    typeof getProductLocalizationSchema
>;

export type PutProductLocalizationSchemaFields = z.infer<
    typeof putProductLocalizationSchema
>;

export type DeleteProductLocalizationSchemaFields = z.infer<
    typeof deleteProductLocalizationSchema
>;
