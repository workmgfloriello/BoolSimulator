type ClockFunction = () => void;

export class Clock {
  private millisecond: number = 1000;
  private stepBit: number = 0;
  private cycle: number = 0;
  private interval: ReturnType<typeof setInterval> | null = null;

  constructor(millisecond: number) {
    this.millisecond = millisecond;
  }

  public start(fun : ClockFunction): void {
    if (this.interval !== null) return;

    this.interval = setInterval(() => {
        if(this.stepBit == 0) this.stepBit=1;
        else this.stepBit = 0;

        this.cycle++;

      fun();
    }, this.millisecond);
  }

  public value(): boolean {
    return Boolean(this.stepBit);
  }

  public step(){
    return this.cycle;
  }

  public stop(condition: number = 0): void {
    if (this.interval !== null && condition==0) {
      clearInterval(this.interval);
      this.interval = null;
    }else if(condition>0){
      if(this.cycle == condition && this.interval !== null){
        clearInterval(this.interval);
        this.interval = null;
      }
    }
  }
}

export const clock = new Clock(1000);
