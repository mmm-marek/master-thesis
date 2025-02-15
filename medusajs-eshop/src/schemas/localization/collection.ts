import z from "zod";

export const getCollectionLocalizationSchema = z.object({
    collection_id: z.string().min(1),
    language_code: z.string().min(1).max(5),
});

export const putCollectionLocalizationSchema = z.object({
    title: z.string().min(1),
    collection_id: z.string().min(1),
    language_code: z.string().min(1).max(5),
});

export const deleteCollectionLocalizationSchema = z.object({
    collection_id: z.string().min(1),
    language_code: z.string().min(1).max(5),
});

export type GetCollectionLocalizationSchemaFields = z.infer<
    typeof getCollectionLocalizationSchema
>;

export type PutCollectionLocalizationSchemaFields = z.infer<
    typeof putCollectionLocalizationSchema
>;

export type DeleteCollectionLocalizationSchemaFields = z.infer<
    typeof deleteCollectionLocalizationSchema
>;
