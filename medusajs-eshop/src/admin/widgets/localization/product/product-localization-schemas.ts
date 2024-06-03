import z from "zod";

export const VariantsLocalizationSchema = z.object({
    variants: z.array(
        z.object({
            variant_id: z.string(),
            product_id: z.string(),
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

export type ProductLocalizationSchemaType = z.infer<
    typeof ProductLocalizationSchema
>;

export type VariantsLocalizationSchemaType = z.infer<
    typeof VariantsLocalizationSchema
>;
