import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../utils/queryKeys";
import { medusa } from "../utils/medusa-helpers";

export const COLLECTIONS_LIMIT = 20;

const useGetCollections = (page: number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.API_GET_COLLECTIONS, page],
        queryFn: async () => {
            const res = await medusa.collections.list({
                limit: COLLECTIONS_LIMIT,
                offset: page * COLLECTIONS_LIMIT,
            });
            return res;
        },
    });
};

export default useGetCollections;
