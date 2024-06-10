import { useForm } from "react-hook-form";
import { Button, Input } from "@medusajs/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import {
    VariantsLocalizationSchema,
    VariantsLocalizationSchemaType,
} from "../../schemas/localization-schemas";
import useLocalizeVaraint from "../../hooks/useLocalizeVaraint";

type VariantsLocalizationFormProps = {
    product: PricedProduct;
    regionId: string;
    onSuccess: () => void;
    onError: () => void;
};

const VariantsLocalizationForm = ({
    product,
    regionId,
    onSuccess,
    onError,
}: VariantsLocalizationFormProps) => {
    const { register, handleSubmit } = useForm<VariantsLocalizationSchemaType>({
        resolver: zodResolver(VariantsLocalizationSchema),
        defaultValues: {
            variants: product.variants.map((variant) => ({
                variant_id: variant.id,
                title: variant.metadata?.localization?.[regionId]?.title,
            })),
        },
    });

    const { mutate: updateVariants } = useLocalizeVaraint(product, regionId);

    const onSubmitHandler = (data: VariantsLocalizationSchemaType) => {
        updateVariants(data, {
            onSuccess,
            onError,
        });
    };

    return (
        <>
            <h4 className="inter-large-semibold">Variants</h4>
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
