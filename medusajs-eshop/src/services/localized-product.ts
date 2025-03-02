import { Product, TransactionBaseService } from "@medusajs/medusa";
import { CategoryLocalizationRepository } from "../repositories/category-localization";
import ProductRepository from "@medusajs/medusa/dist/repositories/product";
import { ProductLocalizationRepository } from "../repositories/product-localization";
import { VariantLocalizationRepository } from "../repositories/variant-localization";
import { In } from "typeorm";

class LocalizedProductService extends TransactionBaseService {
    protected productRepository: typeof ProductRepository;
    protected productLocalizationRepository: typeof ProductLocalizationRepository;
    protected categoryLocalizationRepository_: typeof CategoryLocalizationRepository;
    protected variantLocalizationRepository_: typeof VariantLocalizationRepository;

    constructor(container: any) {
        super(container);
        this.productRepository = container.productRepository;
        this.productLocalizationRepository =
            container.productLocalizationRepository;
        this.categoryLocalizationRepository_ =
            container.categoryLocalizationRepository;
        this.variantLocalizationRepository_ =
            container.variantLocalizationRepository;
    }

    async getAll(language_code: string, category_handle?: string) {
        const productRepository = this.activeManager_.withRepository(
            this.productRepository
        );
        const productLocalizationRepository =
            this.activeManager_.withRepository(
                this.productLocalizationRepository
            );
        const categoryLocalizationRepository =
            this.activeManager_.withRepository(
                this.categoryLocalizationRepository_
            );
        const variantLocalizationRepository =
            this.activeManager_.withRepository(
                this.variantLocalizationRepository_
            );

        const products = await productRepository.find({
            relations: {
                categories: true,
                variants: true,
            },
            where: category_handle
                ? {
                      categories: { handle: category_handle },
                  }
                : {},
        });

        const localizedProducts = await productLocalizationRepository.find({
            where: { language_code, product_id: In(products.map((p) => p.id)) },
        });
        const localizedCategories = await categoryLocalizationRepository.find({
            where: {
                language_code,
                category_id: In(
                    products
                        .map((product) =>
                            product.categories.map((category) => category.id)
                        )
                        .flat()
                ),
            },
        });
        const localizedVariants = await variantLocalizationRepository.find({
            where: {
                language_code,
                variant_id: In(
                    products
                        .map((product) =>
                            product.variants.map((variant) => variant.id)
                        )
                        .flat()
                ),
            },
        });

        return products.map((product) => {
            const productsCategories = product.categories.map((category) => {
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
            const productsVariants = product.variants.map((variant) => {
                const localizedVariant = localizedVariants.find(
                    (lv) => lv.variant_id === variant.id
                );
                return {
                    ...variant,
                    title: localizedVariant?.title || variant.title,
                };
            });
            const localizedProduct = localizedProducts.find(
                (lp) => lp.product_id === product.id
            );
            return {
                ...product,
                title: localizedProduct?.title || product.title,
                subtitle: localizedProduct?.subtitle || product.subtitle,
                description:
                    localizedProduct?.description || product.description,
                material: localizedProduct?.material || product.material,
                categories: productsCategories,
                variants: productsVariants,
            } as Product;
        });
    }

    async getOne(language_code: string, product_handle: string) {
        const productRepository = this.activeManager_.withRepository(
            this.productRepository
        );
        const productLocalizationRepository =
            this.activeManager_.withRepository(
                this.productLocalizationRepository
            );
        const categoryLocalizationRepository =
            this.activeManager_.withRepository(
                this.categoryLocalizationRepository_
            );
        const variantLocalizationRepository =
            this.activeManager_.withRepository(
                this.variantLocalizationRepository_
            );

        const product = await productRepository.findOne({
            relations: {
                variants: {
                    prices: true,
                },
                categories: true,
            },
            where: { handle: product_handle },
        });

        if (!product) {
            return null;
        }

        const localizedProduct = await productLocalizationRepository.findOne({
            where: { language_code, product_id: product.id },
        });
        const localizedCategories = await categoryLocalizationRepository.find({
            where: {
                language_code,
                category_id: In(
                    product.categories.map((category) => category.id)
                ),
            },
        });
        const localizedVariants = await variantLocalizationRepository.find({
            where: {
                language_code,
                variant_id: In(product.variants.map((variant) => variant.id)),
            },
        });

        const productsCategories = product.categories.map((category) => {
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
        const productsVariants = product.variants.map((variant) => {
            const localizedVariant = localizedVariants.find(
                (lv) => lv.variant_id === variant.id
            );
            return {
                ...variant,
                title: localizedVariant?.title || variant.title,
            };
        });

        return {
            ...product,
            title: localizedProduct?.title || product.title,
            subtitle: localizedProduct?.subtitle || product.subtitle,
            description: localizedProduct?.description || product.description,
            material: localizedProduct?.material || product.material,
            categories: productsCategories,
            variants: productsVariants,
        } as Product;
    }
}

export default LocalizedProductService;
