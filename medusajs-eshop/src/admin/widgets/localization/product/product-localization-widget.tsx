import type { WidgetConfig, ProductDetailsWidgetProps } from "@medusajs/admin";
import { ProductLocalizationForm } from "./product-localization-form";
import VariantsLocalizationForm from "./variants-localization-form";
import { Button, Container, Drawer } from "@medusajs/ui";
import useGetRegions from "../../../hooks/useGetRegions";
import useGetProduct from "../../../hooks/useGetProduct";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../utils/queryKeys";

const ProductLocalizationWidget = ({
    product,
    notify,
}: ProductDetailsWidgetProps) => {
    const queryClient = useQueryClient();
    const { data: regions } = useGetRegions();

    const { data: pricedProduct } = useGetProduct(product.id);

    const handleSuccess = () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.API_GET_PRODUCT],
        });
        notify.success("success", "Product localization updated");
    };

    const handleError = () => {
        notify.error("error", "Product localization update failed");
    };

    return (
        <Container>
            <h1 className="text-grey-90 inter-xlarge-semibold">Localization</h1>
            <div className="flex gap-4 flex-wrap">
                {regions?.map((region) => {
                    return (
                        <Drawer key={region.id}>
                            <Drawer.Trigger asChild>
                                <Button className="inter-large-semibold">
                                    Region {region.name}
                                </Button>
                            </Drawer.Trigger>
                            <Drawer.Content className="w-[700px] right-0">
                                <Drawer.Header>
                                    <Drawer.Title>
                                        <h2 className="inter-large-semibold">
                                            Localize {product.title}
                                        </h2>
                                        <p className="inter-base-regular">
                                            Region {region.name}
                                        </p>
                                    </Drawer.Title>
                                </Drawer.Header>
                                <Drawer.Body className="overflow-auto">
                                    <ProductLocalizationForm
                                        product={pricedProduct}
                                        regionId={region.id}
                                        onSuccess={handleSuccess}
                                        onError={handleError}
                                    />
                                    <VariantsLocalizationForm
                                        product={pricedProduct}
                                        regionId={region.id}
                                        onSuccess={handleSuccess}
                                        onError={handleError}
                                    />
                                </Drawer.Body>
                                <Drawer.Footer>
                                    <Drawer.Close asChild>
                                        <Button variant="secondary">
                                            Close
                                        </Button>
                                    </Drawer.Close>
                                </Drawer.Footer>
                            </Drawer.Content>
                        </Drawer>
                    );
                })}
            </div>
        </Container>
    );
};

export const config: WidgetConfig = {
    zone: "product.details.after",
};

export default ProductLocalizationWidget;
