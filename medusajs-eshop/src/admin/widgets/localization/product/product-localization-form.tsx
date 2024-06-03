import { useForm } from "react-hook-form";
import {
    ProductLocalizationSchema,
    ProductLocalizationSchemaType,
} from "./localization-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@medusajs/ui";
import { Product, ProductVariant } from "@medusajs/medusa";
import { useMutation } from "@tanstack/react-query";
import { medusa } from "../../../utils/medusa-helpers";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

type RegionLocalizationFormProps = {
    product: PricedProduct;
    regionId: string;
    onSuccess: () => void;
    onError: () => void;
};

export const ProductLocalizationForm = ({
    product,
    regionId,
    onError,
    onSuccess,
}: RegionLocalizationFormProps) => {
    const { mutate: updateProduct } = useMutation({
        mutationFn: async (
            data: ProductLocalizationSchemaType & { regionId: string }
        ) => {
            const { product: newProduct } = await medusa.admin.products.update(
                product.id,
                {
                    metadata: {
                        ...product.metadata,
                        localization: {
                            ...(product.metadata?.localization
                                ? (product.metadata?.localization as {})
                                : {}),
                            [data.regionId]: data,
                        },
                    },
                }
            );
            return newProduct;
        },
        onSuccess,
        onError,
    });

    const getDefaultValues = (regionId: string) => {
        const localization = product.metadata?.localization;
        if (localization && localization[regionId]) {
            return localization[regionId];
        }
        return {};
    };

    const { register, handleSubmit } = useForm<ProductLocalizationSchemaType>({
        resolver: zodResolver(ProductLocalizationSchema),
        defaultValues: getDefaultValues(regionId),
    });

    const onSubmitHandler = (data: ProductLocalizationSchemaType) => {
        updateProduct({
            regionId,
            ...data,
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="flex flex-col gap-4">
            <div>
                <label
                    className="text-grey-90 inter-xsmall-semibold"
                    htmlFor={`${regionId}-title`}>
                    Title
                </label>
                <Input
                    placeholder="Title"
                    {...register("title")}
                    id={`${regionId}-title`}
                />
            </div>
            <div>
                <label
                    className="text-grey-90 inter-xsmall-semibold"
                    htmlFor={`${regionId}-subtitle`}>
                    Subtitle
                </label>
                <Input
                    placeholder="Subtitle"
                    {...register("subtitle")}
                    id={`${regionId}-subtitle`}
                />
            </div>
            <div>
                <label
                    className="text-grey-90 inter-xsmall-semibold"
                    htmlFor={`${regionId}-description`}>
                    Description
                </label>
                <Textarea
                    placeholder="Description"
                    {...register("description")}
                    id={`${regionId}-description`}
                />
            </div>
            <div>
                <label
                    className="text-grey-90 inter-xsmall-semibold"
                    htmlFor={`${regionId}-handle`}>
                    Handle
                </label>
                <Input
                    placeholder="Handle"
                    {...register("handle")}
                    id={`${regionId}-handle`}
                />
            </div>
            <div>
                <label
                    className="text-grey-90 inter-xsmall-semibold"
                    htmlFor={`${regionId}-material`}>
                    Material
                </label>
                <Input
                    placeholder="Material"
                    {...register("material")}
                    id={`${regionId}-material`}
                />
            </div>
            <div className="w-full flex justify-end">
                <Button type="submit" size="large">
                    Save
                </Button>
            </div>
        </form>
    );
};
