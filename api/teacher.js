import { service } from "./service";
export function  gradeList(option){ 
   option.url="teacherExamine/gradeList";
   return service(option)
}
export function  organizationList(option){ 
   option.url="teacherExamine/organizationList";
   return service(option)
}

/**
 * 教师考核发起
 * @param {*} option 
 */
export function teacherExamineAdd(option){
  option.url="teacherExamine/add";
  option.method="POST"
  return service(option)
}


/**
 * 教师考核修改
 * @param {*} option 
 */
export function teacherExamineEdit(option){
  option.url="teacherExamine/edit";
  option.method="POST"
  return service(option)
}

/**
 * 申报发起人考核列表
 * @param {*} option 
 */
export function teacherExamineList(option){
  option.url="teacherExamine/list";
  // option.method="POST"
  return service(option)
}

/**
 * 教师考核详情
 * @param {*} option 
 */
export function teacherExamineDetail(option){
  option.url="teacherExamine/detail";
  // option.method="POST"
  return service(option)
}

/**
 * 教师申报列表
 */
export function teacherExamineApplyList(option){
  option.url="teacherExamine/applyList";
  // option.method="POST"
  return service(option)
}


/**
 * 教师申请考核详情
 * @param {*} option 
 */
export function teacherExamineApplyDetail(option){
  option.url="teacherExamine/applyDetail";
  // option.method="POST"
  return service(option)
}

/**
 * 教师申请考核详情
 * @param {*} option 
 */
export function teacherExamineApply(option){
  option.url="teacherExamine/apply";
  option.method="POST"
  return service(option)
}


/**
 * 教师审核列表
 */
export function teacherExamineAuditList(option){
  option.url="teacherExamine/auditList";
  return service(option)
}



/**
 * 教师审核列表
 */
export function teacherExamineAudit(option){
  option.url="teacherExamine/audit";
  return service(option)
}


/**
 * 教师考核日志
 */
export function teacherExamineLog(option){
  option.url="teacherExamine/auditRecord";
  return service(option)
}