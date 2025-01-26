import { useForm } from "react-hook-form";
import { ProductCategory } from "@medusajs/medusa";
import { Button, Input, Textarea } from "@medusajs/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    categoryLocalizationSchema,
    CategoryLocalizationSchemaType,
} from "../../schemas/localization-schemas";
import useLocalizeCategory from "../../hooks/useLocalizeCategory";

type RegionLocalizationFormProps = {
    category: ProductCategory;
    regionId: string;
    onSuccess: () => void;
    onError: () => void;
};

export const CategoryLocalizationForm = ({
    category,
    regionId,
    onSuccess,
    onError,
}: RegionLocalizationFormProps) => {
    const getDefaultValues = (regionId: string) => {
        const localization = category.metadata?.localization;
        if (localization && localization[regionId]) {
            return localization[regionId];
        }
        return {};
    };

    const { mutate: updateCategory } = useLocalizeCategory(category, regionId);

    const { register, handleSubmit } = useForm<CategoryLocalizationSchemaType>({
        mode: "onChange",
        resolver: zodResolver(categoryLocalizationSchema),
        defaultValues: getDefaultValues(regionId),
    });

    const handleFormSubmit = (data: CategoryLocalizationSchemaType) => {
        updateCategory(
            {
                name: data.name,
                description: data.description,
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
                    htmlFor={`${regionId}-name`}>
                    Name
                </label>
                <Input
                    placeholder="Name"
                    {...register("name")}
                    id={`${regionId}-name`}
                />
            </div>
            <div>
                <label
                    className="text-grey-90 inter-xsmall-semibold"
                    htmlFor={`${regionId}-description`}>
                    Description
                </label>
                <Textarea
                    placeholder="Description"
                    {...register("description")}
                    id={`${regionId}-description`}
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
