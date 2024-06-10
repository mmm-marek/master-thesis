import debounce from "lodash.debounce";
import { Table, Input } from "@medusajs/ui";
import { RouteProps } from "@medusajs/admin";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useMemo, useCallback, ChangeEvent } from "react";
import useGetRegions from "../../hooks/useGetRegions";
import useGetProducts, { PRODUCTS_LIMIT } from "../../hooks/useGetProducts";
import Loading from "../shared/loading";
import Error from "../shared/error";
import { QUERY_KEYS } from "../../utils/queryKeys";
import LocalizationDrawer from "./localization-drawer";
import ProductLocalizationForm from "./product-localization-form";
import VariantsLocalizationForm from "./variants-localization-form";

type ProductLocalizationTableProps = {
    notify: RouteProps["notify"];
};

const ProductLocalizationTable = ({
    notify,
}: ProductLocalizationTableProps) => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");

    const {
        data: regions,
        isLoading: regionsLoading,
        isError: regionsError,
    } = useGetRegions();

    const {
        data: productsData,
        isInitialLoading: productsLoading,
        isError: productsError,
    } = useGetProducts(page, search);

    const handleSuccess = () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.API_GET_PRODUCTS, page],
        });
        notify.success("success", "product localization updated");
    };

    const handleError = () => {
        notify.error("error", "product localization update failed");
    };

    const handleSearchChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setPage(0);
            setSearch(e.target.value);
        },
        []
    );

    const debouncedHandleSearchChange = useMemo(
        () => debounce(handleSearchChange, 500),
        [handleSearchChange]
    );

    if (regionsLoading || productsLoading) {
        return <Loading />;
    }

    if (regionsError || productsError) {
        return <Error />;
    }

    const pageCount = Math.ceil(productsData.count / PRODUCTS_LIMIT);

    return (
        <div className="relative">
            <Input
                placeholder="Search"
                className="absolute right-0 top-[-42px] w-80"
                onChange={debouncedHandleSearchChange}
            />
            <Table></Table>
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
                    {productsData.products.map((product) => {
                        return (
                            <Table.Row key={product.id}>
                                <Table.Cell className="truncate max-w-[3500px]">
                                    {product.title}
                                </Table.Cell>
                                <Table.Cell>{product.handle}</Table.Cell>
                                <Table.Cell className="flex gap-4 flex-wrap py-1">
                                    {regions.map((region) => {
                                        return (
                                            <LocalizationDrawer
                                                key={region.id}
                                                title={`Localize ${product.title}`}
                                                subtitle={`Region ${region.name}`}
                                                triggerText={region.name}
                                                form={
                                                    <>
                                                        <ProductLocalizationForm
                                                            product={product}
                                                            regionId={region.id}
                                                            onSuccess={
                                                                handleSuccess
                                                            }
                                                            onError={
                                                                handleError
                                                            }
                                                        />
                                                        <VariantsLocalizationForm
                                                            product={product}
                                                            regionId={region.id}
                                                            onSuccess={
                                                                handleSuccess
                                                            }
                                                            onError={
                                                                handleError
                                                            }
                                                        />
                                                    </>
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
                count={productsData.count}
                pageSize={PRODUCTS_LIMIT}
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

export default ProductLocalizationTable;
