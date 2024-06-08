import { RouteConfig } from "@medusajs/admin";
import { GlobeEurope } from "@medusajs/icons";
import { Container, Heading } from "@medusajs/ui";
import CategoryLocalizationTable from "../../components/localization/category-localization-table";

const LocalizationPage = () => {
    return (
        <Container>
            <Heading level="h1">Localization</Heading>
            <CategoryLocalizationTable
                onLocalizeCategory={(category, regionId) => {}}
            />
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
