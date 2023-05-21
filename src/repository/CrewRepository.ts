import { dataSource } from "../database/config/dataSourceConfig";
import { Crew } from "../model/Crew";
import { IRepository } from "./Repository";

class CrewRepository implements IRepository<Crew> {

	private repository = dataSource.getRepository(Crew);

	async findAll(): Promise<Crew[]> {
		return await this.repository.find();
	}

	async findById(id: number): Promise<Crew> {

		const result = await this.repository.findOneBy({ id });

		if (result === null) {
			throw new Error('404 Not Found: Não foi possível encontrar o recurso solicitado');
		}

		return result;
	}

	async create(entity: Crew): Promise<Crew> {
		const crew = this.repository.create({
			name: entity.name,
			crewmans: entity.crewmans
		});
		await this.repository.save(crew);
		return crew;
	}

	async update(id: number, entity: Crew): Promise<Crew> {
		return await this.repository.save(entity);

	}

	async delete(id: number): Promise<void> {
		await this.repository.delete(id);
	}
}

export {
	CrewRepository
};
