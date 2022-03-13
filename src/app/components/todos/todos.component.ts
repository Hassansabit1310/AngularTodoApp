import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/Models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[]=[];
  inputTodo:string=""
  constructor(private http: HttpClient) { 
  this.getTodos()
  }
getTodos(): void{

  this.http.get('http://localhost:3000/todos')
  .subscribe((response:any)=>{
    this.todos=response;
  })



}
  ngOnInit(): void {
    
   
  }

  toggleDone (id:number){
    this.todos.map((todo,i)=>{
      if(i==id) todo.completed=!todo.completed
      return todo;
       

    })
    

  }

  deleteTodo (id:number){

    this.http.delete(`http://localhost:3000/todos/${id}`)
    .subscribe((response:any)=>{
      this.todos=this.todos.filter((todo,i)=>
    todo.id!==id
 )

    })
   
    

  }

  addTodo(){

    this.http.post('http://localhost:3000/todos',{
      content: this.inputTodo,
      completed:false

    }).subscribe((response:any)=>{
      this.todos.push({
        id:this.todos.length+1,
      content:this.inputTodo,
      completed:false,
    })


    })


    

  }

}
