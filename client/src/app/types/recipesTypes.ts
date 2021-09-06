import { RecipeResponse } from './RecipeResponse';
export interface RecipesResponse {
	response: {
	recipes: RecipeResponse;
	count: number;
	}
}

/*export default interface Recipe {
	_id: string;
	mealName: string;
	intro: string;
	author: {
		_id: string;
		username: string;
		image: string;
	};
	comments: string[];
	createdAt: string;
	dishType: string;
	glutenFree: boolean;
	level: string;
	rates: Rate[];
	request: {
		type: string;
		url: string;
	}
	vegeterian: boolean;
	timing?: number;
	persons?: number;
	steps?: {step: string;}[];
	ingredients?: {ingredient: string; amount: number}[];
	regional?: string;
	image?: string;
}

export default interface Rate {
	ratedBy: string;
	rate: number;
}*/

