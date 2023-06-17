import axios from 'axios';

import { IRepository } from "../Repository";

class JsonServerRepository<T> implements IRepository<T> {
	
	private static baseURL = process.env['JSON_SERVER_BASE_URL'];
	private static header = { headers: { Accept: 'application/json' }};

	private path: string;

	constructor(path: string) {
		this.path = JsonServerRepository.baseURL + (path.charAt(0) === '/' ? path : '/' + path);
	}

	async findAll(): Promise<T[]> {
		const result = await axios.get<T[]>(this.path, JsonServerRepository.header);
		return result.data;
	}

	async findById(id: number): Promise<T> {
		const result = await axios.get<T>(this.path + '/' + id, JsonServerRepository.header);
		return result.data; 
	}

	async create(entity: T): Promise<T> {
		const result = await axios.post<T>(this.path, entity, JsonServerRepository.header);
		return result.data; 
	}

	async update(id: number, entity: T): Promise<T> {
		const result = await axios.put<T>(this.path + '/' + id, entity, JsonServerRepository.header);
		return result.data; 
	}

	async delete(id: number): Promise<void> {
		await axios.delete<T>(this.path + '/' + id, JsonServerRepository.header);
	}
}

export {
	JsonServerRepository
};