import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../utils/queryKeys";
import { medusa } from "../utils/medusa-helpers";

const useGetCollection = (collectionId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.API_GET_COLLECTIONS, collectionId],
        queryFn: async () => {
            const { collection } = await medusa.collections.retrieve(
                collectionId
            );
            return collection;
        },
        keepPreviousData: true,
    });
};

export default useGetCollection;
