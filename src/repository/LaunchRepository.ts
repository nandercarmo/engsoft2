import { dataSource } from "../database/config/dataSourceConfig";
import { Launch } from "../model/Launch";
import { IRepository } from "./Repository";

class LaunchRepository implements IRepository<Launch> {

	private repository = dataSource.getRepository(Launch);

	async findAll(): Promise<Launch[]> {
		return await this.repository.find();
	}

	async findById(id: number): Promise<Launch> {
		const result = await this.repository.findOneBy({ id });

		if (result === null) {
			throw new Error('404 Not Found: Não foi possível encontrar o recurso solicitado');
		}

		return result;
	}

	async create(entity: Launch): Promise<Launch> {
		return await this.repository.save(entity);
	}

	async update(id: number, entity: Launch): Promise<Launch> {
		return await this.repository.save(entity);
	}

	async delete(id: number): Promise<void> {
		await this.repository.delete(id);
	}
}

export {
	LaunchRepository
};
