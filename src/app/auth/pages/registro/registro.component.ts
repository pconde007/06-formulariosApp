import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { emailPattern, nombreApellidoPattern, noPueseSerStrider } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {   

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)] ],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator] ],
    username: ['', [Validators.required, this.validatorService.noPueseSerStrider ] ],
    password: ['', [Validators.required, Validators.minLength(6) ] ],
    password2: ['', [Validators.required ] ]
  }, {
    validators: [ this.validatorService.camposIguales('password','password2')]
  });

  
  get emailErrorMsg(): string{
    
    const errors = this.miFormulario.get('email')?.errors;

    if(errors?.['required']){
      return 'Email es obligatorio';
    }
    else if(errors?.['pattern']){
      return 'El valor ingresado no tiene formato de correo';
    }
    else if (errors?.['emailTomado']){
      return 'El email ya fue tomado';
    }
    
    return '';
  }

  constructor(private fb:FormBuilder, private validatorService: ValidatorService, private emailValidator: EmailValidatorService ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Fernando Herrera',
      email: 'test1@test.com',
      username: 'fernando_her85',
      password: '123456',
      password2: '123456'
    })
  }

  campoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid
      && this.miFormulario.get(campo)?.touched;
  }  

  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
