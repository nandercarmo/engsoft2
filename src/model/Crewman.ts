import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('crewmans')
class Crewman {

	@PrimaryGeneratedColumn({ name: 'id' })
	id: number;

	@Column({ type: 'text', name: 'name' })
	name: string;

	@Column({ type: 'text', name: 'patent' })
	patent: string;

	constructor(id: number, name: string, patent: string) {
		this.id = id;
		this.name = name;
		this.patent = patent;
	}
}

export {
	Crewman
};
