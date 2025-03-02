import { MedusaRequest, MedusaResponse, Product } from "@medusajs/medusa";
import { ApiError } from "../../../utils/types";
import LocalizedProductService from "../../../services/localized-product";
import { z } from "zod";

const querySchema = z.object({
    category_handle: z.string().optional(),
});

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse<
        | {
              localizedProducts: Product[] | null;
          }
        | ApiError
    >
): Promise<void> {
    const localizedProductService: LocalizedProductService = req.scope.resolve(
        "localizedProductService"
    );

    const language_code = req.headers["accept-language"]?.toUpperCase() ?? "EN";

    const parsedQuery = querySchema.safeParse(req.query);

    const localizedProducts = await localizedProductService.getAll(
        language_code,
        parsedQuery.data?.category_handle
    );

    res.status(200).json({ localizedProducts });
}
