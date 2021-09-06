export interface SingleRecipe {
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
	glutenFree?: boolean;
	rates: {
        ratedBy: string;
        rate: number;
    }[] | [];
	request: {
		type: string;
		url: string;
	}
	level?: string;
	vegeterian?: boolean;
	timing: number;
	persons: number;
	steps: {
        step: string;
    }[];
	ingredients: {
        ingredient: string;
        amount: number
    }[];
	regional?: string;
	image?: string | undefined | null;
}