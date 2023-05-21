import { dataSource } from "../database/config/dataSourceConfig";
import { Crewman } from "../model/Crewman";
import { IRepository } from "./Repository";

class CrewmanRepository implements IRepository<Crewman> {

	private repository = dataSource.getRepository(Crewman);

	async findAll(): Promise<Crewman[]> {
		return await this.repository.find();
	}

	async findById(id: number): Promise<Crewman> {

		const result = await this.repository.findOneBy({ id });

		if (result === null) {
			throw new Error('404 Not Found: Não foi possível encontrar o recurso solicitado');
		}

		return result;
	}

	async create(entity: Crewman): Promise<Crewman> {
		const crewman = this.repository.create({ name: entity.name, patent: entity.patent });
		await this.repository.save(crewman);
		return crewman;
	}

	async update(id: number, entity: Crewman): Promise<Crewman> {

		const result = await this.repository.findOneBy({ id });

		if (result === null) {
			throw new Error('Não foi possível encontrar o recurso para ser atualizado');
		}

		result.id = entity.id;
		result.name = entity.name;
		result.patent = entity.patent;

		await this.repository.save(result);

		return result;
	}

	async delete(id: number): Promise<void> {
		await this.repository.delete(id);
	}
}

export {
	CrewmanRepository
};
