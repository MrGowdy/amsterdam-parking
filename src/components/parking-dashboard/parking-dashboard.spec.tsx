import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ParkingDashboard } from "./parking-dashboard";

describe('parking-dashboard', () => {
  let page: SpecPage;
  let component: any;

  const hourlyRate: number = 7.5;
  const maxCars: number = 150;
  const startingRate: number = 2;


  beforeEach(async () => {
    page = await newSpecPage({
      components: [ParkingDashboard],
      template: () => (
        <parking-dashboard
          hourlyRate={hourlyRate} maxCars={maxCars} startingRate={startingRate}
        ></parking-dashboard>
      ),
    });

    component = page.rootInstance;
  });

  //Remove this test when the default amount becomes flexible
  it('should expect a default amount of 50 cars', () => {
    expect(component.currentCars).toBe(50);
  });

  it('should calculate hourlyCash correctly', () => {
    expect(component.hourlyCash).toBe(375);
  });

  it('should have no initial totalCash', () => {
    expect(component.totalCash).toBe(0);
  });

  it('should add cars ', () => {
    component.changeCarAmount(5);
    expect(component.currentCars).toBe(55);
  });

  it('should remove cars ', () => {
    component.changeCarAmount(-5);
    expect(component.currentCars).toBe(45);
  });

  it('should not exceed maxCars', () => {
    component.changeCarAmount(200);
    expect(component.currentCars).toBe(50);
  });

  it('should not allow currentCars to go below zero', () => {
    component.changeCarAmount(-100);
    expect(component.currentCars).toBe(50);
  });

  it('should increase time and hoursPassedTotal when simulateHour is called', () => {
    const initialHour = component.currentTime.getHours();

    component.simulateHour();

    expect(component.currentTime.getHours()).toBe(initialHour + 1);
    expect(component.hoursPassedTotal).toBe(1);
  });

  it('should display a message when the car limit is NOT yet reached', () => {
    expect(component.carLimitReached).toBe(false);
    expect(page.root?.innerText).toContain(`Er is ruimte voor meer auto's!`)
  });

  it('should detect when the car limit is reached', () => {
    component.currentCars = component.maxCars;
    expect(component.carLimitReached).toBe(true);
  });

  it('should display a message when the car limit is reached', async () => {
    component.currentCars = component.maxCars;

    await page.waitForChanges();

    expect(page.root?.innerText).toContain('De garage is vol')
  });

  it('should reset all values', () => {
    jest.spyOn(component, 'resetTimeOfDay')

    component.hoursPassedTotal = 10
    component.accumulatedEarnings = 10

    component.resetHours();

    expect(component.hoursPassedTotal).toBe(0);
    expect(component.accumulatedEarnings).toBe(0);
    expect(component.resetTimeOfDay).toHaveBeenCalled();
  })

  it('should increase totalCash when a day is sinulated', async () => {
    //This test uses fake timers to simulate the interval
    jest.useFakeTimers()

    component.simulateDay();

    jest.runAllTimers()

    expect(component.totalCash).toBe(3000);
    jest.useRealTimers()
  });
});
