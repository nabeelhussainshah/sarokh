export function UpdateAction(state, payload){
  console.log(state,payload);
    return {
      ...state,
      data: {
        ...state.data,
        ...payload
      }
    };
  }

export function DeleteAction(state,payload){

  return {

  };
}