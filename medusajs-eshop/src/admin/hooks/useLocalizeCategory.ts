import { useMutation } from "@tanstack/react-query";
import { ProductCategory } from "@medusajs/medusa";
import { CategoryLocalizationSchemaType } from "../schemas/localization-schemas";
import { medusa } from "../utils/medusa-helpers";

const useLocalizeCategory = (
    productCategory: ProductCategory,
    regionId: string
) => {
    return useMutation({
        mutationFn: async (data: CategoryLocalizationSchemaType) => {
            const { product_category } =
                await medusa.admin.productCategories.update(
                    productCategory.id,
                    {
                        metadata: {
                            ...productCategory.metadata,
                            localization: {
                                ...(productCategory.metadata?.localization
                                    ? (productCategory.metadata
                                          ?.localization as {})
                                    : {}),
                                [regionId]: data,
                            },
                        },
                    }
                );
            return product_category;
        },
    });
};

export default useLocalizeCategory;
