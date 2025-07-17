import { CommonModule } from '@angular/common';
import { Component, HostListener, NgZone } from '@angular/core';

@Component({
    selector: 'app-mouse-follower',
    imports: [CommonModule],
    template: `
      <div class="mouse-pointer" [ngStyle]="circleStyle">
        <div class="pointer-tip"></div>
      </div>
    `,
    styles: [`
      .mouse-pointer {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 20px solid white;
        position: fixed;
        transform: translate(-50%, -50%) rotate(-30deg);
        z-index: 999;
        pointer-events: none;
      }
    `]
})
export class MouseFollowerComponent {
  circleStyle = {
    top: '0px',
    left: '0px',
    display: 'block' // Changed to initially visible
  };
  private mouseX: number = 0;
  private mouseY: number = 0;

  constructor(private ngZone: NgZone) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.ngZone.run(() => {
      // Always update position regardless of screen size
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
      this.updatePointerPosition();
      this.circleStyle.display = 'block'; // Always show the follower
    });
  }

  @HostListener('document:mouseleave')
  onMouseLeave() {
    this.ngZone.run(() => {
      this.circleStyle.display = 'none'; // Hide the follower when mouse leaves the window
    });
  }

  @HostListener('document:mouseenter')
  onMouseEnter() {
    this.ngZone.run(() => {
      this.circleStyle.display = 'block'; // Show the follower when mouse re-enters the window
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.ngZone.run(() => {
      this.updatePointerPosition();
    });
  }

  private updatePointerPosition() {
    this.circleStyle.top = `${this.mouseY + window.scrollY}px`;
    this.circleStyle.left = `${this.mouseX + window.scrollX}px`;
  }
}