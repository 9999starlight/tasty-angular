export interface Comment {
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
    createdAt: string
}