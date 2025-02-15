import { TransactionBaseService } from "@medusajs/medusa";
import { CategoryLocalization } from "../models/category-localization";
import { CategoryLocalizationRepository } from "../repositories/category-localization";

class CategoryLocalizationService extends TransactionBaseService {
    protected repository_: typeof CategoryLocalizationRepository;

    constructor(container: any) {
        super(container);
        this.repository_ = container.categoryLocalizationRepository;
    }

    async upsert(
        data: Pick<
            CategoryLocalization,
            "category_id" | "language_code" | "name" | "description"
        >
    ) {
        const repo = this.activeManager_.withRepository(this.repository_);

        const existing = await repo.findOne({
            where: {
                category_id: data.category_id,
                language_code: data.language_code,
            },
        });

        if (existing) {
            existing.name = data.name;
            existing.description = data.description;
            return await repo.save(existing);
        }

        const created = repo.create(data);
        return await repo.save(created);
    }

    async delete(category_id: string, language_code: string) {
        const repo = this.activeManager_.withRepository(this.repository_);

        await repo.delete({
            category_id,
            language_code,
        });
    }

    async getOne(category_id: string, language_code: string) {
        const repo = this.activeManager_.withRepository(this.repository_);

        return await repo.findOne({
            where: { category_id, language_code },
        });
    }
}

export default CategoryLocalizationService;
