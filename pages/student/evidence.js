// index.js
// 获取应用实例
import { uploadImage, uploadVideo } from '../../api/upload';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

const app = getApp()

Page({
  data:{
    student_id:"",
    class_id:"",
    teaching_building_floor_id:"",
    show:false,
    loadingShow:false,
    loadingProgress:0,
    videoSrc:"",
    imageSrc:"",
  },
  onLoad(query){
    this.setData({
      student_id:query.student_id || "",
      class_id:query.class_id ||"",
      teaching_building_floor_id:query.teaching_building_floor_id ||"",
    })
    console.log("证据页面进入参数",query)
    var that=this;
    this.ctx = wx.createCameraContext()

    this.hasCameraAuth=false;
    this.hasRecordAuth=false;
      wx.getSetting({
      success:(res)=>{
        console.log(res)
          if(!res.authSetting['scope.camera']){
            that.hasCameraAuth=false;
            wx.authorize({
              scope: 'scope.camera',
              success () {
                that.hasCameraAuth=true;
              },fail(){
                that.hasCameraAuth=false;
              }
            })
          }else{
            that.hasCameraAuth=true;
          }

          if(!res.authSetting['scope.record']){
            that.hasRecordAuth=false;
            wx.authorize({
              scope: 'scope.record',
              success () {
                console.log("录像权限")
                that.hasRecordAuth=true;

              },fail(){
                console.log("打开权限失败")
                that.hasRecordAuth=false;
              }
            })
          }else{
            that.hasRecordAuth=true;
          }
      }
    })
  },
  goToNext(remoteUrl,type){
    console.log(this.data)

    wx.navigateTo({
      url: '/pages/student/operation?student_id='+this.data.student_id+"&remote_type="+type+"&remote_url="+remoteUrl+"&teaching_building_floor_id="+this.data.teaching_building_floor_id+"&class_id="+this.data.class_id
    })
  },
  upLoad (){
      this.setData({
        loadingShow:true,
        loadingProgress:0,
      })
      if(this.data.imageSrc!=""){
        var uploadTask=uploadImage({
          filePath:this.data.imageSrc,
          success:(response)=>{
            var data=response.data;
            console.log(data)
            var data=JSON.parse(data)
            this.goToNext(data.data.http_path,'photo')
          }
      })
      }else{
        var uploadTask=uploadVideo({
          filePath:this.data.videoSrc
        ,success:(response)=>{
          this.setData({
            loadingShow:false,
          })
          var data=response.data;
          var data=JSON.parse(data)
          this.goToNext(data.data.http_path,'video')
        }
          }
        )
      }

      //进度
      uploadTask.onProgressUpdate((res) => {
        console.log('上传进度', res.progress)
        this.setData({
          loadingProgress:res.progress
        })

        console.log('已经上传的数据长度', res.totalBytesSent)
        console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
      })
  },
  skip(){
    this.goToNext("","");
  },
  startVideo(){
    console.log(this.hasRecordAuth)
    console.log(this.hasCameraAuth)
    if(!this.hasCameraAuth||!this.hasRecordAuth){
      this.AuthControl()
       return false;
    }
    this.ctx.startRecord({
      success: (result) => {
      },
      timeout:5,
      timeoutCallback:(res)=>{
        this.setVideoSrc(res.tempVideoPath)
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  setVideoSrc(src){
    this.setData({
      videoSrc:src,
      imageSrc:"",
      show:true,
    })
  },
  onClose(){
    this.setData({
      videoSrc:"",
      imageSrc:"",
      show:false,
    })
  },
  setImageSrc(src){
    this.setData({
      videoSrc:"",
      imageSrc:src,
      show:true,
    })
  },
  
  endVideo(){
    this.ctx.stopRecord({
      success: (res) => {
        this.setVideoSrc(res.tempVideoPath)
      },
    })
  },
  onLongPress(){
    this.startVideo()
  },
  onTouchStart(e){
    this.startTime=e.timeStamp
    console.log(this.startTime)
  },
  onTouchEnd(e){
    this.endTime=e.timeStamp
    if(this.endTime-this.startTime>350){
      this.endVideo()
    }
  },
  AuthControl(){
    var that=this;
    Dialog.confirm({
      message: '您没有调用摄像头的权限，无法照相，请您打开权限配置或者点击跳过按钮，进行下一步操作',
      "cancelButtonText":"打开设置"
    }).then(() => {
      // on close
    }).catch(()=>{
      wx.openSetting({
        success (res) {
          console.log(res.authSetting)
          if(res.authSetting['scope.camera']){
            that.hasCameraAuth=true
          }
          if(res.authSetting['scope.record']){
            that.hasRecordAuth=true
          }
          // res.authSetting = {
          //   "scope.userInfo": true,
          //   "scope.userLocation": true
          // }
        }
      })
    });
  },
  takePhoto() {
    if(!this.hasCameraAuth){
      this.AuthControl()
       return false;
    }
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setImageSrc(res.tempImagePath)
      }
    })
  },
  error(e) {
    console.log(e.detail)
  }
});
