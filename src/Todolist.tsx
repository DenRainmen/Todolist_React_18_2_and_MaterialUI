import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { AddItemForm } from './AddItemForm';
import {FilterValuesType} from './App';
import { EditableSpan } from './EditableSpan';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id:string
    title: string
    filter: FilterValuesType
    tasks:  Array<TaskType>
    changeFilter: (value: FilterValuesType,
        todolistId: string) => void

    removeTask: (todolistId: string,taskId: string,title: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: ( checkBoxStatus: boolean,todolistId: string, taskId: string ) => void
    delTodolist:(todolistId: string)=>void
    updateTaskTitle:(todolistId: string, taskId: string, newTitle: string)=>void
    updateTodolistTitle: (todolistId: string,newTitle: string)=>void
   
}

export function Todolist(props: PropsType) {


    // let [title, setTitle] = useState("")
    // let [error, setError] = useState<string | null>(null)

    // const addTask = (todolistId: string) => {
    //     if (title.trim() !== "") {
    //         props.addTask(todolistId, title.trim());
    //         setTitle("");
    //     } else {
    //         setTitle("");
    //         setError("Title is required");
    //     }
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }

    // const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.key === 'Enter') {
    //         addTask(props.id);
    //     }
    // }

    const onAllClickHandler = () => props.changeFilter("all",props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed",props.id);

    const updateTodolistTitleHandler =(newTitle: string)=>{
props.updateTodolistTitle(props.id, newTitle)
    }

    return <div className='todolist'>
       <h3 style={{display: 'inline'}}>
             <EditableSpan
             oldTitle={props.title}
             callback={updateTodolistTitleHandler} />
        </h3>
         
        <sup
            className={'delTask'}
            onClick={()=>{props.delTodolist(props.id)}}>
                [x]
        </sup>
        {/* <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={()=>{addTask(props.id)}}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div> */}

        <AddItemForm
        callback={(title)=>{props.addTask(props.id, title)}}
        />


        {/* рендеринг тасок */}
        <div>
            {
                
            props.tasks.map(t => {
                    
                    // Handlers
                    const onClickHandler = () => props.removeTask(props.id,t.id, t.title)

                    const onChangeHandler =
                     (checkBoxStatus: boolean,todolistId: string,taskId: string) =>
                      {
                         props.changeTaskStatus(checkBoxStatus,todolistId,taskId)
                      }
                      
                const EditableSpanHandler=(text: string)=>{
                 props.updateTaskTitle(props.id, t.id, text)
                }
                    
// end
                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                                onChange={(e)=>onChangeHandler(e.currentTarget.checked, props.id, t.id)}
                               checked={t.isDone}/>
                        {/* <span>{t.title}</span> */}
                        <EditableSpan 
                            oldTitle={t.title}
                            callback={EditableSpanHandler}
                        />
                        <sup
                        className={'delTask'}
                        onClick={onClickHandler}>[x]</sup>
                    </div>
                })
            }
        </div>
        {/* end */}


        {/* Buttons */}
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
