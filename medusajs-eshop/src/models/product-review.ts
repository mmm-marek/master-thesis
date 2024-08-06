import { BaseEntity, Product } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";
import { Max, Min } from "class-validator";
import {
    BeforeInsert,
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
} from "typeorm";

@Entity()
export class ProductReview extends BaseEntity {
    @Index()
    @Column({ type: "varchar", nullable: true })
    product_id: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: "product_id" })
    product: Product;

    @Column({ type: "varchar", nullable: false })
    title: string;

    @Column({ type: "varchar", nullable: false })
    user_name: string;

    @Column({ type: "int" })
    @Min(1)
    @Max(5)
    rating: number;

    @Column({ nullable: false })
    content: string;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "prev");
    }
}
