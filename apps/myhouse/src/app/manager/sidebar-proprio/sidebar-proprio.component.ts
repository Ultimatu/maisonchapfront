import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar-proprio',
  templateUrl: './sidebar-proprio.component.html',
  styleUrls: ['./sidebar-proprio.component.css']
})
export class SidebarProprioComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private router: Router) {
  }

  logout() {
    this.router.navigate(['proprio/logout']);
  }
}
