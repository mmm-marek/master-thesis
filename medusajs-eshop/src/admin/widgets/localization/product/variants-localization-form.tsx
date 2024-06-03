import { Product, ProductVariant } from "@medusajs/medusa";
import { Button, Input } from "@medusajs/ui";
import {
    VariantsLocalizationSchema,
    VariantsLocalizationSchemaType,
} from "./localization-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type VariantsLocalizationFormProps = {
    product: Product;
    regionId: string;
    onSuccess: () => void;
    onError: () => void;
};

const VariantsLocalizationForm = ({
    product,
    regionId,
}: VariantsLocalizationFormProps) => {
    const { register, handleSubmit } = useForm<VariantsLocalizationSchemaType>({
        resolver: zodResolver(VariantsLocalizationSchema),
    });

    const onSubmitHandler = (data: VariantsLocalizationSchemaType) => {
        console.log(data);
    };

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmitHandler)}>
            {product.variants.map((variant, index) => (
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
                        value={product.id}
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
