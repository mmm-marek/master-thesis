import { MedusaRequest, MedusaResponse, Product } from "@medusajs/medusa";
import { ApiError } from "../../../../utils/types";
import LocalizedProductService from "../../../../services/localized-product";

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse<
        | {
              localizedProduct: Product | null;
          }
        | ApiError
    >
): Promise<void> {
    const localizedProductService: LocalizedProductService = req.scope.resolve(
        "localizedProductService"
    );

    const language_code = req.headers["accept-language"]?.toUpperCase() ?? "EN";
    const product_handle = req.params.handle;

    const localizedProduct = await localizedProductService.getOne(
        language_code,
        product_handle
    );

    res.status(200).json({ localizedProduct });
}
