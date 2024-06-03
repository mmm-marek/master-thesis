import { Product, ProductVariant } from "@medusajs/medusa";
import { Button, Input } from "@medusajs/ui";
import {
    VariantsLocalizationSchema,
    VariantsLocalizationSchemaType,
} from "./localization-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { useMutation } from "@tanstack/react-query";
import { medusa } from "../../../utils/medusa-helpers";
import { title } from "process";

type VariantsLocalizationFormProps = {
    product: PricedProduct;
    regionId: string;
    onSuccess: () => void;
    onError: () => void;
};

const VariantsLocalizationForm = ({
    product,
    regionId,
    onSuccess,
    onError,
}: VariantsLocalizationFormProps) => {
    const { register, handleSubmit } = useForm<VariantsLocalizationSchemaType>({
        resolver: zodResolver(VariantsLocalizationSchema),
        defaultValues: {
            variants: product.variants.map((variant) => ({
                variant_id: variant.id,
                title: variant.metadata?.localization?.[regionId]?.title,
            })),
        },
    });

    const { mutate: updateVariants } = useMutation({
        mutationFn: async (data: VariantsLocalizationSchemaType) => {
            const promises = data.variants.map((variant) => {
                const previousLocalizationData =
                    (product.variants.find((v) => v.id === variant.variant_id)
                        ?.metadata?.localization as {}) ?? {};

                return medusa.admin.products.updateVariant(
                    product.id,
                    variant.variant_id,
                    {
                        metadata: {
                            localization: {
                                ...(previousLocalizationData || {}),
                                [regionId]: {
                                    title: variant.title,
                                },
                            },
                        },
                    }
                );
            });
            const res = await Promise.all(promises);
            return res;
        },
    });

    const onSubmitHandler = (data: VariantsLocalizationSchemaType) => {
        updateVariants(data, {
            onSuccess,
            onError,
        });
    };

    return (
        <>
            <h4 className="inter-large-semibold">Variants</h4>
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmitHandler)}>
                {product.variants.map((variant, index) => (
                    <div key={index}>
                        <label
                            className="text-grey-90 inter-xsmall-semibold"
                            htmlFor={`${regionId}-variants.${index}.title`}>
                            Variant {variant.title}
                        </label>
                        <Input
                            id={`${regionId}-variants.${index}.title`}
                            {...register(`variants.${index}.title`)}
                            placeholder={"Title"}
                        />
                        <input
                            type="hidden"
                            {...register(`variants.${index}.variant_id`)}
                            value={variant.id}
                        />
                    </div>
                ))}
                <div className="w-full flex justify-end">
                    <Button type="submit" size="large">
                        Save
                    </Button>
                </div>
            </form>
        </>
    );
};

export default VariantsLocalizationForm;
