export class SchedulePeriod {
  from: {
    h: string,
    m: string
  };
  to: {
    h: string,
    m: string
  };

  constructor(options: {
    from?: {
      h: string,
      m: string
    },
    to?: {
      h: string,
      m: string
    }
  } = {}) {
    this.update(options);
  }

  update(options: {
    from?: {
      h: string,
      m: string
    },
    to?: {
      h: string,
      m: string
    }
  } = {}) {
    this.from = options.from || this.from;
    this.to = options.to || this.to;
  }
}
