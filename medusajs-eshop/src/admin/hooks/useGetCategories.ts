import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../utils/queryKeys";
import { medusa } from "../utils/medusa-helpers";

export const CATEGORIES_LIMIT = 20;

const useGetCategories = (page: number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.API_GET_CATEGORIES, page],
        queryFn: async () => {
            const res = await medusa.admin.productCategories.list({
                limit: CATEGORIES_LIMIT,
                offset: page * CATEGORIES_LIMIT,
            });
            return res;
        },
        keepPreviousData: true,
    });
};

export default useGetCategories;
