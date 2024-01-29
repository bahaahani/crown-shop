// Import the NgModule decorator and the BrowserModule module.
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
// Import the components you have created.
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// Import the AppRoutingModule if you have set up routing.
import { routes } from './app.routes';
// Import the AuthService if you have created it.
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './add-product/add-product.component';

// Use the NgModule decorator to define the AppModule.
@NgModule({
  imports: [
    HttpClientModule,
    // Import components here.
    AboutUsComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    AppComponent,
    BrowserModule,
    CartComponent,
    LoginComponent,
    AddProductComponent,
    RouterModule.forRoot(routes),
  ],
  declarations: [
    // Declare components here.
  ],
  providers: [AuthService],
})
export class AppModule {}
