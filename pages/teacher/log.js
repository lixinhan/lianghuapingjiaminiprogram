// index.js

import { teacherExamineLog } from "../../api/teacher";

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
    var startTime= new Date().setDate((new Date().getDate()-30))
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
    teacherExamineLog({
      data:{
        start_date:startTime,
        end_date:endTime,
      },
      success:(response)=>{
        var data=response.data.data;
        
        this.setData({
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