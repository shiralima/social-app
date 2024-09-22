# Social Feed App

## Table of Contents
[App Explanations](#app-explanations)
- [Social Feed App](#social-feed-app)
  - [Table of Contents](#table-of-contents)
  - [App Explanations](#app-explanations)
    - [Basic Explanation](#basic-explanation)
    - [Technologies](#technologies)
    - [Optimizations](#optimizations)
    - [Stub Data](#stub-data)
    - [Tests](#tests)
  - [Run Project](#run-project)
    - [Set Up](#set-up)
      - [Pre Requisites](#pre-requisites)
      - [Installations](#installations)
    - [Run the App](#run-the-app)

## App Explanations

### Basic Explanation
This app is a social feed app. It features an infinite scroll feed with posts and comments.
For every post, we have these components: author, content, creation date, likes, comments, and an optional image URL. In comments, we have these components: author and content.

### Technologies
- TypeScript
- React Native
- Expo
- NPM
- MobX
- Babel
- Jest
- Faker
- GitHub Actions (for running tests)
- ESLint

### Optimizations
Optimize the app by using FlatList with best practices. Load new posts only when the user scrolls and load just a few posts at a time. Use React.memo and useCallback for better performance. For displaying posts with comments, show the first comment and the number of comments per post. These functions improve performance if the data is stored in a database. It's better to use `findFirst` and `count` than to bring all comments at once. This approach also enhances UI/UX by not showing all comments initially. I achieve this with a Map structure, which provides better performance.

### Stub Data
For stub data for posts and comments, I use the Faker library. The amount of data generated is controlled by data constants. I generate different posts with varying lengths, likes, comments, images, and without images.

### Tests
Create tests for the store with Jest in the `__tests__` folder. I wrote unit tests (UT) for every important function in the store.

> [TIP]  
> For checking a large amount of data, we can modify the store creation as follows - when creating the store, change the default amounts.
> ```
>   beforeEach(() => {
>       store = new FeedStore(NEW_POSTS_NUMBER, NEW_COMMENTS_NUMBER);
>   });
> ```

## Run Project

### Set Up

#### Pre Requisites
1. If you don't have nvm installed, you can install it by following the instructions here:
https://monovm.com/blog/install-nvm-on-ubuntu/#How-to-Install-NVM-on-Ubuntu?

2. Node version 20
If you already have Node 20 installed, you can use it by running `nvm use 20`.

If not, install Node 20 and npm by running:
```
    nvm install 20
    nvm use 20
```

3. Expo CLI
Install Expo CLI globally by running:
`npm install -g expo-cli`

4. Expo Go
Install Expo Go on your device/emulator

#### Installations
Clone the app from GitHub:

Using HTTPS:
git clone https://github.com/shiralima/social-app.git


### Run the App
First, you have to install all packages:
```
    cd social-feed-app
    npm install
```

Than, run the tests to ensure everything works as expected:
`npm run test`

Then run the app via:
`npm start`