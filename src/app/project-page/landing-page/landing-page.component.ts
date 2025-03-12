import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs';
import { Customer, User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-landing-page',
  standalone:false,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent implements OnInit {
  users: User[] = [];
  customers: Customer[]  = [];
  isCutomerFormVisible!:boolean;
  icon :string="edit"
  isCustomerEdit!:boolean;
  customerDetails!: Customer;
  popupHeader!: string;

  constructor(
    private userService: UserService,
    protected changeDetectorRef: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    this.getAllCustomerList();
  }

  getAllCustomerList(){
    this.userService.getAllCustomers().pipe(first()).subscribe(users => {
      this.customers = users as Customer[];
      this.changeDetectorRef.detectChanges();       //To detect the changes manually in onPush Strategy
    });
  }

  onSubmitCustomer(data:Customer){
    let customerDetail$;
    if(!this.isCustomerEdit){
      delete data['id'];
      customerDetail$ =   this.userService.createUser(data).subscribe(
        data => {
         console.log('successfull',data)
         this.isCutomerFormVisible =false;
         this.getAllCustomerList();

        },
        error => {
          console.error(error);
        });
    }else{
      this.userService.saveCustomer(data).subscribe(
        data => {
         console.log('successfull',data);
         this.isCutomerFormVisible =false;
         this.getAllCustomerList();

        },
        error => {
          console.error(error);
        });
    }
       
  }
  enableCustomerPopup(index:number){
    this.popupHeader ="Edit"
    this.isCustomerEdit =true;
    this.customerDetails = this.customers[index];
    this.isCutomerFormVisible=true;
  }

  deleteCustomer(index:number){
    this.userService.deleteCustomer( this.customers[index]).subscribe(
      data => {
       console.log('successfull',data);
       this.getAllCustomerList();

      },
      error => {
        console.error(error);
      });
  }

  addCustomerInfo(){
    this.popupHeader ="Add"
    this.isCustomerEdit=false;
    this.isCutomerFormVisible=true;
  }

  cancelCustomerForm(){
    this.isCutomerFormVisible=false;

  }
  
}
