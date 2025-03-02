import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../utils/query-keys";
import { medusa } from "../utils/medusa-helpers";

export const PRODUCTS_LIMIT = 20;

const useGetProducts = (page: number, search?: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.API_GET_PRODUCTS, page, search],
        queryFn: async () => {
            const res = await medusa.products.list({
                limit: PRODUCTS_LIMIT,
                offset: page * PRODUCTS_LIMIT,
                q: search,
            });
            return res;
        },
        keepPreviousData: true,
    });
};

export default useGetProducts;
