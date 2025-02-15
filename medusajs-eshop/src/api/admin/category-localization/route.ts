import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import CategoryLocalizationService from "../../../services/category-localization";
import {
    getCategoryLocalizationSchema,
    putCategoryLocalizationSchema,
    deleteCategoryLocalizationSchema,
    PutCategoryLocalizationSchemaFields,
} from "../../../schemas/localization/category";
import { CategoryLocalization } from "../../../models/category-localization";
import { ApiError } from "../../../utils/types";

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse<
        | {
              categoryLocalization: CategoryLocalization | null;
          }
        | ApiError
    >
): Promise<void> {
    const categoryLocalizationService: CategoryLocalizationService =
        req.scope.resolve("categoryLocalizationService");

    const parsed = getCategoryLocalizationSchema.safeParse(req.query);
    if (!parsed.success) {
        res.status(400).json({ message: "Invalid request query" });
        return;
    }

    const categoryLocalization = await categoryLocalizationService.getOne(
        parsed.data.category_id,
        parsed.data.language_code
    );

    res.status(200).json({ categoryLocalization });
}

export async function POST(
    req: MedusaRequest<PutCategoryLocalizationSchemaFields>,
    res: MedusaResponse
): Promise<void> {
    const parsedData = putCategoryLocalizationSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Invalid request body" });
        return;
    }

    const service: CategoryLocalizationService = req.scope.resolve(
        "categoryLocalizationService"
    );

    const localization = await service.upsert({
        ...parsedData.data,
    });

    res.status(200).json({ localization });
}

export async function DELETE(
    req: MedusaRequest,
    res: MedusaResponse
): Promise<void> {
    const { category_id, language_code } = req.query;

    const parsed = deleteCategoryLocalizationSchema.safeParse({
        category_id,
        language_code,
    });

    if (!parsed.success) {
        res.status(400).json({ message: "Invalid request query" });
        return;
    }

    const service: CategoryLocalizationService = req.scope.resolve(
        "categoryLocalizationService"
    );

    await service.delete(parsed.data.category_id, parsed.data.language_code);
    res.status(204).send();
}
