import { useForm } from "react-hook-form";
import { Button, Input } from "@medusajs/ui";
import { ProductCollection } from "@medusajs/medusa";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    collectionLocalizationSchema,
    CollectionLocalizationSchemaType,
} from "../../schemas/localization-schemas";
import useLocalizeCollection from "../../hooks/useLocalizeCollection";

type RegionLocalizationFormProps = {
    collection: ProductCollection;
    regionId: string;
    onSuccess: () => void;
    onError: () => void;
};

export const CollectionLocalizationForm = ({
    collection,
    regionId,
    onSuccess,
    onError,
}: RegionLocalizationFormProps) => {
    const { mutate: updateCollection } = useLocalizeCollection(
        collection,
        regionId
    );

    const getDefaultValues = (regionId: string) => {
        const localization = collection.metadata?.localization;
        if (localization && localization[regionId]) {
            return localization[regionId];
        }
        return {};
    };

    const { register, handleSubmit } =
        useForm<CollectionLocalizationSchemaType>({
            mode: "onChange",
            resolver: zodResolver(collectionLocalizationSchema),
            defaultValues: getDefaultValues(regionId),
        });

    const handleFormSubmit = (data: CollectionLocalizationSchemaType) => {
        updateCollection(
            {
                title: data.title,
            },
            {
                onSuccess,
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
                    htmlFor={`${regionId}-title`}>
                    Title
                </label>
                <Input
                    placeholder="Title"
                    {...register("title")}
                    id={`${regionId}-title`}
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
