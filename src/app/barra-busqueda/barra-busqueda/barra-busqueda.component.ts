import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.css']
})
export class BarraBusquedaComponent {

  searchForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router
  ){}

  ngOnInit(){
    this.searchForm = this.initForm()
  }

  initForm(){
    return this.fb.group({
      search: ['', [Validators.required]]
    })
  }

  search(){
    if(this.searchForm.valid){
      this.router.navigate(['/home/search', this.searchForm.value.search])
    }
  }

}
