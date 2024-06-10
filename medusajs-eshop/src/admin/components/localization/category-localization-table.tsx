import { useState } from "react";
import { ProductCategory } from "@medusajs/medusa";
import { Button, Heading, Table } from "@medusajs/ui";
import useGetCategories, {
    CATEGORIES_LIMIT,
} from "../../hooks/useGetCategories";
import useGetRegions from "../../hooks/useGetRegions";
import Loading from "../shared/loading";
import Error from "../shared/error";

type CategoryLocalizationTableProps = {
    onLocalizeCategory: (category: ProductCategory, regionId: string) => void;
};

const CategoryLocalizationTable = ({
    onLocalizeCategory,
}: CategoryLocalizationTableProps) => {
    const [page, setPage] = useState(0);

    const {
        data: regions,
        isLoading: regionsLoading,
        isError: regionsError,
    } = useGetRegions();

    const {
        data: categoriesData,
        isLoading: categoriesLoading,
        isError: categoriesError,
    } = useGetCategories(page);

    if (regionsLoading || categoriesLoading) {
        return <Loading />;
    }

    if (regionsError || categoriesError) {
        return <Error />;
    }

    const pageCount = Math.ceil(categoriesData.count / CATEGORIES_LIMIT);

    return (
        <div>
            <Heading level="h2" className="pb-4">
                Categories
            </Heading>
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
                    {categoriesData.product_categories.map((category) => {
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
            <Table.Pagination
                count={categoriesData.count}
                pageSize={CATEGORIES_LIMIT}
                pageIndex={page}
                pageCount={pageCount}
                canPreviousPage={page > 0}
                canNextPage={page < pageCount - 1}
                nextPage={() => setPage((prevPage) => prevPage + 1)}
                previousPage={() => setPage((prevPage) => prevPage - 1)}
            />
        </div>
    );
};

export default CategoryLocalizationTable;
