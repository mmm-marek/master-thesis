import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class ProductLocalization1737908559622 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "product_localization" ("id" character varying NOT NULL, 
            "title" character varying NOT NULL,
            "subtitle" character varying NOT NULL,
            "description" character varying NOT NULL,
            "material" character varying NOT NULL,
            "language_code" character varying(5) NOT NULL,
            "product_id" character varying NOT NULL,
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now())`
        );
        await queryRunner.createPrimaryKey("product_localization", ["id"]);
        await queryRunner.createForeignKey(
            "product_localization",
            new TableForeignKey({
                columnNames: ["product_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "product",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("product_localization", true);
    }
}
