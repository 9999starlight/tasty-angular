import { FormControl } from "@angular/forms"

export interface RecipeComment {
    _id: string,
    author: {
        user_image?: {
            url: string,
            id: string
        },
        username: string,
        _id: string
    },
    commentBody: string,
    commentedRecipeId: string,
    createdAt: string,
    request?: {
        type: string,
        url: string
      }
}

export interface CommentPost {
    commentedRecipeId: string,
    author: string,
    commentBody: string
}

export interface CommentForm {
    commentedRecipeId: FormControl<string>;
    author: FormControl<string>;
    commentBody: FormControl<string>;
}