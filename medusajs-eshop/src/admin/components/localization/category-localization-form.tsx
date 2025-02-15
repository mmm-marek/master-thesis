import { useForm } from "react-hook-form";
import { ProductCategory } from "@medusajs/medusa";
import { Button, Input, Textarea } from "@medusajs/ui";
import { CategoryLocalizationSchemaType } from "../../schemas/localization-schemas";
import {
    useGetLocalizedCategory,
    useLocalizeCategory,
} from "../../hooks/localization/category";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/query-keys";

type CategoryLocalizationFormProps = {
    category: ProductCategory;
    languageCode: string;
    onSuccess: () => void;
    onError: () => void;
};

export const CategoryLocalizationForm = ({
    category,
    languageCode,
    onSuccess,
    onError,
}: CategoryLocalizationFormProps) => {
    const queryClient = useQueryClient();

    const localizedCategory = useGetLocalizedCategory({
        categoryId: category.id,
        languageCode: languageCode,
    });

    const { mutate: updateCategory } = useLocalizeCategory({
        categoryId: category.id,
        languageCode: languageCode,
    });

    const { register, handleSubmit } = useForm<CategoryLocalizationSchemaType>({
        values: {
            name: localizedCategory.data?.name ?? "",
            description: localizedCategory.data?.description ?? "",
        },
    });

    const handleFormSubmit = (data: CategoryLocalizationSchemaType) => {
        updateCategory(
            {
                name: data.name,
                description: data.description,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: [
                            QUERY_KEYS.API_GET_LOCALIZED_CATEGORY,
                            category.id,
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
                    htmlFor={`${languageCode}-name`}>
                    Name
                </label>
                <Input
                    placeholder="Name"
                    {...register("name")}
                    id={`${languageCode}-name`}
                />
            </div>
            <div>
                <label
                    className="text-grey-90 inter-xsmall-semibold"
                    htmlFor={`${languageCode}-description`}>
                    Description
                </label>
                <Textarea
                    placeholder="Description"
                    {...register("description")}
                    id={`${languageCode}-description`}
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

export default CategoryLocalizationForm;
