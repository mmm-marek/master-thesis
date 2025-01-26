import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CategoryLocalization1737908551054 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "category_localization" ("id" character varying NOT NULL, 
            "name" character varying NOT NULL, "description" character varying NOT NULL,
            "language_code" character varying(5) NOT NULL,
            "category_id" character varying NOT NULL,
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now())`
        );
        await queryRunner.createPrimaryKey("category_localization", ["id"]);
        await queryRunner.createForeignKey(
            "category_localization",
            new TableForeignKey({
                columnNames: ["category_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "product_category",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("category_localization", true);
    }
}
