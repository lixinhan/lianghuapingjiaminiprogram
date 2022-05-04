// index.js

import { teachingBuildingFloorList,studentExamineListBuildingFloor, studentExamineListClass,classList } from "../../api/student";

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
    type:""
  },
  onLoad(query){
    //当前时间减去七天
    var startTime= new Date().setDate((new Date().getDate()-7))
    var endTime=new Date().getTime()
    this.setData({
      type:query.type,
      defaultDate:[startTime,endTime],
      date: `${this.formatDate(startTime)} 到 ${this.formatDate(endTime)}`,
      startTime:`${this.formatDate(startTime)}`,
      endTime:`${this.formatDate(endTime)}`,
    })

    if(this.data.type=="floor"){
        teachingBuildingFloorList({
          success:(res)=>{
            var data=res.data.data;
            this.setData({
              popupItems:data
            })
          }
        })
    }else{
      classList({
        success:(res)=>{
          var data=res.data.data;
          this.setData({
            popupItems:data
          })
        }
      })
    }
    

  },

  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },
  onClickItem({ detail = {} }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;
    if(activeId!==null){
      this.setData({
        floorText:this.data.popupItems[this.data.mainActiveIndex].text+detail.text,
        activeId:activeId
      })
    }else{
      this.setData({floorText:""})
    }
  },
  onSearch(){
    var startTime=this.data.startTime??"";
    var endTime=this.data.endTime??"";
    var id=this.data.activeId??"";
    if(this.data.type=="floor"){
      studentExamineListBuildingFloor({
        data:{
          start_date:startTime,
          end_date:endTime,
          teaching_building_floor_id:id
        },
        success:(res)=>{
          this.setData({
            list:res.data.data
          })
        }
      })
    }else{
      studentExamineListClass({
        data:{
          start_date:startTime,
          end_date:endTime,
          class_id:id
        },
        success:(res)=>{
          this.setData({
            list:res.data.data
          })
        }
      })
    }

  },
  goToDetail(e){
    console.log(e.currentTarget.dataset)
      if(this.data.type=='floor'){
        wx.navigateTo({
          url: "/pages/student/detail?teaching_building_floor_id="+e.currentTarget.dataset.id,
        })
      }else{
        wx.navigateTo({
          url: "/pages/student/detail?class_id="+e.currentTarget.dataset.id,
        })
      }
      console.log(e.currentTarget.dataset.teaching_building_floor_id)
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