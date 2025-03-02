import { useQuery, useMutation } from "@tanstack/react-query";
import { medusa } from "../../utils/medusa-helpers";
import { VariantLocalization } from "../../../models/variant-localization";
import { VariantsLocalizationSchemaType } from "../../schemas/localization-schemas";
import { QUERY_KEYS } from "../../utils/query-keys";

type LocalizeVariantArgs = {
    productId: string;
    languageCode: string;
};

export const useLocalizeVariant = ({
    productId,
    languageCode,
}: LocalizeVariantArgs) => {
    return useMutation({
        mutationFn: async (data: VariantsLocalizationSchemaType) => {
            const response = await medusa.client.request(
                "POST",
                `/admin/variant-localization`,
                {
                    ...data,
                    language_code: languageCode,
                }
            );
            return response.localization;
        },
    });
};

export const useGetLocalizedVariants = ({
    productId,
    languageCode,
}: LocalizeVariantArgs) => {
    return useQuery({
        queryKey: [
            QUERY_KEYS.API_GET_LOCALIZED_VARIANTS,
            productId,
            languageCode,
        ],
        queryFn: async () => {
            const response = await medusa.client.request(
                "GET",
                `/admin/variant-localization?product_id=${productId}&language_code=${languageCode}`
            );

            return response.variantLocalizations as VariantLocalization[];
        },
    });
};
