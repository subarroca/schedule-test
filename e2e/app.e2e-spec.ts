import { ScheduleTestPage } from './app.po';

describe('schedule-test App', () => {
  let page: ScheduleTestPage;

  beforeEach(() => {
    page = new ScheduleTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    // expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
