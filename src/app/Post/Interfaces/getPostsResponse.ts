export interface GetPostsResponse {
    messgae: string;
    posts:   Post[];
}

export interface Post {
    titulo:    string;
    fechaPost: Date;
    image:     string;
}
