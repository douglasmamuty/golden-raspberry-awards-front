import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LayoutComponent } from "./layout.component";
import { RouterTestingModule } from "@angular/router/testing";
import { HeaderComponent } from "../shared/components/header/header.component";
import { SidenavComponent } from "../shared/components/sidenav/sidenav.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";

describe("LayoutComponent", () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LayoutComponent,
        RouterTestingModule,
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        HeaderComponent,
        SidenavComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should toggle sidenav open state", () => {
    const initialState = component.isSidenavOpen;
    component.toggleSidenav();
    expect(component.isSidenavOpen).toBe(!initialState);
  });
});
