import { useMutation } from "@tanstack/react-query";
import { VariantsLocalizationSchemaType } from "../schemas/localization-schemas";
import { medusa } from "../utils/medusa-helpers";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

const useLocalizeVaraint = (product: PricedProduct, regionId: string) => {
    return useMutation({
        mutationFn: async (data: VariantsLocalizationSchemaType) => {
            const promises = data.variants.map((variant) => {
                const previousLocalizationData =
                    (product.variants.find((v) => v.id === variant.variant_id)
                        ?.metadata?.localization as {}) ?? {};

                return medusa.admin.products.updateVariant(
                    product.id,
                    variant.variant_id,
                    {
                        metadata: {
                            localization: {
                                ...(previousLocalizationData || {}),
                                [regionId]: {
                                    title: variant.title,
                                },
                            },
                        },
                    }
                );
            });
            const res = await Promise.allSettled(promises);
            return res;
        },
    });
};

export default useLocalizeVaraint;
