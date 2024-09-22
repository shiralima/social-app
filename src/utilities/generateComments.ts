import { faker } from '@faker-js/faker';
import { CommentType } from '../interfaces/comment.interface';


// Generates comments with random post id each time
export const generateComments = (postIds: string[], amount: number) => {
    const comments: CommentType[] = [];

    for (let i = 0; i < amount; i++) {
        const postId = faker.helpers.arrayElement(postIds); // Get random id 

        const fakeComment: CommentType = {
            id: faker.string.uuid(),
            postId,
            content: faker.lorem.sentence(),
            author: faker.person.fullName(),
        };

        comments.push(fakeComment);
    }

    return comments;
};