// index.js

import { teachingBuildingFloorList } from "../../api/student"

// 获取应用实例
const app = getApp()

Page({
  onLoad() {
    teachingBuildingFloorList({
      success:(res)=>{
        var data=res.data.data;
        var indexList=[];
        data.forEach(element => {
          indexList.push(element.text)
        });
        this.setData({
          indexList:indexList,
          classList:data
        })
      }
    })
  },
  data: {
    classList:[],
    indexList:[
    ]
  },
  goToResult(e) {
    console.log();
    wx.navigateTo({
      url: '/pages/student/evidence?teaching_building_floor_id='+e.currentTarget.dataset.id,
    })
  },

})
