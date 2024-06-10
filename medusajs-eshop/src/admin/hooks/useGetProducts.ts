import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../utils/queryKeys";
import { medusa } from "../utils/medusa-helpers";

export const PRODUCTS_LIMIT = 20;

const useGetProducts = (page: number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.API_GET_PRODUCTS, page],
        queryFn: async () => {
            const res = await medusa.products.list({
                limit: PRODUCTS_LIMIT,
                offset: page * PRODUCTS_LIMIT,
            });
            return res;
        },
    });
};

export default useGetProducts;
