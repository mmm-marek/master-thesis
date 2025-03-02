import { TransactionBaseService } from "@medusajs/medusa";
import { CollectionLocalization } from "../models/collection-localization";
import { CollectionLocalizationRepository } from "../repositories/collection-localization";

class CollectionLocalizationService extends TransactionBaseService {
    protected repository_: typeof CollectionLocalizationRepository;

    constructor(container: any) {
        super(container);
        this.repository_ = container.collectionLocalizationRepository;
    }

    async upsert(
        data: Pick<
            CollectionLocalization,
            "collection_id" | "language_code" | "title"
        >
    ) {
        const repo = this.activeManager_.withRepository(this.repository_);

        const existing = await repo.findOne({
            where: {
                collection_id: data.collection_id,
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

    async delete(collection_id: string, language_code: string) {
        const repo = this.activeManager_.withRepository(this.repository_);

        await repo.delete({
            collection_id,
            language_code,
        });
    }

    async getOne(collection_id: string, language_code: string) {
        const repo = this.activeManager_.withRepository(this.repository_);

        return await repo.findOne({
            where: { collection_id, language_code },
        });
    }
}

export default CollectionLocalizationService;
