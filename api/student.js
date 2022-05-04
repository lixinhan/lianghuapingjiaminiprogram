import { service } from "./service";
export function  studentSeach(option){ 
   option.url="student/search";
   return service(option)
}
export function  examineItemDetail(option){ 
   option.url="student/examineItemDetail";
   return service(option)
}

export function  classList(option){ 
   option.url="student/classList";
   return service(option)
}

export function  teachingBuildingFloorList(option){ 
   option.url="student/teachingBuildingFloorList";
   return service(option)
}

export function  studentDetail(option){ 
   option.url="student/getStudent";
   return service(option)
}
//学生考核详情
export function  studentExamineDetail(option){ 
   option.url="student/studentExamineDetail";
   return service(option)
}
//查询考核日志
export function  examineItemLog(option){ 
   option.url="student/examineItemLog";
   return service(option)
}
//楼层考核详情
export function  studentExamineDetailBuildingFloor(option){ 
   option.url="student/studentExamineDetailBuildingFloor";
   return service(option)
}
//班级考核详情
export function  studentExamineDetailClass(option){ 
   option.url="student/studentExamineDetailClass";
   return service(option)
}

export function  classDetail(option){ 
   option.url="student/classDetail";
   return service(option)
}

export function  teachingBuildingFloorDetail(option){ 
   option.url="student/teachingBuildingFloorDetail";
   return service(option)
}
export function  examItem(option){ 
   option.url="student/examineItem";
   return service(option)
}

export function  studentExamineitems(option){ 
   option.url="student/studentExamineitems";
   option.method="post"
   return service(option)
}

export function  score(option){ 
   if(option.data.student_id!=""){
      option.url="student/scoreStudent";
   }else if(option.data.class_id!=""){
      option.url="student/scoreClass";
   }else{
      option.url="student/scoreBuildingFloor";
   }
   option.method="post"
   return service(option)
}
//楼层统计查询
export function  studentExamineListBuildingFloor(option){ 
   option.url="student/studentExamineListBuildingFloor";
   option.method="get"
   return service(option)
}
//班级统计查询
export function  studentExamineListClass(option){ 
   option.url="student/studentExamineListClass";
   option.method="get"
   return service(option)
}