
window.VKM = {
  local:{
    key:'simu_report_local_version_version',
    get(){
      let v =  localStorage[this.key]
      if(v===undefined){return undefined}
      return JSON.parse(v)
    },
    set(value){
      if(value === undefined || value === null){
        return 
      }
      localStorage[this.key] = JSON.stringify(value)
    },
    remove(){
      delete localStorage[this.key];
    },
  },
  versionKeys:[],
  add(key){
    if(this.versionKeys.indexOf(key) === -1){
      this.versionKeys.push(key)
    }
    if(!this.checkLocalVersion()){
      this.persist()
    }
  },
  remove(key){
    let index = this.versionKeys.indexOf(key)
    if(index !== -1){
      this.versionKeys.splice(index, 1)
    }
    if(!this.checkLocalVersion()){
      this.persist()
    }
  },
  clear(){
    this.versionKeys = []
    this.local.remove()
  },
  get(){
    return JSON.parse(JSON.stringify(this.versionKeys))
  },
  persist(){
    this.local.set(this.versionKeys)
  },
  checkLocalVersion(){
    let localVersion = this.local.get()
    if(!localVersion){
      return false
    }
    return JSON.stringify(localVersion) === JSON.stringify(this.versionKeys)
  }
};