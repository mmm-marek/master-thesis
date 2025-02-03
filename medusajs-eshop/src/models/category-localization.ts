import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity, ProductCategory } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity()
export class CategoryLocalization extends BaseEntity {
    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar" })
    description: string;

    @Column({ type: "varchar", length: 5 })
    language_code: string;

    @Column({ type: "varchar" })
    category_id: string;

    @OneToOne(() => ProductCategory)
    @JoinColumn({ name: "category_id" })
    category: ProductCategory;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "category_localization");
    }
}
