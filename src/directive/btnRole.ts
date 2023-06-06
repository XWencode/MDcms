import pinia from "@/store";
import useUserState from "@/store/modules/user/user";
let userStore=useUserState(pinia)
export const isHasBtn=(app:any)=>{
  // 获取对应的用户仓库
  // 全局自定义指令：实现按钮的权限
  app.directive('btnrole',{
    //代表使用这个全局自定义指令的 DOM|组件挂载完毕的时候会执行一次
    mounted(el:any,options:any) {
      // el:使用了自定义指令的DOM元素
      // option：存储使用了该自定义指令的值(option.value)
      // 如果绑定的值在该用户的按钮权限中不存在则删除该DOM元素
      if(!userStore.roleBtnList.includes(options.value)){
        // 调用当前父节点删除当前节点的方法
        el.parentNode.removeChild(el)
      }
    },
  })
}
