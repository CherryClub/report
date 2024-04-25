export function localHandlerFactory(key){
  return {
    get(){
      let v =  localStorage[key]
      if(v===undefined){return undefined}
      return JSON.parse(v)
    },
    set(value){
      if(value === undefined || value === null){
        return 
      }
      localStorage[key] = JSON.stringify(value)
    },
    remove(){
      delete localStorage[key];
    }
  }
}
export function localSpaceFactory(spacename=''){
  return {
    get(key=''){
      let v =  localStorage[`${spacename}_${key}`]
      if(v===undefined){return undefined}
      return JSON.parse(v);
    },
    set(key='',value){
      if(value === undefined || value === null){
        return 
      }
      localStorage[`${spacename}_${key}`] = JSON.stringify(value)
    },
    remove(key){
      delete localStorage[`${spacename}_${key}`]
    },
    bind(key=''){
      return localHandlerFactory(`${spacename}_${key}`);
    }
  }
}