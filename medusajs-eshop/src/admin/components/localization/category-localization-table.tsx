import { useState } from "react";
import { Heading, Table } from "@medusajs/ui";
import useGetCategories, {
    CATEGORIES_LIMIT,
} from "../../hooks/useGetCategories";
import useGetRegions from "../../hooks/useGetRegions";
import Loading from "../shared/loading";
import Error from "../shared/error";
import CategoryLocalizationDrawer from "./category-localization-drawer";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/queryKeys";

type CategoryLocalizationTableProps = {
    onSuccess: () => void;
    onError: () => void;
};

const CategoryLocalizationTable = ({
    onSuccess,
    onError,
}: CategoryLocalizationTableProps) => {
    const queryClient = useQueryClient();
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

    const handleSuccess = () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.API_GET_CATEGORIES],
        });
        onSuccess();
    };

    const pageCount = Math.ceil(categoriesData.count / CATEGORIES_LIMIT);

    return (
        <div>
            <Heading level="h2" className="pb-4">
                Categories
            </Heading>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell className="w-[350px]">
                            Name
                        </Table.HeaderCell>
                        <Table.HeaderCell>Handle</Table.HeaderCell>
                        <Table.HeaderCell className="w-[200px]">
                            Regions
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {categoriesData.product_categories.map((category) => {
                        return (
                            <Table.Row key={category.id}>
                                <Table.Cell className="truncate max-w-[350px]">
                                    {category.name}
                                </Table.Cell>
                                <Table.Cell>{category.handle}</Table.Cell>
                                <Table.Cell className="flex gap-4 flex-wrap py-1">
                                    {regions.map((region) => {
                                        return (
                                            <CategoryLocalizationDrawer
                                                key={region.id}
                                                category={category}
                                                region={region}
                                                onSuccess={handleSuccess}
                                                onError={onError}
                                            />
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
