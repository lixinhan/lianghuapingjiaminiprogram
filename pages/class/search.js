// index.js

import { classList } from "../../api/student"

// 获取应用实例
const app = getApp()

Page({
  onLoad() {
    classList({
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
    indexList:[],
    mainActiveIndex: 0,
    activeId: null,
    classText:"",
  },
  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },
  onClickItem({ detail = {} }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;
    if(activeId!==null){
      this.setData({classText:this.data.items[this.data.mainActiveIndex].text+detail.text})
    }else{
      this.setData({classText:""})
    }
    this.setData({ activeId });
  },
  goToResult(e) {
    console.log();
    wx.navigateTo({
      url: '/pages/student/evidence?class_id='+e.currentTarget.dataset.id,
    })
  },

})
