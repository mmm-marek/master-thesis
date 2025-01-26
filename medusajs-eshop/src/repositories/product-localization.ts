import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { ProductLocalization } from "src/models/product-localization";

export const ProductLocalizationRepository =
    dataSource.getRepository(ProductLocalization);
