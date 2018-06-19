


# KSI tests platform: an online-tests platform for Warsaw-Zoliborz Scout Instructor candidates examination. [IN BETA RELEASE: http://testypwd.warszawazoliborz.zhp.pl ]
<p align="center">
<img width="400" src="repoReadmeMaterials/logo-remake-for-github-partly-transparent.png">
</p>

## Build Setup
1. Firstly, set-up project modules
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

2. Next, you need to set-up your firebase project and connect it with an app (otherwise you won't be able to create your own authorisation accounts and, in result, be able to pass through login form) <br />
a. Once you've created new project for this app, go to "authentication" tab and click the "web setup" button on the right hand side. <br />
b. Create a file called "fbConfig.json" inside ksi-website-online-test-mechanism/src with a following structure:  <br />
``` bash
{
  "apiKey": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "authDomain": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "databaseURL": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "projectId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "storageBucket": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "messagingSenderId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```
 c. paste values of your fb config in place of the above ones
 
 **This software is created for a Polish Scouts community and - as of now - does not contain any i18n** 


## Description: 
This web application serves Warsaw-Zoliborz KSI (Instructorship Ranks Commission) in examining the Scout Instructor candidates. It's main aim is to allow KSI to digitise their examination procedure.
The new e-version of the KSI test is not only doable on the computer compared to pen&paper, it also contains enhancements impossible to achieve via the "analogue" approach:
  * Truly randomised questions -> saved time for the KSI members, which previously needed to manually prepare different versions of the test for the candidates. Now this tedious task is handled by the application's business logic.
  * Advanced randomisation logic -> the tests platform allows KSI to implement non-trival logic of drawing the questions including new ratings for the questions such as "starred questions" or giving the questions a "weight". All done without any extra hassle.
  * New question types, like image/video-based questions -> this gives an option to include same questions with a different random image to be drawn (Allowing for questions like "who is the person on the image?") 
* Calculated exam time -> depending on the summative weight of the questions drawn, the exam mechanism counts the time limit for the test.
* Ability to add new questions to the question stack (future releases) : add new questions without a need of  
* Tests online archive: easy access to previously taken tests. At last, a real solution to all the tests being lost for various reasons over the time due to the need of storing their paper versions . 

## Tech stack: 
This app is made in Vue.js with Vuex, vue-router and Vuetify + Firebase Realtime Database.

## Samples gallery (some images in Polish):

* Admin Login view  
![KSI platform admin login view](repoReadmeMaterials/KSI%20platform%20admin%20login%20view.png)

* Sample view of the image-based test question
![KSI platform image-based test questions](repoReadmeMaterials/KSI%20platform%20image-based%20test%20questions.png)

* view of the examiner's dashboard
![KSI platform examiner's dashboard](repoReadmeMaterials/KSI%20platform%20examiner's%20dashboard.png)

* view of the examiner's dashboard with one of the panels expanded and marked
![KSI platform examiner's dashboard - expanded checking panel](repoReadmeMaterials/KSI%20platform%20examiner's%20dashboard%20-%20expanded%20checking%20panel.png)

* view of the results page
![KSI platform results page.png](repoReadmeMaterials/KSI%20platform%20results%20page.png)
