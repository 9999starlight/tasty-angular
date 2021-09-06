export interface RecipeResponse {
	_id: string;
	mealName: string;
	intro: string;
	author: {
		_id: string;
		username: string;
		image: string;
	};
	comments: string[] | [];
	createdAt: string;
	dishType: string;
	glutenFree: boolean;
	rates: {
        ratedBy: string;
        rate: number;
    }[] | [];
	request: {
		type: string;
		url: string;
	}
	image?: string | undefined | null;
}