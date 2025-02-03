import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class VariantLocalization1737908567451 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "variant_localization" ("id" character varying NOT NULL, 
            "title" character varying NOT NULL, "language_code" character varying(5) NOT NULL,
            "variant_id" character varying NOT NULL,
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now())`
        );
        await queryRunner.createPrimaryKey("variant_localization", ["id"]);
        await queryRunner.createForeignKey(
            "variant_localization",
            new TableForeignKey({
                columnNames: ["variant_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "product_variant",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("variant_localization", true);
    }
}
