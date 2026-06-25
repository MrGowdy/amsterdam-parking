import { Component, h } from '@stencil/core';

@Component({
  tag: 'parking-footer',
  styleUrl: 'parking-footer.scss',
})
export class ParkingFooter {
  render() {
    return (
      <footer class='parking-footer'>
        <a href="https://github.com/MrGowdy/amsterdam-parking">Link to repository</a>
      </footer>
    );
  }
}
