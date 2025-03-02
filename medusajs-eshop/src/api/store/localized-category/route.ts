import {
    MedusaRequest,
    MedusaResponse,
    ProductCategory,
} from "@medusajs/medusa";
import { ApiError } from "../../../utils/types";
import LocalizedCategoryService from "../../../services/localized-category";

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse<
        | {
              localizedCategories: ProductCategory[] | null;
          }
        | ApiError
    >
): Promise<void> {
    const localizedCategoryService: LocalizedCategoryService =
        req.scope.resolve("localizedCategoryService");

    const language_code = req.headers["accept-language"]?.toUpperCase() ?? "EN";

    const localizedCategories = await localizedCategoryService.getAll(
        language_code
    );

    res.status(200).json({ localizedCategories });
}
