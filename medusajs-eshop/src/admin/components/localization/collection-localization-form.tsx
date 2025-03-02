import { useForm } from "react-hook-form";
import { Button, Input } from "@medusajs/ui";
import { ProductCollection } from "@medusajs/medusa";
import { CollectionLocalizationSchemaType } from "../../schemas/localization-schemas";
import {
    useGetLocalizedCollection,
    useLocalizeCollection,
} from "../../hooks/localization/collection";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/query-keys";

type RegionLocalizationFormProps = {
    collection: ProductCollection;
    languageCode: string;
    onSuccess: () => void;
    onError: () => void;
};

export const CollectionLocalizationForm = ({
    collection,
    languageCode,
    onSuccess,
    onError,
}: RegionLocalizationFormProps) => {
    const queryClient = useQueryClient();

    const localizedCollection = useGetLocalizedCollection({
        collectionId: collection.id,
        languageCode: languageCode,
    });

    const { mutate: updateCollection } = useLocalizeCollection({
        collectionId: collection.id,
        languageCode: languageCode,
    });

    const { register, handleSubmit } =
        useForm<CollectionLocalizationSchemaType>({
            values: {
                title: localizedCollection.data?.title ?? "",
            },
        });

    const handleFormSubmit = (data: CollectionLocalizationSchemaType) => {
        updateCollection(
            {
                title: data.title,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: [
                            QUERY_KEYS.API_GET_LOCALIZED_COLLECTION,
                            collection.id,
                            languageCode,
                        ],
                    });
                    onSuccess();
                },
                onError,
            }
        );
    };

    return (
        <form
            onSubmitCapture={handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-4">
            <div>
                <label
                    className="text-grey-90 inter-xsmall-semibold"
                    htmlFor={`${languageCode}-title`}>
                    Title
                </label>
                <Input
                    placeholder="Title"
                    {...register("title")}
                    id={`${languageCode}-title`}
                />
            </div>
            <div className="w-full flex justify-end">
                <Button type="submit" size="large">
                    Save
                </Button>
            </div>
        </form>
    );
};

export default CollectionLocalizationForm;
