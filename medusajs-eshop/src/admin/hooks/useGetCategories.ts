import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../utils/queryKeys";
import { medusa } from "../utils/medusa-helpers";

const useGetCategories = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.API_GET_CATEGORIES],
        queryFn: async () => {
            const { product_categories } =
                await medusa.admin.productCategories.list();
            return product_categories;
        },
    });
};

export default useGetCategories;
