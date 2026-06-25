import { Component, h } from '@stencil/core';

@Component({
  tag: 'parking-header',
  styleUrl: 'parking-header.scss',
})
export class ParkingHeader {
  render() {
    return (
      <header class='parking-header'>
        <img src={'assets/icon/amsterdam-logo.svg'}></img>
      </header>
    );
  }
}
