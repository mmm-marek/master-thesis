import { useMutation, useQuery } from "@tanstack/react-query";
import type { WidgetConfig, ProductDetailsWidgetProps } from "@medusajs/admin";
import { ProductLocalizationSchemaType } from "./product-localization-schemas";

import { RegionLocalizationForm } from "./region-localization-form";
import { medusa } from "../../../utils/medusa-helpers";

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
        onError: () => {
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
                            variants={product.variants}
                            onSubmit={(data) => {
                                handleSubmit(region.id, data);
                            }}
                            defaultValues={{
                                title: defaultValues.title,
                                subtitle: defaultValues.subtitle,
                                description: defaultValues.description,
                                handle: defaultValues.handle,
                                material: defaultValues.material,
                                variants: defaultValues.variants,
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
