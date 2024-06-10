import { GlobeEurope } from "@medusajs/icons";
import { Container, Heading } from "@medusajs/ui";
import { RouteConfig, RouteProps } from "@medusajs/admin";
import CategoryLocalizationTable from "../../components/localization/category-localization-table";
import ProductsLocalizationTable from "../../components/localization/products-localization-table";

const LocalizationPage = ({ notify }: RouteProps) => {
    return (
        <Container>
            <Heading level="h1" className="pb-large">
                Localization
            </Heading>
            <div className="flex flex-col gap-6">
                <CategoryLocalizationTable notify={notify} />
                <ProductsLocalizationTable notify={notify} />
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
