import React, {createContext, useContext, useReducer } from "react"
import { itemType, reducer, stateType } from "../components/reducer/reducer"


type tyepValueOfContext={
    setData:(val:string)=>void,
    getData:()=>stateType
    editData:(item:itemType)=>void
    setEditOption:()=>void,
    deleteData:(id:number)=>void
}

const contextApp=createContext({} as tyepValueOfContext)

export const useAppContext =()=>{
   return useContext(contextApp)
}

type propsType={
    children:React.ReactNode
}

const AppContext = ({children}:propsType) => {

   const[state,dispatch]= useReducer(reducer,{editOption:false,items:[]})
   console.log(state)

   const setData=(val:string)=>{
    const item:itemType={
        id: state.items.length==0 ? 0 : state.items[state.items.length-1].id+1,
        name:val
    }
    dispatch({type:"SETITEM",payload:item})
   }
   
    const getData=():stateType=>{
    return state
   }

   const editData=(item:itemType)=>{
    dispatch({
        type:"EDITDATA",
        payload:item
    })
   }

   
   const setEditOption=()=>{
    dispatch({type:"SETEDITOPTION"})
   }

   const deleteData=(id:number)=>{
    dispatch({type:"DELETE",payload:id})
   }
  return (
    <contextApp.Provider value={{setData,getData,editData,setEditOption,deleteData}}>
      {children}
    </contextApp.Provider>
  )
}

export default AppContext
