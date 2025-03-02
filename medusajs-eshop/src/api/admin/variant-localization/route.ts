import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import VariantLocalizationService from "../../../services/variant-localization";
import {
    getVariantLocalizationSchema,
    putVariantLocalizationSchema,
    deleteVariantLocalizationSchema,
    PutVariantLocalizationSchemaFields,
} from "../../../schemas/localization/variant";
import { VariantLocalization } from "../../../models/variant-localization";
import { ApiError } from "../../../utils/types";

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse<
        | {
              variantLocalization: VariantLocalization[] | null;
          }
        | ApiError
    >
): Promise<void> {
    console.log(req.query);
    const parsed = getVariantLocalizationSchema.safeParse(req.query);

    const variantLocalizationService: VariantLocalizationService =
        req.scope.resolve("variantLocalizationService");

    if (!parsed.success) {
        res.status(400).json({ message: "Invalid request query" });
        return;
    }

    const variantLocalization = await variantLocalizationService.getAll(
        parsed.data.variant_ids,
        parsed.data.language_code
    );

    res.status(200).json({ variantLocalization });
}

export async function POST(
    req: MedusaRequest<PutVariantLocalizationSchemaFields>,
    res: MedusaResponse
): Promise<void> {
    const parsedData = putVariantLocalizationSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Invalid request body" });
        return;
    }

    const service: VariantLocalizationService = req.scope.resolve(
        "variantLocalizationService"
    );

    const { variants, language_code } = parsedData.data;

    const localizations = await service.bulkUpsert(variants, language_code);

    res.status(200).json({ localizations });
}

export async function DELETE(
    req: MedusaRequest,
    res: MedusaResponse
): Promise<void> {
    const parsed = deleteVariantLocalizationSchema.safeParse(req.query);

    if (!parsed.success) {
        res.status(400).json({ message: "Invalid request query" });
        return;
    }

    const service: VariantLocalizationService = req.scope.resolve(
        "variantLocalizationService"
    );

    await service.delete(parsed.data.variant_id, parsed.data.language_code);
    res.status(204).send();
}
