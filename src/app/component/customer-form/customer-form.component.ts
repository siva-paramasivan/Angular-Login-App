import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../interfaces/user';

@Component({
  selector: 'app-customer-form',
  standalone:false,
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent implements OnChanges,OnDestroy {
  registerForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    emailAddress: new FormControl(''),
    contactInformation: new FormControl(''),
    address: new FormControl(''),
  });
  loading = false;
  submitted = false;
  @Input() isCustomerEdit!:boolean;
  @Input() customerDetails!:Customer;
  @Output() emitCustomerForm: EventEmitter<Customer> = new EventEmitter();
  @Output() cancelCustomerForm: EventEmitter<void> = new EventEmitter();

  buttonLabel!: string;
  constructor(
    private formBuilder: FormBuilder
  ) {
   
   }

  ngOnInit() {
     this.buttonLabel = this.isCustomerEdit? 'Save':'Create'
      this.registerForm = this.formBuilder.group({
        id:[''],
        name: ['', Validators.required],
        emailAddress: ['', Validators.required],
        contactInformation: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        address: [
          '', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ]
      });
  
      if(this.isCustomerEdit){
        const cust = new Customer(this.customerDetails);
        this.registerForm.setValue(cust)
      }
     }


  ngOnChanges(){
  }

  ngOnDestroy(): void {
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.emitCustomerForm.emit(this.registerForm.value)
  }
}
