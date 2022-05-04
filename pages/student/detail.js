// index.js
// 获取应用实例
import { uploadImage, uploadVideo } from '../../api/upload';
import { studentDetail,classDetail,teachingBuildingFloorDetail, studentExamineitems,studentExamineDetail,studentExamineDetailClass,studentExamineDetailBuildingFloor } from '../../api/student';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

const app = getApp()

Page({
  data:{
    student_id:"",
    class_id:"",
    teaching_building_floor_id:"",

    teacher_name:"",
    remote_type:"",
    remote_url:"",

    item:{},
    classItem:{},
    teachingBuildingFloorItem:{},
    list:[]
  },
  formatDate(time){
    time=time*1000;
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    month = month < 10 ? "0"+month:month;
    day = day < 10 ? "0"+day:day;
    return month+'-'+day
  },
  onLoad(query){
    console.log("进入页面参数",query)
    this.setData({
      student_id:query.student_id??"",
      teaching_building_floor_id:query.teaching_building_floor_id??"",
      class_id:query.class_id??"",
    })
    if(this.data.student_id != ''){
      //学生详情
      studentDetail({
        data:{student_id:query.student_id},
        success:(res)=>{
          var data=res.data.data;
          data.total_score=parseInt(data.student_init_score)+parseInt(data.student_add_score)-parseInt(data.student_reduce_score)
          this.setData({
            item:data
          })  
        }
      })
      //学生考核详情
      studentExamineDetail({
        data:{
          student_id:this.data.student_id
        },
        success:(res)=>{
           var data=res.data.data;
           for(var i in data){
            data[i].create_time=this.formatDate(data[i].student_examine_log_student_create_time)
           }
           this.setData({
             list:data
           })
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

        }
      })
            //班级详情
            studentExamineDetailClass({
              data:{
                class_id:this.data.class_id
              },
              success:(res)=>{
                 var data=res.data.data;
                 for(var i in data){
                  data[i].create_time=this.formatDate(data[i].student_examine_log_class_create_time)
                 }
                 this.setData({
                   list:data
                 })
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

        }
      })

      //楼层详情
      studentExamineDetailBuildingFloor({
        data:{
          teaching_building_floor_id:this.data.teaching_building_floor_id
        },
        success:(res)=>{
           var data=res.data.data;
           for(var i in data){
            data[i].create_time=this.formatDate(data[i].student_examine_log_building_floor_create_time)
           }
           this.setData({
             list:data
           })
        }
      })
    }
    console.log("页面进入参数",query)
  },
  calcScore(){
    
    var student_score=this.data.student_socre;
    var class_socre=this.data.class_socre;
    var teaching_building_floor_score=this.data.teaching_building_floor_score;
    var items=this.data.student_examine_items;
      items.forEach(element => {
        console.log("楼层分数",element.teaching_building_floor_score)
            if(element.student_examine_category_id=="1"){
            console.log(parseInt(element.student_score))
            student_score+=parseInt(element.student_score);
            class_socre+=parseInt(element.class_score);
            teaching_building_floor_score+=parseInt(element.teaching_building_floor_score);
            console.log("相加后分数",teaching_building_floor_score)
          }else{
            student_score-=parseInt(element.student_score);
            class_socre-=parseInt(element.class_score);
            teaching_building_floor_score-=parseInt(element.teaching_building_floor_score);
          }
      });
      this.setData({
        student_score:student_score,
        class_socre:class_socre,
        teaching_building_floor_score:teaching_building_floor_score,
        student_final_score:student_score+parseInt(this.data.item.total_score)
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
      
    },
    showDetail(e){
      var data=e.currentTarget.dataset
      console.log(data)
      this.setData({
        show:true,
        teacher_name:data.teacher_name,
        remote_type:data.remote_type,
        remote_url:data.remote_url
      })
    },
    onClose(){
      this.setData({
        show:false
      })
    }
});
