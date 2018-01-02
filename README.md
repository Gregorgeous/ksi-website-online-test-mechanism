# Ksi-test-mechanism: an online-tests platform for Warsaw-Zoliborz Scout Instructor candidates examination. [In development]
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Description: 
This web application serves Warsaw-Zoliborz KSI (Instructorship Ranks Commission) in examining the Scout Instructor candidates. It's main aim is to allow KSI to digitalise their examination procedure.
Main features: 
*  an online test: features new e-version of the test with some extra additions:
  * Randomised questions 
  * New question types, like image/video-based questions
	* Automatic time restriction
* Add new questions to question stack: add new questions without a need of rescheduling 
* Tests archive: constant access to previously taken tests. At last, a real solution to all the tests being lost for various reasons over the time. 

## Tech stack: 
This app is made in Vue.js with Vuex, vue-router and Vuetify + Firebase Realtime Database.


![ksipreview](https://user-images.githubusercontent.com/23079007/34483170-178dfc54-efbd-11e7-8ed8-f370934b0806.png)
