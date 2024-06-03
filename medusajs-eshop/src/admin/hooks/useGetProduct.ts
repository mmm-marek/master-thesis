import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../utils/queryKeys";
import { medusa } from "../utils/medusa-helpers";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

const useGetProduct = (productId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.API_GET_PRODUCT, productId],
        queryFn: async () => {
            const { product } = await medusa.products.retrieve(productId);
            return product;
        },
    });
};

export default useGetProduct;
