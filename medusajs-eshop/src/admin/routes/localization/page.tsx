import { RouteConfig, RouteProps } from "@medusajs/admin";
import { GlobeEurope } from "@medusajs/icons";
import { Container, Heading } from "@medusajs/ui";
import CategoryLocalizationTable from "../../components/localization/category-localization-table";
import ProductsLocalizationTable from "../../components/localization/products-localization-table";

const LocalizationPage = ({ notify }: RouteProps) => {
    const handleSuccess = () => {
        notify.success("success", "Product localization updated");
    };

    const handleError = () => {
        notify.error("error", "Product localization update failed");
    };

    return (
        <Container>
            <Heading level="h1" className="pb-large">
                Localization
            </Heading>
            <div className="flex flex-col gap-6">
                <CategoryLocalizationTable
                    onLocalizeCategory={(category, regionId) => {}}
                />
                <ProductsLocalizationTable
                    onSuccess={handleSuccess}
                    onError={handleError}
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
