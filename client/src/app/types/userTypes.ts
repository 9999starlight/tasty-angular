export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterCredentials {
    username: string;
    password: string;
    user_image?: File;
}

export interface userResponse {
    message: string;
    token: string;
}

export interface CurrentUser {
    token: string;
    username: string;
    userId: string;
    isAdmin: boolean;
    isDisabled: boolean;
    createdAt: string;
    createdRecipes: [];
    favorites: string[];
    user_image: string;
    iat?: number;
    exp?: number;
}