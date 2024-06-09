import { Container } from "@medusajs/ui";
import { useQueryClient } from "@tanstack/react-query";
import type { WidgetConfig, ProductDetailsWidgetProps } from "@medusajs/admin";
import { QUERY_KEYS } from "../../utils/queryKeys";
import useGetRegions from "../../hooks/useGetRegions";
import useGetProduct from "../../hooks/useGetProduct";
import ProductLocalizationDrawer from "../../components/localization/product-localization-drawer";

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
                        <ProductLocalizationDrawer
                            key={region.id}
                            product={pricedProduct}
                            region={region}
                            onSuccess={handleSuccess}
                            onError={handleError}
                        />
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
