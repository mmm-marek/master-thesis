import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import ProductLocalizationService from "../../../services/product-localization";
import { ProductLocalization } from "../../../models/product-localization";
import { ApiError } from "../../../utils/types";
import {
    getProductLocalizationSchema,
    putProductLocalizationSchema,
    deleteProductLocalizationSchema,
    PutProductLocalizationSchemaFields,
} from "../../../schemas/localization/product";

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse<
        | {
              productLocalization: ProductLocalization | null;
          }
        | ApiError
    >
): Promise<void> {
    const productLocalizationService: ProductLocalizationService =
        req.scope.resolve("productLocalizationService");

    const parsed = getProductLocalizationSchema.safeParse(req.query);
    if (!parsed.success) {
        res.status(400).json({ message: "Invalid request query" });
        return;
    }

    const productLocalization = await productLocalizationService.getOne(
        parsed.data.product_id,
        parsed.data.language_code
    );

    res.status(200).json({ productLocalization });
}

export async function POST(
    req: MedusaRequest<PutProductLocalizationSchemaFields>,
    res: MedusaResponse
): Promise<void> {
    const parsedData = putProductLocalizationSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Invalid request body" });
        return;
    }

    const service: ProductLocalizationService = req.scope.resolve(
        "productLocalizationService"
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
    const parsed = deleteProductLocalizationSchema.safeParse(req.query);

    if (!parsed.success) {
        res.status(400).json({ message: "Invalid request query" });
        return;
    }

    const service: ProductLocalizationService = req.scope.resolve(
        "productLocalizationService"
    );

    await service.delete(parsed.data.product_id, parsed.data.language_code);
    res.status(204).send();
}
