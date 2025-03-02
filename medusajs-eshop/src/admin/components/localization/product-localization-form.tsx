import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@medusajs/ui";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import {
    productLocalizationSchema,
    ProductLocalizationSchemaType,
} from "../../schemas/localization-schemas";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/query-keys";
import {
    useGetLocalizedProduct,
    useLocalizeProduct,
} from "../../hooks/localization/product";

type ProductLocalizationFormProps = {
    product: PricedProduct;
    languageCode: string;
    onSuccess: () => void;
    onError: () => void;
};

const ProductLocalizationForm = ({
    product,
    languageCode,
    onError,
    onSuccess,
}: ProductLocalizationFormProps) => {
    const queryClient = useQueryClient();

    const localizedProduct = useGetLocalizedProduct({
        productId: product.id!,
        languageCode,
    });

    const { mutate: updateProduct } = useLocalizeProduct({
        productId: product.id!,
        languageCode,
    });

    const { register, handleSubmit } = useForm<ProductLocalizationSchemaType>({
        resolver: zodResolver(productLocalizationSchema),
        values: {
            title: localizedProduct.data?.title ?? "",
            subtitle: localizedProduct.data?.subtitle ?? "",
            description: localizedProduct.data?.description ?? "",
            material: localizedProduct.data?.material ?? "",
        },
    });

    const handleFormSubmit = (data: ProductLocalizationSchemaType) => {
        updateProduct(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.API_GET_LOCALIZED_PRODUCT,
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
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
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
            <div>
                <label
                    className="text-grey-90 inter-xsmall-semibold"
                    htmlFor={`${languageCode}-subtitle`}>
                    Subtitle
                </label>
                <Input
                    placeholder="Subtitle"
                    {...register("subtitle")}
                    id={`${languageCode}-subtitle`}
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
            <div>
                <label
                    className="text-grey-90 inter-xsmall-semibold"
                    htmlFor={`${languageCode}-material`}>
                    Material
                </label>
                <Input
                    placeholder="Material"
                    {...register("material")}
                    id={`${languageCode}-material`}
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

export default ProductLocalizationForm;
