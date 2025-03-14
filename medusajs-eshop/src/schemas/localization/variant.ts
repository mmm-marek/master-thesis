import z from "zod";

export const getVariantLocalizationSchema = z.object({
    variant_ids: z.array(z.string().min(1)),
    language_code: z.string().min(1).max(5),
});

export const putVariantLocalizationSchema = z.object({
    variants: z.array(
        z.object({
            variant_id: z.string().min(1),
            title: z.string().min(1),
        })
    ),
    language_code: z.string().min(1).max(5),
});

export const deleteVariantLocalizationSchema = z.object({
    variant_id: z.string().min(1),
    language_code: z.string().min(1).max(5),
});

export type GetVariantLocalizationSchemaFields = z.infer<
    typeof getVariantLocalizationSchema
>;

export type PutVariantLocalizationSchemaFields = z.infer<
    typeof putVariantLocalizationSchema
>;

export type DeleteVariantLocalizationSchemaFields = z.infer<
    typeof deleteVariantLocalizationSchema
>;
