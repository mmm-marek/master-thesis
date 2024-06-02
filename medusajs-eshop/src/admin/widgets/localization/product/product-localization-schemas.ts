import z from "zod";

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
