interface IRepository<EntityType> {
	findAll(): Promise<EntityType[]>;
	findById(id: number): Promise<EntityType>;
	create(entity: EntityType): Promise<EntityType>;
	update(id:number, entity: EntityType): Promise<EntityType>;
	delete(id: number): Promise<void>;
}

export {
	IRepository
};
