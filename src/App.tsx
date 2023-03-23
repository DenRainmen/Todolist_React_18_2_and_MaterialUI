import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}

type Tasks = {
    [key: string]: Array<TaskType>
} 

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {

  // STATE
    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);


let todolistId1 = v1()
let todolistId2 = v1()

    // Первым шагом, засунем инфу о тудулисте внутрь объекта, объект положим в массив и за компанию к нему положим в массив ещё один тудулист.

let [todolists, setTodolists] = useState<Array<TodolistsType>>(
      [
          {id: todolistId1, title: 'What to learn', filter: 'all'},
          {id: todolistId2, title: 'What to buy', filter: 'all'},
      ]
  )

  let[tasks, setTasks] = useState<Tasks>(
      {
          [todolistId1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]:[
            {id: v1(), title: "MIlk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Tea", isDone: false},
            {id: v1(), title: "Coockies", isDone: false},
            {id: v1(), title: "Butter", isDone: false},
           
        ]
      }
  )


// End

// FUNCTIONS

//удаление тудулиста
const delTodolist=(todolistId: string)=>{
    setTodolists(todolists.filter(el=>el.id !== todolistId))
    delete tasks[todolistId]
    console.log(tasks)

   
}

//удаление таски
    function removeTask(todolistId: string, taskId: string, title: string)
     {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el=> el.id !== taskId ) })

  
     } 

//добавление таски          
     function addTask(todolistId: string, title: string) 
     {
        let newTask = {id: v1(), title: title, isDone: false};

        setTasks({...tasks, [todolistId]:[newTask,...tasks[todolistId]]})
    }

//изменение статуса таски
    function changeStatus(checkBoxStatus: boolean,todolistId: string, taskId: string)
    {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(el=>
        //     el.id===taskId?{...el, isDone: checkBoxStatus}:el
        //     )})

        setTasks(  {...tasks, [todolistId]: tasks[todolistId].map(el=>
            el.id===taskId?{...el,isDone: checkBoxStatus}:el
            )} )
    }
//фильтрация 
    function changeFilter(value: FilterValuesType, todolistId: string) {
      setTodolists(todolists.map(el=>el.id===todolistId?
        {...el,filter:value}:el
        ))
            
    }

    const addTodolist =(title: string)=>{
        const newId = v1();
        const newTodolist:TodolistsType = {id: newId, title: title, filter: 'all'}
        setTodolists([ ...todolists,newTodolist])

        setTasks( { ...tasks, [newId]:[]}  )
    }


    const updateTaskTitle =(todolistId: string, taskId: string, newTitle: string)=>{
setTasks(  {...tasks,[todolistId]: tasks[todolistId].map(el=>
     el.id === taskId ? {...el, title: newTitle} : el
     )})
    }


    const updateTodolistTitle =(todolistId: string, newTitle: string)=>{
        setTodolists(todolists.map(el=> el.id === todolistId?
            {...el,title:newTitle}:
            el
            ))
    }

// end

    

    
    // Вторым шагом, отрисуем массив тудулистов (передавая в оба, пока что, один и тот же массив тасок). Тип TodolistType опишите самостоятельно. ​Также передадим сразу внутрь тудулиста id этого тудулиста, а также key:
    return (
        <div className="App">
<h1
style={{margin: "0"}}
>Add todolist</h1>

<AddItemForm
    style={{marginBottom: "20px"}}
    callback={(title)=>{addTodolist(title)}}
/>

          {todolists.map(el => {
          

// перед тем как вернуть каждый тудулист - профильтруем его таски
            let filteredTasks = tasks[el.id];

            if (el.filter === "active") {
                filteredTasks = tasks[el.id].filter(t => t.isDone === false);
            }
            if (el.filter === "completed") {
                filteredTasks = tasks[el.id].filter(t => t.isDone === true);
            }

            return <Todolist
            key={el.id}
            id={el.id}
            title={el.title}
            filter={el.filter}
            tasks={filteredTasks}
            
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            delTodolist={delTodolist}

            updateTaskTitle={updateTaskTitle}
            updateTodolistTitle={updateTodolistTitle}
            
            />
          })

          }
            
        </div>
    );
}

export default App;
