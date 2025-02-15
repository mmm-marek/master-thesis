import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import CollectionLocalizationService from "../../../services/collection-localization";
import {
    getCollectionLocalizationSchema,
    putCollectionLocalizationSchema,
    deleteCollectionLocalizationSchema,
    PutCollectionLocalizationSchemaFields,
} from "../../../schemas/localization/collection-localization-schemas";
import { CollectionLocalization } from "../../../models/collection-localization";
import { ApiError } from "../../../utils/types";

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse<
        | {
              collectionLocalization: CollectionLocalization | null;
          }
        | ApiError
    >
): Promise<void> {
    const collectionLocalizationService: CollectionLocalizationService =
        req.scope.resolve("collectionLocalizationService");

    const parsed = getCollectionLocalizationSchema.safeParse(req.query);
    if (!parsed.success) {
        res.status(400).json({ message: "Invalid request query" });
        return;
    }

    const collectionLocalization = await collectionLocalizationService.getOne(
        req.query.collection_id as string,
        req.query.language_code as string
    );

    res.status(200).json({ collectionLocalization });
}

export async function POST(
    req: MedusaRequest<PutCollectionLocalizationSchemaFields>,
    res: MedusaResponse
): Promise<void> {
    const parsedData = putCollectionLocalizationSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Invalid request body" });
        return;
    }

    const service: CollectionLocalizationService = req.scope.resolve(
        "collectionLocalizationService"
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
    const { collection_id, language_code } = req.query;

    const parsed = deleteCollectionLocalizationSchema.safeParse({
        collection_id,
        language_code,
    });

    if (!parsed.success) {
        res.status(400).json({ message: "Invalid request query" });
        return;
    }

    const service: CollectionLocalizationService = req.scope.resolve(
        "collectionLocalizationService"
    );

    await service.delete(parsed.data.collection_id, parsed.data.language_code);
    res.status(204).send();
}
