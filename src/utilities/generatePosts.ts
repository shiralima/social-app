import { faker } from "@faker-js/faker";
import { PostType } from "@/interfaces/post.interface";

// This way, for local testing, you can generate posts with large data sets
export const generatePosts = (amount: number): PostType[] => {
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
}
