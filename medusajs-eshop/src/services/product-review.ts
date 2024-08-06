import { TransactionBaseService } from "@medusajs/medusa";
import { ProductReview } from "src/models/product-review";
import { ProductReviewRepository } from "src/repositories/product-review";

class ProductReviewService extends TransactionBaseService {
    protected productReviewRepository_: typeof ProductReviewRepository;

    constructor(container: any) {
        super(container);
        this.productReviewRepository_ = container.productReviewRepository;
    }

    async list(product_id: string): Promise<ProductReview[]> {
        const productReviewRepo = this.activeManager_.withRepository(
            this.productReviewRepository_
        );
        return await productReviewRepo.find({
            where: {
                product_id,
            },
        });
    }

    async create(
        data: Omit<
            ProductReview,
            "product" | "id" | "created_at" | "updated_at"
        >
    ): Promise<ProductReview> {
        const productReviewRepo = this.activeManager_.withRepository(
            this.productReviewRepository_
        );
        const createdReview = productReviewRepo.create(data);
        return await productReviewRepo.save(createdReview);
    }
}

export default ProductReviewService;
