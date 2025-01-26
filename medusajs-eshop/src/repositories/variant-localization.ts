import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { VariantLocalization } from "../models/variant-localization";

export const VariantLocalizationRepository =
    dataSource.getRepository(VariantLocalization);
