# Social Feed App


## Contributers

## App Explnations
### Basic Explantion:
This app is a social feed app. this is infanty scroll feed with posts and comments.
for every post we have those components: auther, content, create date, likes and image url that is non require. for every post we have also comments that related to post from post id key in comment. in comment we have thsoe components: authehr and content.

### Techonogiles
TS, React Native, Expo, EAS, NPM, MobX, Babel, Jest, Faker
### Optimazations
### Stubs Data
fake data for posts and comments. we creae the stub data by faker labery. i generate diffrent posts with diffrent longs, likes, comments, image or not image and so. we can change the number of posts and comments by simply 
### Tests

## Run project

### Set up

#### Pre requiments


1. node / npm - node version 20 <!-- put here code to use & install node 20 -->
2. expo cli <!-- put here code to install -->
4. eas cli 
3. any other ??????????

#### Instalations

install app form git
using https / ssh

#### options to run the app

##### builds options
For android you can simply install on emulator my bild 
For iOS you need to do those steps: 


##### expo go app
you have 2 options:
1. install Expo Go on you device and scan the QR code
2. install expo on emulater add more things



 * general thougs about prefomence. we want to handle an infinty feed, so we will deal with nurmuse of data
 * beacuse of that i treat the fetch the data as i do if it will be like this and as i will devlop also the api
 * the best approuch for me was to seperate the comments for 3 situations. 
 * 1. this post we can't see - dont bring any comments or data on them.
 * 2. posts that we see on our feed. to give to use good ux as well as limit the calls to db wich will couse our 
 * app to slow i prefer to bring any time just the first comment and the number of comments for each post. 
 * this can gave to the user general idea about the comments in this post and he will decide if it check 
 * any others comments in this post. when we handle a lot of data count and find just the first element 
 * is crutial faster and in most case users dont wand to see all the data. 
 * 3. specifck post data comments. when users hit the expend btn on the comments we do anther call to get this 
 * time every comments in the specifck post.
 * 
 * all of those handles in Map starcter wich is fast, excelnt for this situation and easy to handle.
 * we put in the key the postId (so if we aldrey bring some posts comments they will save in the map and no need to bring them again)
 * and as the value we have comments (if we on the 2 case we only bring the first one than in the 3 we bring evething)
 * and also the amount of comments this post id have.