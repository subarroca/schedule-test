export class SchedulePeriod {
  from: {
    h: number,
    m: number
  };
  to: {
    h: number,
    m: number
  };

  constructor(options: {
    from?: {
      h: number,
      m: number
    },
    to?: {
      h: number,
      m: number
    }
  } = {}) {
    this.update(options);
  }

  update(options: {
    from?: {
      h: number,
      m: number
    },
    to?: {
      h: number,
      m: number
    }
  } = {}) {
    this.from = options.from;
    this.to = options.to;
  }
}
