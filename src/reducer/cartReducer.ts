const initialState = {
    loading:false,error:null,data:[]
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "LOAD_Cart_REQUEST":
          return {...state,loading:true,error:null};
      
        case "LOAD_Cart_Suces":
            return {...state,loading:false,error:null,data:payload};
    
        case "LOAD_Cart_Fail":
            return {...state,loading:false,error:payload};
    
        default:
          return state;
      }
}
