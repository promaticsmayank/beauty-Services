import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager , Toast} from 'ng2-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import {SaloonService} from '../../providers/saloon.service'
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	verifiactionForm:FormGroup
	loginModel
    constructor(public router: Router, private fb: FormBuilder, 
                private saloonServices:SaloonService,
                vcr: ViewContainerRef,
                private toastr: ToastsManager) {
    	    this.loginModel={}
    	    this.toastr.setRootViewContainerRef(vcr);
    	     this.verifiactionForm = fb.group({
                'email': [null, Validators.compose([Validators.required,Validators.pattern(EMAIL_REGEX)])],
                'password': [null, Validators.compose([Validators.required,Validators.maxLength(12)])],
            
        }) 
    }

    ngOnInit() {}

     onLogin(){
         this.saloonServices.SaloonLogin(this.loginModel)
        .subscribe((data)=>{
            console.log(data);
            if(data.response){
              this.toastr.success(data.message ,'Account Verification',{toastLife: 1000, showCloseButton: true})
              localStorage['userdetails']=JSON.stringify(data.data)
              // setTimeout(()=>{
                       this.router.navigate(['/header-three-layout/saloon-dashboard']);
              // },1000)
            //    alert(data.message)
            }else if (data.message=='Authentication Failed') {
               this.toastr.error('Please check your credential and try again' ,'Authentication Failed ',{toastLife: 1000, showCloseButton: true});
              // code...
            }else {
              this.toastr.error( 'Something went wrong please try again' ,'Authentication Failed ',{toastLife: 1000, showCloseButton: true});
            }
         })
        }
}