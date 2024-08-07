import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import ProductReviewService from "../../../../../services/product-review";
import { ProductReview } from "../../../../../models/product-review";
import {
    createReviewSchema,
    CreateReviewSchemaFields,
} from "../../../../../schemas/reviewSchemas";

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse<{ reviews: ProductReview[] }>
): Promise<void> {
    const productReviewRepository: ProductReviewService = req.scope.resolve(
        "productReviewService"
    );
    const reviews = await productReviewRepository.list(req.params.id);
    res.status(200).json({ reviews });
}

export async function POST(
    req: MedusaRequest<CreateReviewSchemaFields>,
    res: MedusaResponse
): Promise<void> {
    if (!req.user?.customer_id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const productReviewRepository: ProductReviewService = req.scope.resolve(
        "productReviewService"
    );

    const parsedData = createReviewSchema.safeParse(req.body);
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
