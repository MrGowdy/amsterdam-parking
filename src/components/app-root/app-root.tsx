import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
})
export class AppRoot {
  //values that are hardcoded here, but simulate configurable backend values
  private hourlyRate: number = 7.5;
  private maxCars: number = 150;
  private startingRate: number = 2;


  componentWillLoad() {
    document.title = 'Parkeren Dashboard | Gemeente Amsterdan';
  }

  render() {
    return (
      <Host class='app-root' >
        <parking-dashboard hourlyRate={this.hourlyRate} maxCars={this.maxCars} startingRate={this.startingRate} />
      </Host >
    );
  }
}
