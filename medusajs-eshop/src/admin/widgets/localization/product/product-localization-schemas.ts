import z from "zod";

export const ProductLocalizationSchema = z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    handle: z.string(),
    material: z.string(),
    variants: z.array(z.object({ variant_id: z.string(), title: z.string() })),
});

export type ProductLocalizationSchemaType = z.infer<
    typeof ProductLocalizationSchema
>;
