import z from "zod";

export const variantsLocalizationSchema = z.object({
    variants: z.array(
        z.object({
            variant_id: z.string(),
            title: z.string(),
        })
    ),
});

export const productLocalizationSchema = z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    material: z.string(),
});

export const categoryLocalizationSchema = z.object({
    name: z.string(),
    description: z.string(),
});

export const collectionLocalizationSchema = z.object({
    title: z.string(),
});

export type ProductLocalizationSchemaType = z.infer<
    typeof productLocalizationSchema
>;

export type VariantsLocalizationSchemaType = z.infer<
    typeof variantsLocalizationSchema
>;

export type CategoryLocalizationSchemaType = z.infer<
    typeof categoryLocalizationSchema
>;

export type CollectionLocalizationSchemaType = z.infer<
    typeof collectionLocalizationSchema
>;
