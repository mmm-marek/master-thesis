import { Button, Heading, Table } from "@medusajs/ui";
import useGetCategories from "../../hooks/useGetCategories";
import useGetRegions from "../../hooks/useGetRegions";
import { ProductCategory } from "@medusajs/medusa";
import Loading from "../shared/loading";
import Error from "../shared/error";

type CategoryLocalizationTableProps = {
    onLocalizeCategory: (category: ProductCategory, regionId: string) => void;
};

const CategoryLocalizationTable = ({
    onLocalizeCategory,
}: CategoryLocalizationTableProps) => {
    const {
        data: regions,
        isLoading: regionsLoading,
        isError: regionsError,
    } = useGetRegions();
    const {
        data: categories,
        isLoading: categoriesLoading,
        isError: categoriesError,
    } = useGetCategories();

    if (regionsLoading || categoriesLoading) {
        return <Loading />;
    }

    if (regionsError || categoriesError) {
        return <Error />;
    }

    return (
        <div>
            <Heading level="h2">Categories</Heading>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Handle</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Regions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {categories.map((category) => {
                        return (
                            <Table.Row key={category.id}>
                                <Table.Cell>{category.name}</Table.Cell>
                                <Table.Cell>{category.handle}</Table.Cell>
                                <Table.Cell className="truncate max-w-[100px]">
                                    {category.description}
                                </Table.Cell>
                                <Table.Cell className="flex gap-4 flex-wrap">
                                    {regions.map((region) => {
                                        return (
                                            <Button
                                                key={region.id}
                                                onClick={() =>
                                                    onLocalizeCategory(
                                                        category,
                                                        region.id
                                                    )
                                                }>
                                                {region.name}
                                            </Button>
                                        );
                                    })}
                                </Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </div>
    );
};

export default CategoryLocalizationTable;
