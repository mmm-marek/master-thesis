import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity, ProductCollection } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity()
export class CollectionLocalization extends BaseEntity {
    @Column({ type: "varchar" })
    title: string;

    @Column({ type: "varchar", length: 5 })
    language_code: string;

    @Column({ type: "varchar" })
    collection_id: string;

    @OneToOne(() => ProductCollection)
    @JoinColumn({ name: "collection_id" })
    collection: ProductCollection;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "collection_localization");
    }
}
