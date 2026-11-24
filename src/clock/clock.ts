type ClockFunction = () => void;

export class Clock {
  private millisecond: number = 1000;
  private stepBit: number = 0;
  private interval: ReturnType<typeof setInterval> | null = null;

  constructor(millisecond: number) {
    this.millisecond = millisecond;
  }

  public start(fun : ClockFunction): void {
    if (this.interval !== null) return;

    this.interval = setInterval(() => {
        if(this.stepBit == 0) this.stepBit=1;
        else this.stepBit = 0;
      fun();
    }, this.millisecond);
  }

  public step(): number {
    return this.stepBit;
  }

  public stop(): void {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

export const clock = new Clock(1000);
