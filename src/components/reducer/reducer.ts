

export type itemType={
    id:number,
    name:string
}

export type stateType={
    editOption:boolean
    items:itemType[]
}


type actionType={
    type:"SETITEM" | "EDITDATA"
    payload:itemType
} | {
    type:"SETEDITOPTION" | "DELETE",
    payload?:number
}

export const reducer = (state:stateType,action:actionType):stateType=>{
    switch (action.type) {
        case "SETITEM":
            return {editOption:state.editOption ,items:[...state.items,action.payload]}
        case "EDITDATA":
            return {
                editOption:false,
                items:state.items.map(item=>{
                    if(item.id!=action.payload.id) return item
                    return action.payload
                })
            }
        case "SETEDITOPTION":
            return {...state,editOption:true}
        case "DELETE":
            return {
                editOption:state.editOption,
                items:state.items.filter(item=>item.id!=action.payload)
            }
        default:
            return state
    }

}