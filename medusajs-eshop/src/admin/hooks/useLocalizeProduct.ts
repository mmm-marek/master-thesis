import { useMutation } from "@tanstack/react-query";
import { ProductLocalizationSchemaType } from "../schemas/localization-schemas";
import { medusa } from "../utils/medusa-helpers";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

const useLocalizeProduct = (product: PricedProduct) => {
    return useMutation({
        mutationFn: async (
            data: ProductLocalizationSchemaType & { regionId: string }
        ) => {
            const { product: newProduct } = await medusa.admin.products.update(
                product.id,
                {
                    metadata: {
                        ...product.metadata,
                        localization: {
                            ...(product.metadata?.localization
                                ? (product.metadata?.localization as {})
                                : {}),
                            [data.regionId]: data,
                        },
                    },
                }
            );
            return newProduct;
        },
    });
};

export default useLocalizeProduct;
