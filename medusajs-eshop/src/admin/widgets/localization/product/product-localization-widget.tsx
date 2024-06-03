import { useMutation, useQuery } from "@tanstack/react-query";
import type { WidgetConfig, ProductDetailsWidgetProps } from "@medusajs/admin";
import {
    ProductLocalizationSchemaType,
    VariantsLocalizationSchemaType,
} from "./product-localization-schemas";

import { RegionLocalizationForm } from "./region-localization-form";
import { medusa } from "../../../utils/medusa-helpers";
import VariantsLocalizationForm from "./variants-localization-form";
import { Button, Drawer } from "@medusajs/ui";

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

    const handleProductLocalizationSubmit = (
        regionId: string,
        data: ProductLocalizationSchemaType
    ) => {
        updateProduct({
            regionId,
            ...data,
        });
    };

    const handleVariantsLocalizationSubmit = (
        regionId: string,
        data: VariantsLocalizationSchemaType
    ) => {
        console.log("Data: ", data);
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
                    <Drawer key={region.id}>
                        <Drawer.Trigger asChild>
                            <Button>
                                <h2 className="inter-large-semibold">
                                    Region {region.name}
                                </h2>
                            </Button>
                        </Drawer.Trigger>
                        <Drawer.Content className="w-[700px] right-0">
                            <Drawer.Header>
                                <Drawer.Title>Localize product</Drawer.Title>
                            </Drawer.Header>
                            <Drawer.Body>
                                <RegionLocalizationForm
                                    regionId={region.id}
                                    variants={product.variants}
                                    onSubmit={(data) => {
                                        handleProductLocalizationSubmit(
                                            region.id,
                                            data
                                        );
                                    }}
                                    defaultValues={{
                                        title: defaultValues.title,
                                        subtitle: defaultValues.subtitle,
                                        description: defaultValues.description,
                                        handle: defaultValues.handle,
                                        material: defaultValues.material,
                                    }}
                                />
                                <VariantsLocalizationForm
                                    variants={product.variants}
                                    productId={product.id}
                                    regionId={region.id}
                                    onSubmit={(data) => {
                                        handleVariantsLocalizationSubmit(
                                            region.id,
                                            data
                                        );
                                    }}
                                />
                            </Drawer.Body>
                            <Drawer.Footer>
                                <Drawer.Close asChild>
                                    <Button variant="secondary">Close</Button>
                                </Drawer.Close>
                            </Drawer.Footer>
                        </Drawer.Content>
                    </Drawer>
                );
            })}
        </div>
    );
};

export const config: WidgetConfig = {
    zone: "product.details.after",
};

export default ProductLocalizationWidget;
