export interface PostType {
    id: string;
    likes: number; // Default value is 0
    author: string;
    content: string;
    createDate: Date; 
    imageUrl?: string;
}