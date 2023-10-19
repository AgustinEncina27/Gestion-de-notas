import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  titulo: String='Plesase Sign In!';
  user: User ;

  constructor(private authService: AuthService, private router:Router ){
    this.user= new User();
  }
  
  ngOnInit(){
    if(this.authService.isAuthenticated()){
      swal('Login', `hi ${this.authService.user.username}, you are already authenticated`,'info');
      this.router.navigate(['/listNotes']);
    }
  }

  login(){
    if(this.user.username==null||this.user.password==null){
      swal('Error Login','Username or password empty!','error');
      return;
    }

    this.authService.login(this.user).subscribe(
      response=>{
        this.authService.saveUser(response.access_token);
        this.authService.saveToken(response.access_token);

        let user= this.authService.user;
        this.router.navigate(['/listNotes']);
        swal('Login',`Hi ${user.username},you have successfully logged in!`,'success');
      },error=>{
        if(error.status==400){
          swal('Error Login','the username or password are incorrect!','error');
        }
      }
    )
  }
}
