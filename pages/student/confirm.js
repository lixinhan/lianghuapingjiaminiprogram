// index.js
// 获取应用实例
import { uploadImage, uploadVideo } from '../../api/upload';
import { studentDetail,classDetail,teachingBuildingFloorDetail, studentExamineitems,score } from '../../api/student';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

const app = getApp()

Page({
  data:{
    student_id:"",
    student_id:"",
    class_id:"",
    teaching_building_floor_id:"",
    remote_type:"",
    remote_url:"",
    selected_items:"",

    student_socre:0,
    class_socre:0,
    teaching_building_floor_score:0,
    student_final_score:0,

    item:{},
    classItem:{},
    teachingBuildingFloorItem:{},
    student_examine_items:[]

  },
  onLoad(query){
    console.log(query)
    this.setData({
      student_id:query.student_id,
      teaching_building_floor_id:query.teaching_building_floor_id,
      class_id:query.class_id,
      remote_type:query.remote_type,
      remote_url:query.remote_url,
      selected_items:query.selected_items
    })
    studentExamineitems({
      data:{student_examine_item_ids:query.selected_items},
      success:(res)=>{
        var data=res.data.data;
        this.setData({
          student_examine_items:data
        })
        this.calcScore();
      }
    })
    if(this.data.student_id != ''){
      studentDetail({
        data:{student_id:query.student_id},
        success:(res)=>{
          var data=res.data.data;
          data.total_score=parseFloat(data.student_init_score)+parseFloat(data.student_add_score)-parseFloat(data.student_reduce_score)
  
          this.setData({
            item:data
          })
          this.calcScore();
  
        }
      })
    }
    if(this.data.class_id != ''){
      classDetail({
        data:{class_id:query.class_id},
        success:(res)=>{
          var data=res.data.data;
          this.setData({
            classItem:data
          })
          this.calcScore();

        }
      })
    }
    if(this.data.teaching_building_floor_id != ''){
      teachingBuildingFloorDetail({
        data:{teaching_building_floor_id:query.teaching_building_floor_id},
        success:(res)=>{
          var data=res.data.data;
          this.setData({
            teachingBuildingFloorItem:data
          })
          this.calcScore();

        }
      })
    }
    console.log("页面进入参数",query)
  },
  calcScore(){
    
    var student_score=0;
    var class_socre=0;
    var teaching_building_floor_score=0;
    var items=this.data.student_examine_items;
      items.forEach(element => {
        console.log("楼层分数",element.teaching_building_floor_score)
            if(element.student_examine_category_id=="1"){
            console.log(parseFloat(element.student_score))
            student_score+=parseFloat(element.student_score);
            class_socre+=parseFloat(element.class_score);
            teaching_building_floor_score+=parseFloat(element.teaching_building_floor_score);
            console.log("相加后分数",teaching_building_floor_score)
          }else{
            student_score-=parseFloat(element.student_score);
            class_socre-=parseFloat(element.class_score);
            teaching_building_floor_score-=parseFloat(element.teaching_building_floor_score);
          }
      });
      this.setData({
        student_score:student_score,
        class_socre:class_socre,
        teaching_building_floor_score:teaching_building_floor_score,
        student_final_score:student_score+parseFloat(this.data.item.total_score)
      })
      console.log(student_score,this.data.item.total_score)
    },
    onConfirm(){
      var type=1;
      switch(this.data.remote_type){
        case "video":
          type=2;
          break;
          case "photo":
            type=3
            break;
      }
      score({
        data:{
          student_id:this.data.student_id,
          teaching_building_floor_id:this.data.teaching_building_floor_id,
          class_id:this.data.class_id,
          student_examine_log_file_type:type,
          student_examine_log_file_url:this.data.remote_url,
          student_examine_item_ids:this.data.selected_items.split(","),
        },success:(res)=>{
          var data=res.data;
          if(data.code!=0){
            console.log(data);
            wx.showToast({
              title: data.msg,
            })
          }else{
            wx.showToast({
              title: data.msg,
              duration:2000,
              success:function(){
                setTimeout(function(){
                  wx.switchTab({
                    url: '/pages/index/index'
                  })
                },2000)
                
              }
            })
            
          }
          
        }
      })
      
    }
});
