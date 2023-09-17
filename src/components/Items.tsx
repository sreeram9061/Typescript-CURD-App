import{useRef, useState} from 'react'
import "./items.scss"
import { useAppContext } from '../context/AppContext'
import { itemType } from './reducer/reducer'

const Items = () => {

   const {setData,getData,editData,setEditOption,deleteData}=useAppContext()

   const inputRef=useRef<HTMLInputElement |null>(null)

   const [itemData,setItemData]=useState({} as itemType)
   const datas=getData()

   const handleClick=()=>{
    if(!datas.editOption ){
        if(inputRef.current) setData(  inputRef.current.value)
    }else{
        console.log("exicuted")
        if(inputRef.current) editData({
            id:itemData.id,
            name:inputRef.current.value
        })
    }
    if(inputRef.current) inputRef.current.value=""
   }

   const handleEdit=(item:itemType)=>{
    if(inputRef.current) inputRef.current.value=item.name
    setItemData(item)
    setEditOption()
   }

  return (
    <div className='container'>
    <header>
        <input ref={inputRef}   type="text" />
        <button  style={{width:"100px"}} onClick={()=>{if(inputRef.current) inputRef.current.value!="" &&handleClick()}}>
            {!datas.editOption?"Create":"Recreate"}
        </button>
    </header>
       {datas.items.length!=0 && (
        <div className="content">
          <ul>
          {
             datas.items.map(item=>{
                 return (
                  <li key={item.id} style={datas.editOption&&item.id==itemData.id ? {background:"rgba(54, 4, 32, 0.682)"}:{}}>
                      <p>{item.name}</p>
                      <div className="btns">
                      <button onClick={()=>handleEdit(item)}>Edit</button>
                      <button onClick={()=>deleteData(item.id)}>Delete</button>
                      </div>
                  </li>
               )
              })
          }
          </ul>
       </div>
       )} 
    </div>
  )
}

export default Items
