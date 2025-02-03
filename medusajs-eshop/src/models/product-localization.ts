import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity, Product } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity()
export class ProductLocalization extends BaseEntity {
    @Column({ type: "varchar" })
    title: string;

    @Column({ type: "varchar" })
    subtitle: string;

    @Column({ type: "varchar" })
    description: string;

    @Column({ type: "varchar" })
    material: string;

    @Column({ type: "varchar", length: 5 })
    language_code: string;

    @Column({ type: "varchar" })
    product_id: string;

    @OneToOne(() => Product)
    @JoinColumn({ name: "product_id" })
    product: Product;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "product_localization");
    }
}
