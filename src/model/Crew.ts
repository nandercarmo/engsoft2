import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Crewman } from "./Crewman";

@Entity('crews')
class Crew {

	@PrimaryGeneratedColumn({ name: 'id' })
	id: number;

	@Column({ type: 'text', name: 'name' })
	name: string;

	@ManyToMany(() => Crewman, { eager: true })
	@JoinTable({ name: 'crew_crewmans' })
	crewmans: Crewman[];

	constructor(
		id: number,
		name: string,
		crewmans: Crewman[]
	) {
		this.id = id;
		this.name = name;
		this.crewmans = crewmans;
	}
}

export {
	Crew
};
