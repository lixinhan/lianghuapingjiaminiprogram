// index.js

import { studentSeach } from "../../api/student"

// 获取应用实例
const app = getApp()

Page(
  {
    onLoad(query){
      console.log("参数",query)
      const that=this;
      this.setData({
        type:query.type
      })
      studentSeach({
        data:{
          student_name:query.studentName||"",
          student_number:query.studentNumber||"",
          class_id:query.classId||""
        },
        method:'GET',
        success:function(response){
          var data=response.data.data;
            for(var x in data){
                data[x].total_score=parseInt(data[x].student_init_score)+parseInt(data[x].student_add_score)-parseInt(data[x].student_reduce_score)
            }
            that.setData({
              showLoading:false,
              studentlist:data
            })
        }
      })
    },
  data: {
    "studentlist":[
    ],
    showLoading:true
  },
  goToOperation(e){
    console.log("页面类型",this.data.type);
    if(this.data.type=='examine'){
      wx.navigateTo({
        url: "/pages/student/evidence?student_id="+e.currentTarget.dataset.id,
      })
    }else{
      wx.navigateTo({
        url: "/pages/student/detail?student_id="+e.currentTarget.dataset.id,
      })
    }

  },
  // 事件处理函数
  bindViewTap() {
  
  }
})
