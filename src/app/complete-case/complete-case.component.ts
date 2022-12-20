import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ConnectableObservable, map } from 'rxjs';
import { Case } from '../case';


@Component({
  selector: 'app-complete-case',
  templateUrl: './complete-case.component.html',
  styleUrls: ['./complete-case.component.css']
})
export class CompleteCaseComponent implements OnInit {

  case: Case = new Case;

  selectedIndex:number

  constructor(private apollo: Apollo, private http: HttpClient) { }

  tasklist = [];

GET_CLAIMED_TASKS = gql`
{
  tasks(query: {assignee: "demo" ,  state: CREATED }) {
    id
  name
  processName
  assignee
  variables {
        value
        name
      }
  taskState
  
  }
}
`;

COMPLETE_TASK = gql`
mutation completeTask ($taskId: String!, $variables: [VariableInput!]!) {
completeTask (taskId: $taskId, variables: $variables) {
    id
    name
    taskDefinitionId
    processName
    creationTime
    completionTime
    assignee
    variables {
      name
      value
    }
    taskState
    sortValues
    isFirst
    formKey
    processDefinitionId
    candidateGroups
}
}
`;

onChange(event:Event){
  this.selectedIndex = event.target["selectedIndex"] - 1;
  this.case.caseType=this.tasklist[this.selectedIndex].variables[4].value
  this.case.caseStatus=this.tasklist[this.selectedIndex].variables[3].value
  this.case.investigationType=this.tasklist[this.selectedIndex].variables[5].value
  this.case.caseCreator=this.tasklist[this.selectedIndex].variables[0].value
  this.case.caseCreatorMail=this.tasklist[this.selectedIndex].variables[1].value
}

completeCase() {
  console.log(this.case.caseStatus)
  this.completetask(this.tasklist[this.selectedIndex].id, this.case.caseStatus)
}

ngOnInit(): void {
  this.http.post(`http://localhost:8082/api/login?username=demo&password=demo`, '').subscribe((data: any) => {
  })
  this.getclaimedtask()
}

completetask(id: string, caseStatus) {
  this.apollo
  .mutate({
    mutation: this.COMPLETE_TASK,
    variables: {
      "taskId": id,
      "variables": {
        "name": "caseStatus",
        "value": '"'+caseStatus+'"'
      }
    }
  }).subscribe(data => {window.location.reload()})
}

getclaimedtask() {
  this.apollo
  .watchQuery({
    query: this.GET_CLAIMED_TASKS,
  })
  .valueChanges
  .pipe(
    map(result => result.data)
  ).subscribe((data: any) => {
    this.tasklist = data.tasks
  })}

}
