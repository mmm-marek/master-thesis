import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import ProductReviewService from "src/services/product-review";
import { ReviewSchema, reviewSchema } from "./schemas";

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
): Promise<void> {
    const productReviewRepository: ProductReviewService = req.scope.resolve(
        "productReviewService"
    );
    const reviews = await productReviewRepository.list(req.params.id);
    res.status(200).json({ reviews });
}

export async function POST(
    req: MedusaRequest<ReviewSchema>,
    res: MedusaResponse
): Promise<void> {
    const productReviewRepository: ProductReviewService = req.scope.resolve(
        "productReviewService"
    );

    const parsedData = reviewSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Invalid request body" });
        return;
    }

    const review = await productReviewRepository.create({
        product_id: req.params.id,
        ...parsedData.data,
    });

    res.status(201).json({ review });
}
