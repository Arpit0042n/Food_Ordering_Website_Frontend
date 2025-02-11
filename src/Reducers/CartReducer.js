const username = {
    name: "", 
  }
  
  const nameReducer = (state = username,action)=>{
    switch(action.type) {
        case 'UPDATE_NAME':
            return { ...state, name: action.name };
        default:
            return state;
    } 
  }

  export default nameReducer