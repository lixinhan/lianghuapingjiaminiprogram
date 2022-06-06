import { service } from "./service";

//公文列表
export function  list(option){ 
   option.url="documentCirculation/auditor";
   return service(option)
}
//公文详情
export function  detail(option){ 
   option.url="documentCirculation/auditorDetail";
   return service(option)
}

//下级审批人
export function next(option){
  option.url="documentCirculation/next";
  option.method="POST"
  return service(option)
}

//公文结办
export function finish(option){
  option.url="documentCirculation/end";
  option.method="POST"
  return service(option)
}

//
export function teacherList(option){
  option.url="organization/teacherList";
  return service(option)
}
