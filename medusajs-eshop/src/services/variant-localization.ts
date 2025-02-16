import { TransactionBaseService } from "@medusajs/medusa";
import { VariantLocalization } from "../models/variant-localization";
import { VariantLocalizationRepository } from "../repositories/variant-localization";

class VariantLocalizationService extends TransactionBaseService {
    protected repository_: typeof VariantLocalizationRepository;

    constructor(container: any) {
        super(container);
        this.repository_ = container.variantLocalizationRepository;
    }

    async upsert(
        data: Pick<
            VariantLocalization,
            "variant_id" | "language_code" | "title"
        >
    ) {
        const repo = this.activeManager_.withRepository(this.repository_);

        const existing = await repo.findOne({
            where: {
                variant_id: data.variant_id,
                language_code: data.language_code,
            },
        });

        if (existing) {
            existing.title = data.title;
            return await repo.save(existing);
        }

        const created = repo.create(data);
        return await repo.save(created);
    }

    async delete(variant_id: string, language_code: string) {
        const repo = this.activeManager_.withRepository(this.repository_);

        await repo.delete({
            variant_id,
            language_code,
        });
    }

    async getOne(variant_id: string, language_code: string) {
        const repo = this.activeManager_.withRepository(this.repository_);

        return await repo.findOne({
            where: { variant_id, language_code },
        });
    }
}

export default VariantLocalizationService;
