import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Case } from '../case';

@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.css']
})
export class CreateCaseComponent {

  constructor(private http: HttpClient) { }

  case: Case = new Case;

  createCase() {
    console.log(this.case)
    this.http.post('http://localhost:8080/camunda/startProcess', this.case).subscribe(data=>{
      alert("case created with instance id "+data)
      window.location.reload();
    })
  }


}
