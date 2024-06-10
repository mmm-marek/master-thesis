import { Region } from "@medusajs/medusa";
import { Button, Drawer } from "@medusajs/ui";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { ProductLocalizationForm } from "./product-localization-form";
import { VariantsLocalizationForm } from "./variants-localization-form";

type ProductLocalizationDrawerProps = {
    product: PricedProduct;
    region: Region;
    onSuccess: () => void;
    onError: () => void;
};

const ProductLocalizationDrawer = ({
    region,
    product,
    onSuccess,
    onError,
}: ProductLocalizationDrawerProps) => {
    return (
        <Drawer key={region.id}>
            <Drawer.Trigger asChild>
                <Button className="inter-large-semibold">{region.name}</Button>
            </Drawer.Trigger>
            <Drawer.Content className="w-[700px] right-0">
                <Drawer.Header>
                    <Drawer.Title>
                        <h2 className="inter-large-semibold">
                            Localize {product.title}
                        </h2>
                        <p className="inter-base-regular">
                            Region {region.name}
                        </p>
                    </Drawer.Title>
                </Drawer.Header>
                <Drawer.Body className="overflow-auto">
                    <ProductLocalizationForm
                        product={product}
                        regionId={region.id}
                        onSuccess={onSuccess}
                        onError={onError}
                    />
                    <VariantsLocalizationForm
                        product={product}
                        regionId={region.id}
                        onSuccess={onSuccess}
                        onError={onError}
                    />
                </Drawer.Body>
                <Drawer.Footer>
                    <Drawer.Close asChild>
                        <Button variant="secondary">Close</Button>
                    </Drawer.Close>
                </Drawer.Footer>
            </Drawer.Content>
        </Drawer>
    );
};

export default ProductLocalizationDrawer;
