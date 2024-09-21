import { faker } from '@faker-js/faker';
import { PostType } from '../interfaces/post.interface';
import { CommentType } from '../interfaces/comment.interface';

// This stub data for the app creates random data using faker each time
// This way, for local testing, you can generate posts with large data sets
const generatePosts = (amount: number): PostType[] => {
    const posts: PostType[] = [];

    for (let i = 0; i < amount; i++) {
        const hasImageInPost = faker.datatype.boolean(); // Flag to decide if an image will be included in this post
        const numberOfParagraphs = faker.number.int({ min: 1, max: 5 }); // Number of paragraphs in the post

        const fakePost: PostType = {
            id: faker.string.uuid(),
            content: faker.lorem.paragraphs(numberOfParagraphs),
            createDate: faker.date.past(),
            author: faker.person.fullName(),
            imageUrl: hasImageInPost ? faker.image.urlLoremFlickr() : undefined,
            likes: faker.number.int({ min: 0, max: 10000 })
        };

        posts.push(fakePost);
    }
    return posts;
};

// Generates comments with random post id each time
const generateComments = (postIds: string[], amount: number) => {
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

export const STUBS_POSTS = generatePosts(50);

const ids = STUBS_POSTS.map(({ id }) => id);

export const STUBS_COMMENTS = generateComments(ids, 150);