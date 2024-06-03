import { useQuery } from "@tanstack/react-query";
import { medusa } from "../utils/medusa-helpers";
import { QUERY_KEYS } from "../utils/queryKeys";

const useGetRegions = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.API_GET_REGIONS],
        queryFn: async () => {
            const { regions } = await medusa.admin.regions.list();
            return regions;
        },
    });
};

export default useGetRegions;
