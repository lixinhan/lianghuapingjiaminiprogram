// index.js

import { examineItemLog } from "../../api/student";

// 获取应用实例
const app = getApp()

Page({
  data: {
    minDate: new Date(2022, 0, 1).getTime(),
    defaultDate:[],
    date: '',
    show: false,
    popupShow:false,
    popupItems:[],
    floorText:"",
    mainActiveIndex: 0,
    activeId: null,
    startTime:null,
    endTime:null,
    list:[],
    type:"",
    studentAddScore:"",
    classAddScore:"",
    floorAddScore:"",
    studentReduceScore:"",
    classReduceScore:"",
    floorReduceScore:"",
  },
  onLoad(query){
    //当前时间减去七天
    var startTime= new Date().setDate((new Date().getDate()-1))
    var endTime=new Date().getTime()
    this.setData({
      type:query.type,
      defaultDate:[startTime,endTime],
      date: `${this.formatDate(startTime)} 到 ${this.formatDate(endTime)}`,
      startTime:`${this.formatDate(startTime)}`,
      endTime:`${this.formatDate(endTime)}`,
    })
  },
  unixstamp2Date(timestamp) {
    var date = new Date(timestamp);
    console.log(date);
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
    
    var strDate = M+D;
    return strDate;
    
},
  onSearch(){
    var startTime=this.data.startTime??"";
    var endTime=this.data.endTime??"";
    examineItemLog({
      data:{
        start_date:startTime,
        end_date:endTime,
      },
      success:(response)=>{
        var data=response.data.data;
        var studentAddScore=0;
        var classAddScore=0;
        var floorAddScore=0;
        var studentReduceScore=0;
        var classReduceScore=0;
        var floorReduceScore=0;
        data.forEach(element => {
          element.student_examine_log_score_student=parseFloat(element.student_examine_log_score_student)
          element.student_examine_log_score_building_floor=parseFloat(element.student_examine_log_score_building_floor)
          console.log(element.student_examine_log_create_time);
          element.time=this.unixstamp2Date(element.student_examine_log_create_time*1000);
          element.student_examine_log_score_class=parseFloat(element.student_examine_log_score_class)
          
          if(element.student_examine_log_category_id=="1"){
            studentAddScore+=parseFloat(element.student_examine_log_score_student)
            classAddScore+=parseFloat(element.student_examine_log_score_class)
            floorAddScore+=parseFloat(element.student_examine_log_score_building_floor)
          }else{
            studentReduceScore-=parseFloat(element.student_examine_log_score_student)
            classReduceScore-=parseFloat(element.student_examine_log_score_class)
            floorReduceScore-=parseFloat(element.student_examine_log_score_building_floor)

          }
          
        });
        this.setData({
          studentAddScore:studentAddScore,
          classAddScore:classAddScore,
          floorAddScore:floorAddScore,
          studentReduceScore:studentReduceScore,
          classReduceScore:classReduceScore,
          floorReduceScore:floorReduceScore,
          list:data
        })
    }
    })
  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  showPopup(){
    this.setData({
      popupShow:true
    })
  },
  closePopup(){
    this.setData({
      popupShow:false
    })
  },
  onConfirm(event) {
    const [start, end] = event.detail;
    console.log(Date.parse(start),end);
    this.setData({
      show: false,
      date: `${this.formatDate(start)} 到 ${this.formatDate(end)}`,
      startTime:`${this.formatDate(start)}`,
      endTime:`${this.formatDate(end)}`,
    });
  },
});