import { defineStore } from "pinia";
const useSettingStore=defineStore('setting',{
  state:()=> ({
    fold:false
  }),
})

export default useSettingStore
