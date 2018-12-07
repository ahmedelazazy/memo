import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AnimationBuilder, AnimationPlayer, style, animate } from '@angular/animations';
import { NavigationStart, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('mContentWrapper') contenWrapper: ElementRef;
  public player: AnimationPlayer;

  constructor(private router: Router, private animationBuilder: AnimationBuilder) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.contenWrapper) {
          // hide content
          this.contenWrapper.nativeElement.style.display = 'none';
        }
      }
      if (event instanceof NavigationEnd) {
        if (this.contenWrapper) {
          // show content back
          this.contenWrapper.nativeElement.style.display = '';
          // animate the content
          this.animate(this.contenWrapper.nativeElement);
        }
      }
    });
  }

  animate(element) {
    this.player = this.animationBuilder
      .build([
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('500ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
        style({ transform: 'none' })
      ])
      .create(element);
    this.player.play();
  }
  ngOnInit() {}
}
