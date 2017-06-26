import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Schedule } from './schedule';

describe('Model: Schedule', () => {
  const mock1 = {
    firstDay: 6,
    numDays: 4,
    firstPeriod: 2,
    numPeriods: 1,
    comment: 'This is a test'
  }

  it('should be created with given values', () => {
    const schedule = new Schedule(mock1);

    expect(schedule.firstDay).toBe(mock1.firstDay);
    expect(schedule.numDays).toBe(mock1.numDays);
    expect(schedule.firstPeriod).toBe(mock1.firstPeriod);
    expect(schedule.numPeriods).toBe(mock1.numPeriods);
    expect(schedule.comment).toBe(mock1.comment);
  });

  it('should be created with default values if none passed', () => {
    const schedule = new Schedule();

    expect(schedule.firstDay).toBe(0);
    expect(schedule.numDays).toBe(7);
    expect(schedule.firstPeriod).toBe(0);
    expect(schedule.numPeriods).toBe(3);
    expect(schedule.comment).toBeUndefined();
  });

  it('should return an array of days based on config', () => {
    const schedule = new Schedule(mock1);
    const days = schedule.sortedDays;

    expect(days[0]).toBe('Sunday');
    expect(days[1]).toBe('Monday');
    expect(days.length).toBe(4);
  });

  it('should return an array of periods based on config', () => {
    const schedule = new Schedule(mock1);
    const periods = schedule.sortedPeriods;

    expect(periods[0]).toBe('Evening');
    expect(periods.length).toBe(1);
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

    expect(days[0]).toBe(0);
    expect(days.length).toBe(7);
  });

  it('should return an array of numbers of periods', () => {
    const schedule = new Schedule();
    const periods = schedule.numPeriodsOptions;

    expect(periods[0]).toBe(0);
    expect(periods.length).toBe(3);
  });

});
