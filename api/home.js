import { service } from "./service";
export function  powerList(option){ 
   option.url="teacher/powerList";
   option.goToLoginPage=false;
   return service(option)
}
