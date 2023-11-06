import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.css']
})
export class BarraBusquedaComponent {

  @Input() collection!: string
  searchForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchForm = this.initForm()
  }

  initForm() {
    return this.fb.group({
      search: ['', [Validators.required]]
    })
  }

  search() {
    if (this.searchForm.valid) {
      if (this.collection == 'songs') {
        this.router.navigate(['/home/search', this.searchForm.value.search])
      } else if (this.collection == 'artists') {
        this.router.navigate(['/home/search/artists', this.searchForm.value.search])
      } else if (this.collection == 'playlists') {
        this.router.navigate(['/home/search/playlists', this.searchForm.value.search])
      }
    }
  }

}
