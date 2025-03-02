import { useQuery, useMutation } from "@tanstack/react-query";
import { medusa } from "../../utils/medusa-helpers";
import { ProductLocalization } from "../../../models/product-localization";
import { ProductLocalizationSchemaType } from "../../schemas/localization-schemas";
import { QUERY_KEYS } from "../../utils/query-keys";

type LocalizeProductArgs = {
    productId: string;
    languageCode: string;
};

export const useLocalizeProduct = ({
    productId,
    languageCode,
}: LocalizeProductArgs) => {
    return useMutation({
        mutationFn: async (data: ProductLocalizationSchemaType) => {
            const response = await medusa.client.request(
                "POST",
                `/admin/product-localization`,
                {
                    ...data,
                    product_id: productId,
                    language_code: languageCode,
                }
            );
            return response.localization;
        },
    });
};

export const useGetLocalizedProduct = ({
    productId,
    languageCode,
}: LocalizeProductArgs) => {
    return useQuery({
        queryKey: [
            QUERY_KEYS.API_GET_LOCALIZED_PRODUCT,
            productId,
            languageCode,
        ],
        queryFn: async () => {
            const response = await medusa.client.request(
                "GET",
                `/admin/product-localization?product_id=${productId}&language_code=${languageCode}`
            );

            return response.productLocalization as ProductLocalization | null;
        },
    });
};
