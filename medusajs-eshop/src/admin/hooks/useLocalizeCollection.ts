import { useMutation } from "@tanstack/react-query";
import { ProductCollection } from "@medusajs/medusa";
import { CollectionLocalizationSchemaType } from "../schemas/localization-schemas";
import { medusa } from "../utils/medusa-helpers";

const useLocalizeCollection = (
    productCollection: ProductCollection,
    regionId: string
) => {
    return useMutation({
        mutationFn: async (data: CollectionLocalizationSchemaType) => {
            const { collection } = await medusa.admin.collections.update(
                productCollection.id,
                {
                    metadata: {
                        ...productCollection.metadata,
                        localization: {
                            ...(productCollection.metadata?.localization
                                ? (productCollection.metadata
                                      ?.localization as {})
                                : {}),
                            [regionId]: data,
                        },
                    },
                }
            );
            return collection;
        },
    });
};

export default useLocalizeCollection;
