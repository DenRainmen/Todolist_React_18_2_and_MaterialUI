import { useState } from "react"


type PropsType = {
    oldTitle: string
    callback: (newTitle:string)=>void
}



export function EditableSpan(props: PropsType)
{

let[editMode, setEditMode] = useState(false)
let[inputText, setInputText] = useState(props.oldTitle)


const onDoubleClickHandler =()=>
{
    setEditMode(!editMode)
}

const onBlurHandler =(inputText:string)=>
{
    setEditMode(false)
   
    if(inputText.trim() === '')
   {
       setInputText(props.oldTitle)
   }else{
       props.callback(inputText.trim())
   }
}


const onChangeHandler=(text: string)=>
{
    setInputText(text)
}

const onKeyDownMediator=(key: string)=>{
if(key==='Enter')
{
    onBlurHandler(inputText)
}

}


return editMode ?
<input
 type="text"
 autoFocus
 onBlur={()=>onBlurHandler(inputText)}
 value={inputText}
 onChange={(e)=>onChangeHandler(e.currentTarget.value)}
 placeholder={'Title is required !!!'}
 onKeyDown={(e)=>onKeyDownMediator(e.key)}
 style={{backgroundColor:'yellow',
outline: '0px solid orange',
border:'0px solid orange',
fontFamily: 'monospace',
borderRadius: '5px',
}}
   
 />
:

<span
onDoubleClick={onDoubleClickHandler}
>{props.oldTitle}</span>


}