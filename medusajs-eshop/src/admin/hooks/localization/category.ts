import { useQuery, useMutation } from "@tanstack/react-query";
import { medusa } from "../../utils/medusa-helpers";
import { CategoryLocalization } from "../../../models/category-localization";
import { CategoryLocalizationSchemaType } from "../../schemas/localization-schemas";
import { QUERY_KEYS } from "../../utils/query-keys";

type LocalizeCategoryArgs = {
    categoryId: string;
    languageCode: string;
};

export const useLocalizeCategory = ({
    categoryId,
    languageCode,
}: LocalizeCategoryArgs) => {
    return useMutation({
        mutationFn: async (data: CategoryLocalizationSchemaType) => {
            const response = await medusa.client.request(
                "POST",
                `/admin/category-localization`,
                {
                    name: data.name,
                    description: data.description,
                    category_id: categoryId,
                    language_code: languageCode,
                }
            );
            return response.localization;
        },
    });
};

export const useGetLocalizedCategory = ({
    categoryId,
    languageCode,
}: LocalizeCategoryArgs) => {
    return useQuery({
        queryKey: [
            QUERY_KEYS.API_GET_LOCALIZED_CATEGORY,
            categoryId,
            languageCode,
        ],
        queryFn: async () => {
            const response = await medusa.client.request(
                "GET",
                `/admin/category-localization?category_id=${categoryId}&language_code=${languageCode}`
            );

            return response.categoryLocalization as CategoryLocalization | null;
        },
    });
};
