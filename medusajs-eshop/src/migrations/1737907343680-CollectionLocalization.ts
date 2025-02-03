import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CollectionLocalization1737907343680 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "collection_localization" ("id" character varying NOT NULL, 
            "title" character varying NOT NULL, "language_code" character varying(5) NOT NULL,
            "collection_id" character varying NOT NULL,
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now())`
        );
        await queryRunner.createPrimaryKey("collection_localization", ["id"]);
        await queryRunner.createForeignKey(
            "collection_localization",
            new TableForeignKey({
                columnNames: ["collection_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "product_collection",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("collection_localization", true);
    }
}
