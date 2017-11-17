import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Schedule } from './schedule';
import { ScheduleContent } from 'app/schedule/shared/schedule-content-dialog';

describe('Model: Schedule:', () => {
  const mock1 = {
    firstDay: 6,
    numDays: 4,
    numPeriods: 1,
    comment: 'This is a test'
  }

  it('should be created with given values', () => {
    const schedule = new Schedule(mock1);

    expect(schedule.firstDay).toBe(mock1.firstDay);
    expect(schedule.numDays).toBe(mock1.numDays);
    expect(schedule.numPeriods).toBe(mock1.numPeriods);
    expect(schedule.comment).toBe(mock1.comment);
  });

  it('should be created with default values if none passed', () => {
    const schedule = new Schedule();

    expect(schedule.firstDay).toBe(0);
    expect(schedule.numDays).toBe(7);
    expect(schedule.numPeriods).toBe(3);
    expect(schedule.comment).toBeUndefined();
  });

  it('should return an array of days based on config', () => {
    const schedule = new Schedule(mock1);
    const days = schedule.sortedDays;

    expect(days[0].key).toBe(6);
    expect(days[0].value).toBe('Sunday');
    expect(days[1].value).toBe('Monday');
    expect(days.length).toBe(4);
  });

  it('should return an array of all days', () => {
    const schedule = new Schedule();
    const days = schedule.days;

    expect(days[0]).toBe('Monday');
    expect(days.length).toBe(7);
  });

  it('should return an array of all periods', () => {
    const schedule = new Schedule();
    const periods = schedule.periods;

    expect(periods[0]).toBe('Morning');
    expect(periods.length).toBe(3);
  });

  it('should return an array of numbers of days', () => {
    const schedule = new Schedule();
    const days = schedule.numDaysOptions;

    expect(days[0]).toBe(1);
    expect(days.length).toBe(7);
  });

  it('should increase periods', () => {
    const schedule = new Schedule();
    schedule.increasePeriods();

    expect(schedule.numPeriods).toBe(2);
  });

  it('should decrease periods', () => {
    const schedule = new Schedule();
    schedule.numPeriods = 3;
    schedule.decreasePeriods();

    expect(schedule.numPeriods).toBe(2);
  });

  it('should not decrease periods below 1', () => {
    const schedule = new Schedule();
    schedule.decreasePeriods();

    expect(schedule.numPeriods).toBe(1);
  });

  it('should not increase days above 7', () => {
    const schedule = new Schedule();
    schedule.numDays = 7;
    schedule.increaseDays();

    expect(schedule.numDays).toBe(7);
  });

  it('should increase days', () => {
    const schedule = new Schedule();
    schedule.increaseDays();

    expect(schedule.numDays).toBe(2);
  });

  it('should decrease days', () => {
    const schedule = new Schedule();
    schedule.numDays = 3;
    schedule.decreaseDays();

    expect(schedule.numDays).toBe(2);
  });

  it('should not decrease days below 1', () => {
    const schedule = new Schedule();
    schedule.decreaseDays();

    expect(schedule.numDays).toBe(1);
  });



  // CONTENTS
  // TODO: control limitation of additions outside valid period
  describe('Content management:', () => {
    let schedule;
    let initialContent;

    beforeEach(() => {
      schedule = new Schedule();
      initialContent = schedule.addContent(0, 0);
    });

    it('should get content if it starts in given period', () => {
      const content = schedule.getContent(0, 0);

      expect(content).toBeDefined();
    });

    it('should not get content if it starts before given period', () => {
      const content = schedule.getContent(0, 1);

      expect(content).toBeUndefined();
    });

    it('should return added content', () => {
      expect(initialContent).toBeDefined();
    });

    it('should add content if none in given period', () => {
      const newContent = schedule.addContent(1, 0);

      expect(newContent).toBeDefined();
    });

    it('should not add content if already present in given period', () => {
      schedule.addContent(0, 0);
      schedule.contents[0].periodSpan = 1;
      const newContent = schedule.addContent(0, 1);

      expect(newContent).toBeUndefined();
    });

    it('should delete content if it exists', () => {
      const deletedContent = schedule.deleteContent(initialContent);

      expect(deletedContent).toBeUndefined();
      expect(schedule.contents.length).toBe(0);
    });

    it('should not delete content if it does not exist', () => {
      // values are the same but objects are different
      const newContent = new ScheduleContent(initialContent);
      const deletedContent = schedule.deleteContent(newContent);

      expect(deletedContent).toBeDefined();
      expect(schedule.contents.length).toBe(1);
    });

    describe('Content edition:', () => {
      let newContent;
      let updatedContent;

      beforeEach(() => {
        newContent = new ScheduleContent({
          period: 0,
          periodSpan: 1,
          day: 0,
          label: 'updated'
        });
        updatedContent = schedule.editContent(initialContent, newContent);
      });

      it('should update content', () => {
        expect(updatedContent.label).toBe(newContent.label);
      });

      it('should return updated content', () => {
        expect(updatedContent).toBeDefined();
      });
    });

    it('should move content if empty', () => {
      const newContent = new ScheduleContent({
        period: 1,
        day: 1
      });
      const updatedContent = schedule.editContent(initialContent, newContent);

      expect(updatedContent).toBeDefined();

    });

    it('should not move content if occupied', () => {
      const newContent = new ScheduleContent({
        period: 1,
        day: 1,
        label: 'updated'
      });
      schedule.addContent(1, 1);
      // here we have initial and second, let's try to override initial with new, which overlaps second
      const updatedContent = schedule.editContent(initialContent, newContent);

      expect(updatedContent).toBeUndefined();

    });
  });

});
