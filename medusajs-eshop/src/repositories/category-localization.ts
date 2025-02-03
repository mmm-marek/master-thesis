import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { CategoryLocalization } from "../models/category-localization";

export const CategoryLocalizationRepository =
    dataSource.getRepository(CategoryLocalization);
