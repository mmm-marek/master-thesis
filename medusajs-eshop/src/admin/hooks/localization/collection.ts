import { useQuery } from "@tanstack/react-query";
import { medusa } from "../../utils/medusa-helpers";
import { CollectionLocalization } from "../../../models/collection-localization";
import { useMutation } from "@tanstack/react-query";
import { CollectionLocalizationSchemaType } from "../../schemas/localization-schemas";
import { QUERY_KEYS } from "../../utils/query-keys";

type LocalizeCollectionArgs = {
    collectionId: string;
    languageCode: string;
};

export const useLocalizeCollection = ({
    collectionId,
    languageCode,
}: LocalizeCollectionArgs) => {
    return useMutation({
        mutationFn: async (data: CollectionLocalizationSchemaType) => {
            const response = await await medusa.client.request(
                "POST",
                `/admin/collection-localization`,
                {
                    title: data.title,
                    collection_id: collectionId,
                    language_code: languageCode,
                }
            );
            return response.collectionLocalization;
        },
    });
};

export const useGetLocalizedCollection = ({
    collectionId,
    languageCode,
}: LocalizeCollectionArgs) => {
    return useQuery({
        queryKey: [
            QUERY_KEYS.API_GET_LOCALIZED_COLLECTION,
            collectionId,
            languageCode,
        ],
        queryFn: async () => {
            const response = await await medusa.client.request(
                "GET",
                `/admin/collection-localization?collection_id=${collectionId}&language_code=${languageCode}`
            );

            return response.collectionLocalization as CollectionLocalization | null;
        },
    });
};
