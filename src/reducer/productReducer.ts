const initialState = {
    loading:false,error:null,data:[]
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "LOAD_PRODUCT_REQUEST":
          return {...state,loading:true,error:null};
      
        case "LOAD_PRODUCT_Suces":
            return {...state,loading:false,error:null,data:payload};
    
        case "LOAD_PRODUCT_Fail":
            return {...state,loading:false,error:payload};
    
        default:
          return state;
      }
}
