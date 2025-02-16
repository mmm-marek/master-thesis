import { useForm } from "react-hook-form";
import { Button, Input } from "@medusajs/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import {
    variantsLocalizationSchema,
    VariantsLocalizationSchemaType,
} from "../../schemas/localization-schemas";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/query-keys";
import {
    useGetLocalizedVariants,
    useLocalizeVariant,
} from "../../hooks/localization/variant";

type VariantsLocalizationFormProps = {
    product: PricedProduct;
    languageCode: string;
    onSuccess: () => void;
    onError: () => void;
};

const VariantsLocalizationForm = ({
    product,
    languageCode,
    onSuccess,
    onError,
}: VariantsLocalizationFormProps) => {
    const queryClient = useQueryClient();

    const localizedVariants = useGetLocalizedVariants({
        productId: product.id!,
        languageCode,
    });

    const { mutate: updateVariants } = useLocalizeVariant({
        productId: product.id!,
        languageCode,
    });

    const { register, handleSubmit } = useForm<VariantsLocalizationSchemaType>({
        resolver: zodResolver(variantsLocalizationSchema),
        values: {
            variants: product.variants.map((variant) => ({
                variant_id: variant.id!,
                title:
                    localizedVariants.data?.find(
                        (v) => v.variant_id === variant.id
                    )?.title ?? "",
            })),
        },
    });

    const handleFormSubmit = (data: VariantsLocalizationSchemaType) => {
        updateVariants(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.API_GET_LOCALIZED_VARIANTS,
                        product.id,
                        languageCode,
                    ],
                });
                onSuccess();
            },
            onError,
        });
    };

    return (
        <>
            <h4 className="inter-large-semibold">Variants</h4>
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(handleFormSubmit)}>
                {product.variants.map((variant, index) => (
                    <div key={index}>
                        <label
                            className="text-grey-90 inter-xsmall-semibold"
                            htmlFor={`${languageCode}-variants.${index}.title`}>
                            Variant {variant.title}
                        </label>
                        <Input
                            id={`${languageCode}-variants.${index}.title`}
                            {...register(`variants.${index}.title`)}
                            placeholder={"Title"}
                        />
                        <input
                            type="hidden"
                            {...register(`variants.${index}.variant_id`)}
                            value={variant.id}
                        />
                    </div>
                ))}
                <div className="w-full flex justify-end">
                    <Button type="submit" size="large">
                        Save
                    </Button>
                </div>
            </form>
        </>
    );
};

export default VariantsLocalizationForm;
