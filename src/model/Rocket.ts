import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('rockets')
class Rocket {

	@PrimaryGeneratedColumn({ name: 'id' })
	id: number;
	
	@Column({type: 'text', name: 'name' })
	name: string;

	constructor( 
		id: number,
		name: string,
	) {
		this.id = id;
		this.name = name;
	}
}

export {
	Rocket
};
