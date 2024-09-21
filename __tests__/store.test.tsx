import { FeedStore } from '../src/store/feed.store';
import { STUBS_POSTS } from '../src/consts/fakeData'; 

jest.useFakeTimers(); 

describe("FeedStore", () => {
    let store: FeedStore;

    beforeEach(() => {
        store = new FeedStore();
        
    });

    afterEach(() => {
        store.reset(); 
    });

    it("should fetch posts", () => {
        store.fetchPosts(0, 2);
        jest.runAllTimers(); 

        expect(store.posts.length).toBe(2);
        expect(store.posts).toEqual(STUBS_POSTS.slice(0, 2)); 
    });


    it('should not fetch more post than  posts length', () => {

        store.fetchPosts(0, STUBS_POSTS.length + 1); 

        jest.runAllTimers();

        expect(store.posts.length).toBe(store.posts.length + STUBS_POSTS.length);
    });
});