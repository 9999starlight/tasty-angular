export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterCredentials {
    username: string;
    password: string;
    user_image?: File;
}

export interface UserResponse {
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
    iat: number;
    exp: number;
}

export interface UpdatedUser {
    username: string;
    userId: string;
    isAdmin: boolean;
    isDisabled: boolean;
    createdAt: string;
    createdRecipes: [];
    favorites: string[];
    user_image: string;
}