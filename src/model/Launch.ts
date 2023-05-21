import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Crew } from "./Crew";
import { Rocket } from "./Rocket";

@Entity('launchs')
class Launch {

	@PrimaryGeneratedColumn({ name: 'id' })
	id: number;

	@Column({ type: 'text', name: 'launch_code' })
	launchCode: string;

	@Column({ type: 'date', name: 'date' })
	date: string;

	@Column({ type: 'boolean', name: 'success' })
	success: boolean;

	@OneToOne(() => Rocket, { eager: true })
	@JoinColumn({ name: 'rocket_id' })
	rocket: Rocket;

	@OneToOne(() => Crew, { nullable: true, eager: true })
	@JoinColumn({ name: 'crew_id' })
	crew?: Crew;

	constructor(
		id: number,
		launchCode: string,
		date: string,
		success: boolean,
		rocket: Rocket,
		crew?: Crew
	) {
		this.id = id;
		this.launchCode = launchCode;
		this.date = date;
		this.success = success;
		this.rocket = rocket;
		this.crew = crew;
	}
}

export {
	Launch
};
