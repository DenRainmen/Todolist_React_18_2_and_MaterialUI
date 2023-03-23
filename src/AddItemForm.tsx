import { ChangeEvent,KeyboardEvent, useState } from "react"

import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';



type AddItemFormPropsType = {
    callback: (title: string)=> void
    style: {[key:string]:string}
}


export function AddItemForm(props: AddItemFormPropsType)
{
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)


    const addTask = (todolistId: string) => {
        if (title.trim() !== "") {
            props.callback(title.trim());
            setTitle("");
        } else {
            setTitle("");
            setError("Title is required");
        }
    }


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTask(title);
        }
    }

    return(
        <div className='addItemForm'>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? "error" : ""}
                   style={props.style}
            />
            {/* <button onClick={()=>{addTask(title)}}>+</button> */}
            {/* <DeleteForeverTwoToneIcon 
            style={{ color: 'black',
                     fontSize: 30,}}
            /> */}

            <AddBoxTwoToneIcon
             style={{ color: 'lime',
             fontSize: 30,transform: 'translateY(10px)'}}
             onClick={()=>{addTask(title)}}
            />
           
            {error && <div className="error-message">{error}</div>}
        </div>
    )
} 