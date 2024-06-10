import { useForm } from "react-hook-form";
import {
    ProductLocalizationSchema,
    ProductLocalizationSchemaType,
} from "../../schemas/localization-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@medusajs/ui";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import useLocalizeProduct from "../../hooks/useLocalizeProduct";

type RegionLocalizationFormProps = {
    product: PricedProduct;
    regionId: string;
    onSuccess: () => void;
    onError: () => void;
};

const ProductLocalizationForm = ({
    product,
    regionId,
    onError,
    onSuccess,
}: RegionLocalizationFormProps) => {
    const { mutate: updateProduct } = useLocalizeProduct(product);

    const getDefaultValues = (regionId: string) => {
        const localization = product.metadata?.localization;
        if (localization && localization[regionId]) {
            return localization[regionId];
        }
        return {};
    };

    const { register, handleSubmit } = useForm<ProductLocalizationSchemaType>({
        resolver: zodResolver(ProductLocalizationSchema),
        defaultValues: getDefaultValues(regionId),
    });

    const onSubmitHandler = (data: ProductLocalizationSchemaType) => {
        updateProduct(
            {
                regionId,
                ...data,
            },
            {
                onSuccess,
                onError,
            }
        );
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
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
            <div>
                <label
                    className="text-grey-90 inter-xsmall-semibold"
                    htmlFor={`${regionId}-subtitle`}>
                    Subtitle
                </label>
                <Input
                    placeholder="Subtitle"
                    {...register("subtitle")}
                    id={`${regionId}-subtitle`}
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
            <div>
                <label
                    className="text-grey-90 inter-xsmall-semibold"
                    htmlFor={`${regionId}-handle`}>
                    Handle
                </label>
                <Input
                    placeholder="Handle"
                    {...register("handle")}
                    id={`${regionId}-handle`}
                />
            </div>
            <div>
                <label
                    className="text-grey-90 inter-xsmall-semibold"
                    htmlFor={`${regionId}-material`}>
                    Material
                </label>
                <Input
                    placeholder="Material"
                    {...register("material")}
                    id={`${regionId}-material`}
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
