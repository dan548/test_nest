export interface UserResponse {
    user: UserData
}

export interface UserData {
    uuid: string;
    username: string;
    email: string;
    board_title: string;
}