// index.js

import { examItem } from "../../api/student";
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
// 获取应用实例
const app = getApp()
Page({
  onLoad:function(query){
    console.log("操作界面入参",query)
    this.setData({
      student_id:query.student_id,
      teaching_building_floor_id:query.teaching_building_floor_id,
      class_id:query.class_id,
      remote_type:query.remote_type,
      remote_url:query.remote_url,
      
    })
    var params={};
    if(this.data.student_id!=""){
      params.student_id=this.data.student_id
    }else if(this.data.teaching_building_floor_id!=""){
      params.teaching_building_floor_id=this.data.teaching_building_floor_id
    }else if(this.data.class_id!="")(
      params.class_id=this.data.class_id

    )
    examItem({
      data:params,
      success:(response)=>{
          this.setData({
            addItems:response.data.data.add_item,
            reduceItems:response.data.data.reduce_item
          })
      }
    })
  },
  data: {
    student_id:"",
    class_id:"",
    teaching_building_floor_id:"",
    remote_type:"",
    remote_url:"",
    selectedItems:[],
    count:0,
    addItems:[
    ],
    reduceItems:[

    ],
    mainAddActiveIndex: 0,
    mainReduceActiveIndex: 0,
    addactiveId: null,
    reduceactiveId: null,
  },
  onReduceClickNav({ detail = {} }) {
    this.setData({
      mainReduceActiveIndex: detail.index || 0,
    });
  },

  onReduceClickItem({ detail = {} }) {
    const { reduceactiveId } = this.data;

    // const index = reduceactiveId.indexOf(detail.id);
    // if (index > -1) {
    //   reduceactiveId.splice(index, 1);
    // } else {
    //   reduceactiveId.push(detail.id);
    // }
    Notify(detail.text);

    this.setData({ reduceactiveId:detail.id });
    this.setData({ addactiveId:null});
    this.setCount();

  },
  onAddClickNav({ detail = {} }) {
    this.setData({
      mainAddActiveIndex: detail.index || 0,
    });
  },

  onAddClickItem({ detail = {} }) {
    const { addactiveId } = this.data;

    // const index = addactiveId.indexOf(detail.id);
    // if (index > -1) {
    //   addactiveId.splice(index, 1);
    // } else {
    //   addactiveId.push(detail.id);
    // }
    Notify(detail.text);
    this.setData({ addactiveId:detail.id });
    this.setData({ reduceactiveId:null});

    this.setCount();
  },
  setCount(){
    let item=[];
    console.log("勾选项");
    if(this.data.addactiveId !== null){
      item.push(this.data.addactiveId)
    }
    if(this.data.reduceactiveId !== null){
      item.push(this.data.reduceactiveId)
    }
    // console.log(this.data.reduceactiveId);
    // item=item.concat(this.data.addactiveId);
    // item=item.concat(this.data.reduceactiveId);
     this.setData({
       count : item.length,
       selectedItems:item,
     })
     
  },
  goToNext(){
    var query='';
    query+=("?student_id="+this.data.student_id||"");
    query+=("&class_id="+this.data.class_id||"");
    query+=("&teaching_building_floor_id="+this.data.teaching_building_floor_id||"");
    query+=("&remote_type="+this.data.remote_type||"");
    query+=("&remote_url="+this.data.remote_url||"");
    query+=("&selected_items="+this.data.selectedItems.join(","));

    console.log(query);
    wx.navigateTo({
      url: '/pages/student/confirm'+query,
    })
  }
});
