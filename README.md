# ScheduleTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Considerations
* Binding between calendar and selector has been done via params but it could also be done via a service. In this case I preferred this situation as no other cases were given and it was clearer for me
* Responsive layout should be considered. It's not viable to have a full schedule full width on a small screen
* Add 'Full day' option in period. This forces to change the structure of periods
* More testing cases should be added to Schedule, like checking schedule bounds when adding
