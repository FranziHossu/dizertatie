/** It subscribes to the currentUser observable in the authentication service so it can reactively 
 show/hide the main navigation bar when the user logs in/out of the application */
 
 import { Component } from '@angular/core';
 import { Router } from '@angular/router';
 
 
 @Component({ 
                selector: 'app',
                templateUrl: './app.component.html', 
                styleUrls: ['./app.component.scss'],
            })
            
 export class AppComponent {
 
     constructor(
         private router: Router,
     ) {
     }
 
    /**  logout() {
         this.router.navigate(['/login']);
    }*/
 }