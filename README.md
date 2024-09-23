# Social Feed App

## Table of Contents
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
For every post, we have these components: author, content, creation date, likes, comments (optional), and an image (optional). In comments, we have these components: author and content.

### Technologies
- TypeScript
- React Native
- Expo
- NPM
- MobX
- Babel
- Jest
- Faker
- GitHub Actions 
- ESLint

### Optimizations
Optimize the app by using FlatList with best practices. Load new posts only when the user scrolls and load just a few posts at a time. Use React.memo and useCallback for better performance. For displaying posts with comments, show the first comment and the number of comments per post. These functions improve performance because it's better to use find first element and count than to bring all comments at once. This approach also enhances UI/UX by not showing all comments initially.

### Stub Data
For generating stub data for posts and comments, I use the `faker` library. The amount of data generated is controlled by constants. I generate posts with varying lengths, likes, comments, and images. To use the stub data as if it were stored in the database, I create two protected properties in the store for the stub comments and posts. Each time I make a "request" to the server, I retrieve this data from the properties in the store using getters. I follow this approach because I want the tests to be able to generate their own stub data and use it to validate all tests against "real" data.

### Tests
Create tests for the store with `Jest` in the `__tests__` folder. I wrote UT for important functions in the store.

> [TIP]  
> For checking a large amount of data, we can modify the store creation as follows - when creating the store, change the default amounts.
> Pay attention - if you put a nurmose amount of data it will take a lot time to create the stub data
> ```
>   beforeEach(() => {
>       store = new FeedStore(NEW_POSTS_NUMBER, NEW_COMMENTS_NUMBER);
>   });
> ```

## Run Project

### Set Up

#### Pre Requisites
1. NVM
   
If you don't have nvm installed, you can install it by following the instructions here:
https://monovm.com/blog/install-nvm-on-ubuntu/#How-to-Install-NVM-on-Ubuntu?

2. Node (version 20)

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
    cd social-app
    npm install
```

Than, run the tests to ensure everything works as expected:
`npm run test`

Then run the app via:
`npm start`
