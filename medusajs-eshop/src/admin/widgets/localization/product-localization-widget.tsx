import { Container } from "@medusajs/ui";
import { useQueryClient } from "@tanstack/react-query";
import type { WidgetConfig, ProductDetailsWidgetProps } from "@medusajs/admin";
import { QUERY_KEYS } from "../../utils/queryKeys";
import useGetRegions from "../../hooks/useGetRegions";
import useGetProduct from "../../hooks/useGetProduct";
import LocalizationDrawer from "../../components/localization/localization-drawer";
import ProductLocalizationForm from "../../components/localization/product-localization-form";
import VariantsLocalizationForm from "../../components/localization/variants-localization-form";
import Loading from "../../components/shared/loading";
import Error from "../../components/shared/error";

const ProductLocalizationWidget = ({
    product,
    notify,
}: ProductDetailsWidgetProps) => {
    const queryClient = useQueryClient();
    const { data: regions } = useGetRegions();

    const {
        data: pricedProduct,
        isLoading,
        isError,
    } = useGetProduct(product.id);

    const handleSuccess = () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.API_GET_PRODUCT],
        });
        notify.success("success", "Product localization updated");
    };

    const handleError = () => {
        notify.error("error", "Product localization update failed");
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <Error />;
    }

    return (
        <Container>
            <h1 className="text-grey-90 inter-xlarge-semibold">Localization</h1>
            <div className="flex gap-4 flex-wrap">
                {regions?.map((region) => {
                    return (
                        <LocalizationDrawer
                            key={region.id}
                            title={`Localize ${product.title}`}
                            subtitle={`Region ${region.name}`}
                            triggerText={region.name}
                            form={
                                <>
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
                                </>
                            }
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
