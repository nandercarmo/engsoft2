import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntities1682003185225 implements MigrationInterface {
    name = 'CreateEntities1682003185225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "crewmans" ("id" SERIAL NOT NULL, "name" text NOT NULL, "patent" text NOT NULL, CONSTRAINT "PK_7b8e9a58e3cb0d3923fd782bc56" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "crews" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_4316f43ffc0d2bbb0c4c767ba5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rockets" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_31ca8747d519fe8b032d01a1354" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "launchs" ("id" SERIAL NOT NULL, "launch_code" text NOT NULL, "date" date NOT NULL, "success" boolean NOT NULL, "rocket_id" integer, "crew_id" integer, CONSTRAINT "REL_2012a0decd7f9a88bbdf29aabd" UNIQUE ("rocket_id"), CONSTRAINT "REL_6381cb273a2add9f36917671b6" UNIQUE ("crew_id"), CONSTRAINT "PK_1c9d26d396ec884b8494797f7ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "crew_crewmans" ("crewsId" integer NOT NULL, "crewmansId" integer NOT NULL, CONSTRAINT "PK_9ed366fbcef219fbdab99872ec4" PRIMARY KEY ("crewsId", "crewmansId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_135251b495d030a68215fb46d7" ON "crew_crewmans" ("crewsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ebf000e899c5cea5849c6e7251" ON "crew_crewmans" ("crewmansId") `);
        await queryRunner.query(`ALTER TABLE "launchs" ADD CONSTRAINT "FK_2012a0decd7f9a88bbdf29aabdb" FOREIGN KEY ("rocket_id") REFERENCES "rockets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "launchs" ADD CONSTRAINT "FK_6381cb273a2add9f36917671b67" FOREIGN KEY ("crew_id") REFERENCES "crews"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "crew_crewmans" ADD CONSTRAINT "FK_135251b495d030a68215fb46d72" FOREIGN KEY ("crewsId") REFERENCES "crews"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "crew_crewmans" ADD CONSTRAINT "FK_ebf000e899c5cea5849c6e72512" FOREIGN KEY ("crewmansId") REFERENCES "crewmans"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crew_crewmans" DROP CONSTRAINT "FK_ebf000e899c5cea5849c6e72512"`);
        await queryRunner.query(`ALTER TABLE "crew_crewmans" DROP CONSTRAINT "FK_135251b495d030a68215fb46d72"`);
        await queryRunner.query(`ALTER TABLE "launchs" DROP CONSTRAINT "FK_6381cb273a2add9f36917671b67"`);
        await queryRunner.query(`ALTER TABLE "launchs" DROP CONSTRAINT "FK_2012a0decd7f9a88bbdf29aabdb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ebf000e899c5cea5849c6e7251"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_135251b495d030a68215fb46d7"`);
        await queryRunner.query(`DROP TABLE "crew_crewmans"`);
        await queryRunner.query(`DROP TABLE "launchs"`);
        await queryRunner.query(`DROP TABLE "rockets"`);
        await queryRunner.query(`DROP TABLE "crews"`);
        await queryRunner.query(`DROP TABLE "crewmans"`);
    }

}
