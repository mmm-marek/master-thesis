import { Container } from "@medusajs/ui";
import { useQueryClient } from "@tanstack/react-query";
import type {
    WidgetConfig,
    ProductCollectionDetailsWidgetProps,
} from "@medusajs/admin";
import { QUERY_KEYS } from "../../utils/queryKeys";
import useGetRegions from "../../hooks/useGetRegions";
import useGetCollection from "../../hooks/useGetCollection";
import Error from "../../components/shared/error";
import Loading from "../../components/shared/loading";
import LocalizationDrawer from "../../components/localization/localization-drawer";
import CollectionLocalizationForm from "../../components/localization/collection-localization-form";

const ProductLocalizationWidget = ({
    productCollection,
    notify,
}: ProductCollectionDetailsWidgetProps) => {
    const queryClient = useQueryClient();
    const { data: regions } = useGetRegions();

    const {
        data: collection,
        isInitialLoading,
        isError,
    } = useGetCollection(productCollection.id);

    const handleSuccess = () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.API_GET_PRODUCT],
        });
        notify.success("success", "Product localization updated");
    };

    const handleError = () => {
        notify.error("error", "Product localization update failed");
    };

    if (isInitialLoading) {
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
                            title={`Localize ${collection.title}`}
                            subtitle={`Region ${region.name}`}
                            triggerText={region.name}
                            form={
                                <CollectionLocalizationForm
                                    collection={collection}
                                    regionId={region.id}
                                    onSuccess={handleSuccess}
                                    onError={handleError}
                                />
                            }
                        />
                    );
                })}
            </div>
        </Container>
    );
};

export const config: WidgetConfig = {
    zone: "product_collection.details.after",
};

export default ProductLocalizationWidget;
