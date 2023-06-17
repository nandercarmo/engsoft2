import { dataSource } from "../database/config/dataSourceConfig";
import { Rocket } from "../model/Rocket";
import { IRepository } from "./Repository";

class RocketRepository implements IRepository<Rocket> {

	private repository = dataSource.getRepository(Rocket);

	async findAll(): Promise<Rocket[]> {
		return await this.repository.find();
	}

	async findById(id: number): Promise<Rocket> {

		const result = await this.repository.findOneBy({ id });

		if (result === null) {
			throw new Error('Não foi possível encontrar o recurso solicitado');
		}

		return result;
	}

	async create(entity: Rocket): Promise<Rocket> {
		const rocket = this.repository.create({ name: entity.name });
		await this.repository.save(rocket);
		return rocket;
	}

	async update(id: number, entity: Rocket): Promise<Rocket> {

		const result = await this.repository.findOneBy({ id });

		if (result === null) {
			throw new Error('404 Not Found: Não foi possível encontrar o recurso para ser atualizado');
		}

		result.id = entity.id;
		result.name = entity.name;

		await this.repository.save(result);

		return result;
	}

	async delete(id: number): Promise<void> {
		await this.repository.delete(id);
	}
}

export {
	RocketRepository
};
