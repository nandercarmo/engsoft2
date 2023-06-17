import { IRocketDto } from "../../src/dto/RocketDto";
import { Rocket } from "../../src/model/Rocket";

const mockedRocketDto1: IRocketDto = { id: 1, name: 'Rocket 1' };
const mockedRocketDto2: IRocketDto = { id: 2, name: 'Rocket 2' };

const mockedRocketDtos: IRocketDto[] = [
	mockedRocketDto1,
	mockedRocketDto2,
];

const mockedRocket1: Rocket = new Rocket(1, 'Rocket 1');
const mockedRocket2: Rocket = new Rocket(2, 'Rocket 2');

const mockedRockets: Rocket[] = [
	mockedRocket1,
	mockedRocket2
]

export {
	mockedRocketDto1 as mockedRocketDto,
	mockedRocketDtos,
	mockedRocket1 as mockedRocket,
	mockedRockets
};
