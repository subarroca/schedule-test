# ScheduleTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Considerations
* Responsive layout should be considered. It's not viable to have a full schedule full width on a small screen
* Add 'Full day' option in period. This forces to change the structure of periods
* More testing cases should be added to Schedule, like checking schedule bounds when adding
* flex layout currently has an issue: https://github.com/angular/flex-layout/issues/242. This forces us to use a weird combination of percents instead of just specifing 'em' and equal length selects in schedule-selector
* Resizable elements and drag n drop could not be achieved with given time. Inital approaches would include: http://www.codetodd.com/creating-a-resizable-component-in-angular2/ and https://www.npmjs.com/package/angular-resizable-element
