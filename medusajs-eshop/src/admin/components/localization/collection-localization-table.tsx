import { useState } from "react";
import { RouteProps } from "@medusajs/admin";
import { Heading, Table } from "@medusajs/ui";
import { useQueryClient } from "@tanstack/react-query";
import useGetCollections, {
    COLLECTIONS_LIMIT,
} from "../../hooks/useGetCollections";
import useGetRegions from "../../hooks/useGetRegions";
import Loading from "../shared/loading";
import Error from "../shared/error";
import { QUERY_KEYS } from "../../utils/queryKeys";
import LocalizationDrawer from "./localization-drawer";
import CollectionLocalizationForm from "./collection-localization-form";

type CollectionLocalizationTableProps = {
    notify: RouteProps["notify"];
};

const CollectionLocalizationTable = ({
    notify,
}: CollectionLocalizationTableProps) => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(0);

    const {
        data: regions,
        isLoading: regionsLoading,
        isError: regionsError,
    } = useGetRegions();

    const {
        data: categoriesData,
        isInitialLoading: collectionsLoading,
        isError: collectionsError,
    } = useGetCollections(page);

    if (regionsLoading || collectionsLoading) {
        return <Loading />;
    }

    if (regionsError || collectionsError) {
        return <Error />;
    }

    const handleSuccess = () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.API_GET_COLLECTIONS],
        });
        notify.success("success", "category localization updated");
    };

    const handleError = () => {
        notify.error("error", "category localization update failed");
    };

    const pageCount = Math.ceil(categoriesData.count / COLLECTIONS_LIMIT);

    return (
        <div>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell className="w-[350px]">
                            Title
                        </Table.HeaderCell>
                        <Table.HeaderCell>Handle</Table.HeaderCell>
                        <Table.HeaderCell className="w-[200px]">
                            Regions
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {categoriesData.collections.map((collection) => {
                        return (
                            <Table.Row key={collection.id}>
                                <Table.Cell className="truncate max-w-[350px]">
                                    {collection.title}
                                </Table.Cell>
                                <Table.Cell>{collection.handle}</Table.Cell>
                                <Table.Cell className="flex gap-4 flex-wrap py-1">
                                    {regions.map((region) => {
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
                                                        onSuccess={
                                                            handleSuccess
                                                        }
                                                        onError={handleError}
                                                    />
                                                }
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
                pageSize={COLLECTIONS_LIMIT}
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

export default CollectionLocalizationTable;
