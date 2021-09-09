export const changer=(initialState, newValue)=>{
    const updatedState={...initialState}
    updatedState.value=newValue
    return updatedState
}
