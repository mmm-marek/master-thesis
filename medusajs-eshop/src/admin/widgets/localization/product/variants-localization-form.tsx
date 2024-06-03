import { ProductVariant } from "@medusajs/medusa";
import { Button, Input } from "@medusajs/ui";
import {
    VariantsLocalizationSchema,
    VariantsLocalizationSchemaType,
} from "./product-localization-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type VariantsLocalizationFormProps = {
    variants: ProductVariant[];
    productId: string;
    regionId: string;
    onSubmit: (data: VariantsLocalizationSchemaType) => void;
};

const VariantsLocalizationForm = ({
    variants,
    productId,
    regionId,
    onSubmit,
}: VariantsLocalizationFormProps) => {
    const { register, handleSubmit } = useForm<VariantsLocalizationSchemaType>({
        resolver: zodResolver(VariantsLocalizationSchema),
    });

    const onSubmitHandler = (data: VariantsLocalizationSchemaType) => {
        onSubmit(data);
    };

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmitHandler)}>
            {variants.map((variant, index) => (
                <div key={index}>
                    <label
                        className="text-grey-90 inter-xsmall-semibold"
                        htmlFor={`${regionId}-variants.${index}.title`}>
                        Variant {variant.title}
                    </label>
                    <Input
                        id={`${regionId}-variants.${index}.title`}
                        {...register(`variants.${index}.title`)}
                        placeholder={`Input ${index + 1}`}
                    />
                    <input
                        type="hidden"
                        {...register(`variants.${index}.variant_id`)}
                        value={variant.id}
                    />
                    <input
                        type="hidden"
                        {...register(`variants.${index}.product_id`)}
                        value={productId}
                    />
                </div>
            ))}
            <Button type="submit" size="large">
                Save
            </Button>
        </form>
    );
};

export default VariantsLocalizationForm;
