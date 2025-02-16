import { TransactionBaseService } from "@medusajs/medusa";
import { ProductLocalization } from "../models/product-localization";
import { ProductLocalizationRepository } from "../repositories/product-localization";

class ProductLocalizationService extends TransactionBaseService {
    protected repository_: typeof ProductLocalizationRepository;

    constructor(container: any) {
        super(container);
        this.repository_ = container.productLocalizationRepository;
    }

    async upsert(
        data: Pick<
            ProductLocalization,
            | "product_id"
            | "language_code"
            | "title"
            | "subtitle"
            | "description"
            | "material"
        >
    ) {
        const repo = this.activeManager_.withRepository(this.repository_);

        const existing = await repo.findOne({
            where: {
                product_id: data.product_id,
                language_code: data.language_code,
            },
        });

        if (existing) {
            existing.title = data.title;
            existing.subtitle = data.subtitle;
            existing.description = data.description;
            existing.material = data.material;
            return await repo.save(existing);
        }

        const created = repo.create(data);
        return await repo.save(created);
    }

    async delete(product_id: string, language_code: string) {
        const repo = this.activeManager_.withRepository(this.repository_);

        await repo.delete({
            product_id,
            language_code,
        });
    }

    async getOne(product_id: string, language_code: string) {
        const repo = this.activeManager_.withRepository(this.repository_);

        return await repo.findOne({
            where: { product_id, language_code },
        });
    }
}

export default ProductLocalizationService;
