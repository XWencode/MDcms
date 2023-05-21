import { defineStore } from "pinia";
const useSettingStore=defineStore('setting',{
  state:()=> ({
    fold:false,
    isrefresh:false
  }),
})

export default useSettingStore
