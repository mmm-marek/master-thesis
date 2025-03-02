import { useQuery, useMutation } from "@tanstack/react-query";
import { medusa } from "../../utils/medusa-helpers";
import { VariantLocalization } from "../../../models/variant-localization";
import { VariantsLocalizationSchemaType } from "../../schemas/localization-schemas";
import { QUERY_KEYS } from "../../utils/query-keys";

type PostLocalizeVariantArgs = {
    languageCode: string;
};

type GetLocalizedVariantArgs = {
    variantIds: string[];
    languageCode: string;
};

export const useLocalizeVariant = ({
    languageCode,
}: PostLocalizeVariantArgs) => {
    return useMutation({
        mutationFn: async (data: VariantsLocalizationSchemaType) => {
            const response = await medusa.client.request(
                "POST",
                `/admin/variant-localization`,
                {
                    variants: data.variants.filter((v) => !!v.title),
                    language_code: languageCode,
                }
            );
            return response.localization;
        },
    });
};

export const useGetLocalizedVariants = ({
    variantIds,
    languageCode,
}: GetLocalizedVariantArgs) => {
    return useQuery({
        queryKey: [
            QUERY_KEYS.API_GET_LOCALIZED_VARIANTS,
            variantIds,
            languageCode,
        ],
        queryFn: async () => {
            const response = await medusa.client.request(
                "GET",
                `/admin/variant-localization?language_code=${languageCode}&variant_ids[]=${variantIds.join(
                    "&variant_ids[]="
                )}`
            );

            return response.variantLocalization as VariantLocalization[];
        },
    });
};
