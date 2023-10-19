import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  title:String='App Notas'

  constructor(public authService: AuthService,private router: Router){}

  longOut():void{
    swal('LogOut',`hi ${this.authService.user.username},you have logged out successfully`,'success')
    this.authService.logOut();
    this.router.navigate(['/login']);
    
  }
}
