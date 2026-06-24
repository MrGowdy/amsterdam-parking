import { Component, h, Host, Prop, State } from '@stencil/core';
import { formatTime, set9AMTime } from '../../utils/utils';


@Component({
  tag: 'parking-dashboard',
  styleUrl: 'parking-dashboard.scss',
})
export class ParkingDashboard {

  @State() accumulatedEarnings: number = 0;
  //Initialize the time at 09AM
  @State() currentTime: Date = set9AMTime()
  @State() currentCars: number = 50;
  @State() hoursPassedTotal: number = 0;

  @Prop() hourlyRate!: number;
  @Prop() maxCars!: number;
  @Prop() startingRate!: number;

  get totalStartingRateEarned(): number {
    return this.currentCars * this.startingRate;
  }

  get hourlyCash(): number {
    return this.currentCars * this.hourlyRate;
  }

  get totalCash(): number {
    return this.accumulatedEarnings;
  }

  get carsAllowed(): number {
    return this.maxCars - this.currentCars
  }

  get carLimitReached(): boolean {
    return this.currentCars >= this.maxCars;
  }

  /**
   * Add cars by passing a positive value, remove cars by passing a negative value
   * Could be moved to the utility folder
   */
  private changeCarAmount(amount: number): void {
    const projectedAmount = this.currentCars + amount

    //Make sure that the amount of cars is not out of bounds
    if (projectedAmount > this.maxCars || projectedAmount < 0) {
      console.error('Amount of cars is out of bounds!')
      return;
    }

    if (amount > 0) {
      this.accumulatedEarnings += amount * this.startingRate;
    }

    this.currentCars = projectedAmount;
  }

  private resetHours() {
    this.hoursPassedTotal = 0;
    this.accumulatedEarnings = 0;
    this.resetTimeOfDay()
  }

  private resetTimeOfDay() {
    this.currentTime = set9AMTime()
  }

  private simulateDay(hours: number = 8): void {
    let hoursPassedThisDay = 0;

    const interval = setInterval(() => {
      if (hoursPassedThisDay >= hours) {
        clearInterval(interval);
        this.resetTimeOfDay();
        return;
      }

      this.simulateHour()
      hoursPassedThisDay += 1;
    }, 1000);
  }

  private simulateHour(): void {
    const newTime = new Date(this.currentTime);
    newTime.setHours(newTime.getHours() + 1);
    this.currentTime = newTime;
    this.hoursPassedTotal++;

    this.accumulatedEarnings += this.currentCars * this.hourlyRate;
  }

  render() {
    return (
      <Host class="parking-dashboard">
        <h1>Parkeren Dashboard</h1>

        <h2>Tijd:</h2>
        <div class="parking-dashboard__timer">
          <span>{formatTime(this.currentTime)}</span>
        </div>


        <button
          onClick={() => this.simulateDay()}
          class="meldingen-button"
        >
          <span>Simuleer 1 dag</span>
        </button>

        <h2>Maximaal aantal auto's:</h2>
        <div class="parking-dashboard__cars-count">{this.maxCars}</div>


        <div class="parking-dashboard__section">
          <h2>Auto's in de garage:</h2>
          <div class="parking-dashboard__cars-count">{this.currentCars}</div>

          <span
            class={
              `parking-dashboard__status  parking-dashboard__status--${this.carLimitReached ? 'error' : 'success'}`
            }
            alt-text={
              this.carLimitReached ? 'Rood: De garage is vol' : `Rood: Er is ruimte voor meer auto's!`
            }
          >
            {this.carLimitReached ? 'De garage is vol' : `Er is ruimte voor meer auto's!`}
          </span>
        </div>

        <section class="parking-dashboard__actions">
          <div class="parking-dashboard__changeCars">
            <span>auto's naar binnen:</span>
            <button
              onClick={() => this.changeCarAmount(1)}
              class="parking-dashboard__changeCarBtn"
            >
              <span>+ 1</span>
            </button>


            <button
              onClick={() => this.changeCarAmount(10)}
              class="parking-dashboard__changeCarBtn"
            >
              <span>+ 10</span>
            </button>
          </div>
          <div class="parking-dashboard__changeCars">
            <span>auto's naar buiten:</span>
            <button
              onClick={() => this.changeCarAmount(-1)}
              class="parking-dashboard__changeCarBtn"
            >
              <span>- 1</span>
            </button>


            <button
              onClick={() => this.changeCarAmount(-10)}
              class="parking-dashboard__changeCarBtn"
            >
              <span>- 10</span>
            </button>
          </div>
        </section >

        <section class="parking-dashboard__earnings">
          <h2 class="parking-dashboard__earnings-title">Financiën</h2>

          <span class="parking-dashboard__earnings-value">
            € {this.totalStartingRateEarned} Starttarief totaal
          </span>

          <span class="parking-dashboard__earnings-value">
            € {this.hourlyCash} per uur
          </span>

          <span class="parking-dashboard__earnings-value">
            € {this.totalCash} totaal verdiend
          </span>
        </section>

        <section class="parking-dashboard__settings">
          <h2 class="parking-dashboard__settings-title">Current prices:</h2>
          <div class="parking-dashboard__settings-row">
            <span>Starting rate:</span>
            <span>€ {this.startingRate}</span>
          </div>
          <div class="parking-dashboard__settings-row">
            <span>Hourly rate:</span>
            <span>€ {this.hourlyRate}</span>
          </div>
        </section>

        <button
          onClick={() => this.resetHours()}
          class="meldingen-button"
        >

          <span>Reset all</span>
        </button>
      </Host >
    );
  }
}
