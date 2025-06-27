import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav";
import { HeaderComponent } from "../shared/components/header/header.component";
import { SidenavComponent } from "../shared/components/sidenav/sidenav.component";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router } from "@angular/router";

@Component({
  selector: "app-layout",
  standalone: true,
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    HeaderComponent,
    MatIconModule,
    MatToolbarModule,
    SidenavComponent,
  ],
})
export class LayoutComponent {
  isSidenavOpen = true;

  constructor(private router: Router) {
    router.events.subscribe(console.log);
  }

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
