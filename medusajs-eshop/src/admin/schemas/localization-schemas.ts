import z from "zod";

export const VariantsLocalizationSchema = z.object({
    variants: z.array(
        z.object({
            variant_id: z.string(),
            title: z.string(),
        })
    ),
});

export const ProductLocalizationSchema = z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    handle: z.string(),
    material: z.string(),
});

export const CategoryLocalizationSchema = z.object({
    name: z.string(),
    handle: z.string(),
    description: z.string(),
});

export const CollectionLocalizationSchema = z.object({
    title: z.string(),
    handle: z.string(),
});

export type ProductLocalizationSchemaType = z.infer<
    typeof ProductLocalizationSchema
>;

export type VariantsLocalizationSchemaType = z.infer<
    typeof VariantsLocalizationSchema
>;

export type CategoryLocalizationSchemaType = z.infer<
    typeof CategoryLocalizationSchema
>;

export type CollectionLocalizationSchemaType = z.infer<
    typeof CollectionLocalizationSchema
>;
