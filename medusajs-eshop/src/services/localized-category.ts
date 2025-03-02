import { ProductCategory, TransactionBaseService } from "@medusajs/medusa";
import ProductCategoryRepository from "@medusajs/medusa/dist/repositories/product-category";
import { CategoryLocalizationRepository } from "../repositories/category-localization";

class LocalizedCategoryService extends TransactionBaseService {
    protected categoryRepository_: typeof ProductCategoryRepository;
    protected categoryLocalizationRepository_: typeof CategoryLocalizationRepository;

    constructor(container: any) {
        super(container);
        this.categoryRepository_ = container.productCategoryRepository;
        this.categoryLocalizationRepository_ =
            container.categoryLocalizationRepository;
    }

    async getAll(language_code: string) {
        const categoryRepository = this.activeManager_.withRepository(
            this.categoryRepository_
        );
        const categoryLocalizationRepository =
            this.activeManager_.withRepository(
                this.categoryLocalizationRepository_
            );

        const categories = await categoryRepository.find();
        const localizedCategories = await categoryLocalizationRepository.find({
            where: { language_code },
        });

        const localizedCategoriesMap = categories.map((category) => {
            const localizedCategory = localizedCategories.find(
                (lc) => lc.category_id === category.id
            );

            return {
                ...category,
                name: localizedCategory?.name || category.name,
                description:
                    localizedCategory?.description || category.description,
            };
        });

        return localizedCategoriesMap as ProductCategory[];
    }

    async getOne(category_id: string, language_code: string) {
        const categoryRepository = this.activeManager_.withRepository(
            this.categoryRepository_
        );
        const categoryLocalizationRepository =
            this.activeManager_.withRepository(
                this.categoryLocalizationRepository_
            );

        const category = await categoryRepository.findOne({
            where: {
                id: category_id,
            },
        });

        if (!category) {
            return null;
        }

        const localizedCategory = await categoryLocalizationRepository.findOne({
            where: { category_id, language_code },
        });

        return {
            ...category,
            name: localizedCategory?.name || category.name,
            description: localizedCategory?.description || category.description,
        } as ProductCategory;
    }
}

export default LocalizedCategoryService;
