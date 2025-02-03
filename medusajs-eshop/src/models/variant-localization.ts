import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity, ProductVariant } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity()
export class VariantLocalization extends BaseEntity {
    @Column({ type: "varchar" })
    title: string;

    @Column({ type: "varchar", length: 5 })
    language_code: string;

    @Column({ type: "varchar" })
    variant_id: string;

    @OneToOne(() => ProductVariant)
    @JoinColumn({ name: "variant_id" })
    variant: ProductVariant;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "variant_localization");
    }
}
