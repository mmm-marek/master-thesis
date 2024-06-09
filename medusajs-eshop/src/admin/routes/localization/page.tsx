import { RouteConfig } from "@medusajs/admin";
import { GlobeEurope } from "@medusajs/icons";
import { Container, Heading } from "@medusajs/ui";
import CategoryLocalizationTable from "../../components/localization/category-localization-table";
import ProductsLocalizationTable from "../../components/localization/products-localization-table";

const LocalizationPage = () => {
    return (
        <Container>
            <Heading level="h1">Localization</Heading>
            <div className="flex flex-col gap-4">
                <CategoryLocalizationTable
                    onLocalizeCategory={(category, regionId) => {}}
                />
                <ProductsLocalizationTable
                    onLocalizeProduct={(product, regionId) => {}}
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
