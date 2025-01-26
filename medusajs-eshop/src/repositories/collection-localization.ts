import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { CollectionLocalization } from "src/models/collection-localization";

export const CollectionLocalizationRepository = dataSource.getRepository(
    CollectionLocalization
);
