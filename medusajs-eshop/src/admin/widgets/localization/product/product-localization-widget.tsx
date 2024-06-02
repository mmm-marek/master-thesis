import { Input, Button } from "@medusajs/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { WidgetConfig, ProductDetailsWidgetProps } from "@medusajs/admin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ProductLocalizationSchema,
    ProductLocalizationSchemaType,
} from "./product-localization-schemas";

import Medusa from "@medusajs/medusa-js";

const medusa = new Medusa({ baseUrl: "http://localhost:9000", maxRetries: 3 });

type RegionLocalizationFormProps = {
    regionId;
    onSubmit: (data: ProductLocalizationSchemaType) => void;
    defaultValues: Partial<ProductLocalizationSchemaType>;
};

const RegionLocalizationForm = ({
    regionId,
    onSubmit,
    defaultValues,
}: RegionLocalizationFormProps) => {
    const { register, handleSubmit } = useForm<ProductLocalizationSchemaType>({
        resolver: zodResolver(ProductLocalizationSchema),
        defaultValues,
    });

    const onSubmitHandler = (data: ProductLocalizationSchemaType) => {
        onSubmit(data);
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
                <Input
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

const ProductLocalizationWidget = ({
    product,
    notify,
}: ProductDetailsWidgetProps) => {
    const { data: regions } = useQuery({
        queryKey: ["regions"],
        queryFn: async () => {
            const { regions } = await medusa.admin.regions.list();
            return regions;
        },
    });

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
        onSuccess: () => {
            notify.success("success", "Product localization updated");
        },
        onError: (error) => {
            notify.error("error", "Product localization update failed");
        },
    });

    const handleSubmit = (
        regionId: string,
        data: ProductLocalizationSchemaType
    ) => {
        updateProduct({
            regionId,
            ...data,
        });
    };

    const getDefaultValues = (regionId: string) => {
        const localization = product.metadata?.localization;
        if (localization && localization[regionId]) {
            return localization[regionId];
        }
        return {};
    };

    return (
        <div className="bg-white p-8 border border-gray-200 rounded-lg">
            <h1 className="text-grey-90 inter-xlarge-semibold">Localization</h1>
            {regions?.map((region) => {
                const defaultValues = getDefaultValues(region.id);

                return (
                    <div key={region.id} className="mb-base">
                        <h2 className="inter-large-semibold">
                            Region {region.name}
                        </h2>
                        <RegionLocalizationForm
                            regionId={region.id}
                            onSubmit={(data) => {
                                handleSubmit(region.id, data);
                            }}
                            defaultValues={{
                                title: defaultValues.title,
                                subtitle: defaultValues.subtitle,
                                description: defaultValues.description,
                                handle: defaultValues.handle,
                                material: defaultValues.material,
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export const config: WidgetConfig = {
    zone: "product.details.after",
};

export default ProductLocalizationWidget;
