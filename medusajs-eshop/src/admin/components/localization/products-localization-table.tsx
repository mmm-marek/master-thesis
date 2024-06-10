import { useState, useMemo } from "react";
import { Button, Heading, Table } from "@medusajs/ui";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import useGetRegions from "../../hooks/useGetRegions";
import useGetProducts, { PRODUCTS_LIMIT } from "../../hooks/useGetProducts";
import Loading from "../shared/loading";
import Error from "../shared/error";

type ProductLocalizationTableProps = {
    onLocalizeProduct: (product: PricedProduct, regionId: string) => void;
};

const ProductLocalizationTable = ({
    onLocalizeProduct,
}: ProductLocalizationTableProps) => {
    const [page, setPage] = useState(0);

    const {
        data: regions,
        isLoading: regionsLoading,
        isError: regionsError,
    } = useGetRegions();
    const {
        data: productsData,
        isLoading: productsLoading,
        isError: productsError,
    } = useGetProducts(page);

    if (regionsLoading || productsLoading) {
        return <Loading />;
    }

    if (regionsError || productsError) {
        return <Error />;
    }

    const pageCount = Math.ceil(productsData.count / PRODUCTS_LIMIT);

    return (
        <div>
            <Heading level="h2">Products</Heading>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Handle</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Region</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {productsData.products.map((product) => {
                        return (
                            <Table.Row key={product.id}>
                                <Table.Cell>{product.title}</Table.Cell>
                                <Table.Cell>{product.handle}</Table.Cell>
                                <Table.Cell className="truncate max-w-[100px]">
                                    {product.description}
                                </Table.Cell>
                                <Table.Cell className="flex gap-4 flex-wrap">
                                    {regions.map((region) => {
                                        return (
                                            <Button
                                                key={region.id}
                                                onClick={() =>
                                                    onLocalizeProduct(
                                                        product,
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
