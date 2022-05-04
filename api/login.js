import { service } from "./service";
export function  login(option){ 
   option.url="miniprogram/phoneLogin";
   return service(option)
}


export function  oldLogin(option){ 
   option.url="miniprogram/login";
   return service(option)
}