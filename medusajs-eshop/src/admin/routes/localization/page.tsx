import { RouteConfig, RouteProps } from "@medusajs/admin";
import { GlobeEurope } from "@medusajs/icons";
import { Container, Heading } from "@medusajs/ui";
import CategoryLocalizationTable from "../../components/localization/category-localization-table";
import ProductsLocalizationTable from "../../components/localization/products-localization-table";

type NotificationType = "category" | "product";

const LocalizationPage = ({ notify }: RouteProps) => {
    const handleSuccess = (type: NotificationType) => {
        notify.success("success", `${type} localization updated`);
    };

    const handleError = (type: NotificationType) => {
        notify.error("error", `${type} localization update failed`);
    };

    return (
        <Container>
            <Heading level="h1" className="pb-large">
                Localization
            </Heading>
            <div className="flex flex-col gap-6">
                <CategoryLocalizationTable
                    onError={() => handleError("category")}
                    onSuccess={() => handleSuccess("category")}
                />
                <ProductsLocalizationTable
                    onSuccess={() => handleSuccess("product")}
                    onError={() => handleError("product")}
                />
            </div>
        </Container>
    );
};

export const config: RouteConfig = {
    link: {
        label: "Localization",
        icon: GlobeEurope,
    },
};

export default LocalizationPage;
