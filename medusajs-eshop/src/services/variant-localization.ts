import { TransactionBaseService } from "@medusajs/medusa";
import { VariantLocalization } from "../models/variant-localization";
import { VariantLocalizationRepository } from "../repositories/variant-localization";
import { EntityManager } from "typeorm";

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
        >,
        transactionManager?: EntityManager
    ) {
        const manager = transactionManager || this.activeManager_;
        const repo = manager.withRepository(this.repository_);

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

    async bulkUpsert(
        variantData: Array<{
            variant_id: string;
            title: string;
        }>,
        language_code: string
    ): Promise<VariantLocalization[]> {
        return await this.atomicPhase_(async (transactionManager) => {
            const results = await Promise.all(
                variantData.map((variant) =>
                    this.upsert(
                        {
                            variant_id: variant.variant_id,
                            title: variant.title,
                            language_code,
                        },
                        transactionManager
                    )
                )
            );

            return results;
        });
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
