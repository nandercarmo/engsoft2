interface IRocketDto {
	id?: number;
	name: string;
};

interface ICreateRocketDto {
	name: string;
};

interface IUpdateRocketDto {
	name: string;
};

export {
	IRocketDto,
	ICreateRocketDto,
	IUpdateRocketDto
}