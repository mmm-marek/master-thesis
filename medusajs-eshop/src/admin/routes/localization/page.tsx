import { GlobeEurope } from "@medusajs/icons";
import { Container, Heading, Tabs } from "@medusajs/ui";
import { RouteConfig, RouteProps } from "@medusajs/admin";
import CategoryLocalizationTable from "../../components/localization/category-localization-table";
import ProductsLocalizationTable from "../../components/localization/products-localization-table";
import CollectionLocalizationTable from "../../components/localization/collection-localization-table";

const LocalizationPage = ({ notify }: RouteProps) => {
    return (
        <Container>
            <Heading level="h1" className="pb-large">
                Localization
            </Heading>
            <Tabs defaultValue="products">
                <Tabs.List>
                    <Tabs.Trigger value="products">Products</Tabs.Trigger>
                    <Tabs.Trigger value="categories">Categories</Tabs.Trigger>
                    <Tabs.Trigger value="collections">Collections</Tabs.Trigger>
                </Tabs.List>
                <div className="mt-4">
                    <Tabs.Content value="products">
                        <ProductsLocalizationTable notify={notify} />
                    </Tabs.Content>
                    <Tabs.Content value="categories">
                        <CategoryLocalizationTable notify={notify} />
                    </Tabs.Content>
                    <Tabs.Content value="collections">
                        <CollectionLocalizationTable notify={notify} />
                    </Tabs.Content>
                </div>
            </Tabs>
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
