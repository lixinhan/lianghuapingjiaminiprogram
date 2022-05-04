// index.js

import { examineItemDetail } from "../../api/student"

// 获取应用实例
const app = getApp()

Page({
  onLoad() {
    examineItemDetail({
      success:(res)=>{
        var data=res.data.data;
        var indexList=[];
        data.forEach(element => {
          indexList.push(element.text)
          element.children.forEach(item=>{
            item.category_id=parseInt(item.category_id)
            item.class_score=parseFloat(item.class_score)
            item.student_score=parseFloat(item.student_score)
            item.teaching_building_floor_score=parseFloat(item.teaching_building_floor_score)
          })
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
