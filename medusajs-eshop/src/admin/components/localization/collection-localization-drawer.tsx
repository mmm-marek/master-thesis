import { ProductCollection, Region } from "@medusajs/medusa";
import { Button, Drawer } from "@medusajs/ui";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { CollectionLocalizationForm } from "./collection-localization-form";

type ProductLocalizationDrawerProps = {
    collection: ProductCollection;
    region: Region;
    onSuccess: () => void;
    onError: () => void;
};

const ProductLocalizationDrawer = ({
    region,
    collection,
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
                            Localize {collection.title}
                        </h2>
                        <p className="inter-base-regular">
                            Region {region.name}
                        </p>
                    </Drawer.Title>
                </Drawer.Header>
                <Drawer.Body className="overflow-auto">
                    <CollectionLocalizationForm
                        collection={collection}
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
