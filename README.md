# gulp-build

> This project builds and serves a test app using gulp.

## Intructions to run

> Install dev dependencies

```sh
npm install --save-dev
```
> Gulp everything!

```sh
gulp
```

> Note: this projects is using [gulp-eslint](https://github.com/adametry/gulp-eslint) for linting and following the airbnb styleguide. The build process will thow errors since the project JS does not follow the style guide. I programmed gulpfile.js to not stop the build process upon throwing errors. Additionally, the gulp build task will not run the 'clean' task as required in the rubric as it was more logical in my opinion to make the clean task dependent on the gulp default task
