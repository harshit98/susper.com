import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterNavbarComponent } from '../footer-navbar/footer-navbar.component';
import { SearchsettingsComponent } from './searchsettings.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { reducer } from '../reducers/index';
import { StoreModule } from '@ngrx/store';

describe('SearchsettingsComponent', () => {
  let component: SearchsettingsComponent;
  let fixture: ComponentFixture<SearchsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        StoreModule.provideStore(reducer)
      ],
      declarations: [
        SearchsettingsComponent,
        FooterNavbarComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should create a FooterNavbar Component', () => {
    const footerNavbar = new FooterNavbarComponent();
    expect(footerNavbar).toBeTruthy();
  });

  it('should have a save button', () => {
    let compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('button.savbtn'));
  });

  it('should have a cancel button', () => {
    let compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('button.cancbtn'));
  });

  it('should have a navbar', () => {
    let compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('nav.navbar'));
  });

  it('should have alt text property as brand', () => {
    let compiled = fixture.debugElement.nativeElement;

    let image: HTMLImageElement = compiled.querySelector('a.navbar-brand img');
    expect(image).toBeTruthy();
    expect(image.alt).toBe('brand');
  });

});
