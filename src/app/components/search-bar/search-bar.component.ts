import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  //Inject Angular Router as a dependency
  // Router redirects application to search page 
  //as well as passesa the value of input field from form
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //onSubmit method
  //recieves form as an argument
  //use the router to navigate to a search page
  //From the form we will extract the value and the search
  onSubmit(form: NgForm){
    this.router.navigate(['search', form.value.search]);
  }

}
