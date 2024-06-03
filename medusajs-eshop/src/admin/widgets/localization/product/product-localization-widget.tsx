import { useMutation, useQuery } from "@tanstack/react-query";
import type { WidgetConfig, ProductDetailsWidgetProps } from "@medusajs/admin";
import {
    ProductLocalizationSchemaType,
    VariantsLocalizationSchemaType,
} from "./localization-schemas";

import { ProductLocalizationForm } from "./product-localization-form";
import { medusa } from "../../../utils/medusa-helpers";
import VariantsLocalizationForm from "./variants-localization-form";
import { Button, Drawer } from "@medusajs/ui";
import useGetRegions from "../../../hooks/useGetRegions";

const ProductLocalizationWidget = ({
    product,
    notify,
}: ProductDetailsWidgetProps) => {
    const { data: regions } = useGetRegions();

    const handleSuccess = () => {
        notify.success("success", "Product localization updated");
    };

    const handleError = () => {
        notify.error("error", "Product localization update failed");
    };

    return (
        <div className="bg-white p-8 border border-gray-200 rounded-lg">
            <h1 className="text-grey-90 inter-xlarge-semibold">Localization</h1>
            {regions?.map((region) => {
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
                                <ProductLocalizationForm
                                    product={product}
                                    regionId={region.id}
                                    onSuccess={handleSuccess}
                                    onError={handleError}
                                />
                                <VariantsLocalizationForm
                                    product={product}
                                    regionId={region.id}
                                    onSuccess={handleSuccess}
                                    onError={handleError}
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
