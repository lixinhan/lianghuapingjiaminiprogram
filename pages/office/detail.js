import { detail, end, finish, next, teacherList } from "../../api/office"
import { endPhoto } from "../../api/upload";
import { formatDate,formatTime } from "../../utils/util";

import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";

// pages/office/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    auditor_id:"",
    message:"",
    endPhoto:[],
    detail:[],
    active:"", 
    steps: [
    ],
    teacherList:[],
    //多选
    multiSelectShow:false,
    multiSelectItem:[],
    multiSelectItemActiveIndex:0,
    activeMultiSelectItemId:[],
    //单选
    singleSelectShow:false,
    singleSelectItem:[],
    singleSelectItemActiveIndex:0,
    activeSingleSelectItemId:[],
    photo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    teacherList({
      success:responseData=>{
        var data=responseData.data.data;
        var organizationSelectItem=[]
        data.forEach(element => {
            var item=[];
            element.teachers.forEach(subElement=>{
              item.push({
                id:subElement.teacher_id,
                text:subElement.teacher_name
              })
            })
            organizationSelectItem.push({
              'text':element.name,
              children:item
            })
        });
        this.setData({
          multiSelectItem:organizationSelectItem,
          singleSelectItem:organizationSelectItem,
        })
        
      }
    })
    detail({
      data:{document_circulation_id:options.id},
      success:reponseData=>{
        var data=reponseData.data.data;
        this.setData({document_circulation_auditor_id:data.document_circulation_auditor_id})
        var steps=[];
        var active="";
        var photo=[];
        for(var x in data.all){
          if(data.all[x].document_circulation_auditor_status==1){
              if(active==""){
                active=x;
                this.setData({active:x})
              }
            var desc ="待办";
          }else{
            var desc=data.all[x].document_circulation_auditor_idea
          }
          steps.push({
            text:"["+formatTime(new Date(data.all[x].document_circulation_auditor_update_time*1000))+"] "+data.all[x].teacher_name ,
            desc:desc
          })
          
          var photos=[];
          if(data.all[x].document_circulation_auditor_photo!=""){
            photos=data.all[x].document_circulation_auditor_photo.split(',')
          }
          photo=photo.concat(photos)
          this.setData({photo})
        }
        if(active==""){
          this.setData({active:data.all.length})
        }
        this.setData(
          {
            detail:data,
            steps
          }
          )
      }
    })
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  showFile(event){
    var showMenu=true;
    if(this.data.detail.document_circulation_file_can_download== "2"){
      showMenu=false
    }
    var platform="";
    wx.getSystemInfo({
      success:data=>{
          platform=data.platform;
      }
    })
    
    let suffixArr = event.currentTarget.dataset.file.split(".");
    let suffix = suffixArr[suffixArr.length - 1].toLocaleLowerCase();//获取文件地址后缀名

    console.log(suffix)
    console.log(wx.env.USER_DATA_PATH + '/'+ event.currentTarget.dataset.name)
    if(suffix=='zip'){
      if(platform=='windows' || platform=='mac'){
      }else{
        Toast.fail({message:"请使用电脑登录微信下载压缩文件.",duration:5000});
        return false;
      }
    }

    wx.downloadFile({
      
      // 示例 url，并非真实存在
      url: event.currentTarget.dataset.file,
      filePath: wx.env.USER_DATA_PATH + '/'+ event.currentTarget.dataset.name,
      success: function (res) {
        console.log(res)
        const filePath = res.filePath
        console.log(res.filePath,"临时文件地址")
        const fs = wx.getFileSystemManager()
        if(suffix=='zip'){
              wx.saveFileToDisk({
                filePath: filePath,
                success(res) {
                  console.log(res)
                },
                fail(res) {
                  console.error(res)
                }
              })
            
        }else{
          wx.openDocument({
            filePath: filePath,
            showMenu:showMenu,
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
        

        

      }
    })
  },
  //结办人
  onClickMultiSelectItemNav({ detail = {} }) {
    this.setData({
      multiSelectItemActiveIndex: detail.index || 0,
    });
  },
  onClickMultiSelectItemItem({ detail = {} }) {
    const { activeMultiSelectItemId } = this.data;
    const index = activeMultiSelectItemId.indexOf(detail.id);
    if (index > -1) {
      activeMultiSelectItemId.splice(index, 1);
    } else {
      activeMultiSelectItemId.push(detail.id);
    }
  
    this.setData({ activeMultiSelectItemId});
  },
  showMultiSelectPopup() {
    this.setData({ multiSelectShow: true });
  },
  onMultiSelectClose() {
    this.setData({ multiSelectShow: false });
  },
//审批人
  onClickSingleSelectItemNav({ detail = {} }) {
    this.setData({
      singleSelectItemActiveIndex: detail.index || 0,
    });
  },
  onClicKSingleSelectItemItem({ detail = {} }) {
    const { activeSingleSelectItemId } = this.data;
    const index = activeSingleSelectItemId.indexOf(detail.id);
    if (index > -1) {
      activeSingleSelectItemId.splice(index, 1);
    } else {
      activeSingleSelectItemId.push(detail.id);
    }
  
    this.setData({ activeSingleSelectItemId});
  },
  showSingleSelectPopup() {
    this.setData({ singleSelectShow: true });
  },
  onSingleSelectClose() {
    this.setData({ singleSelectShow: false });
  },
  onChange(event){
    this.setData({message:event.detail});

  },
  onNext(){
    next(
      {
        data:{
          document_circulation_auditor_id:this.data.document_circulation_auditor_id,
          document_circulation_auditor_type:1,
          document_circulation_auditor_idea:this.data.message,
          end_teacher_ids:this.data.activeSingleSelectItemId

        },
        success:responseData=>{
            var data=responseData.data;
            if(data.code==0){
              wx.navigateBack({
                delta: 0,
                success:function(){
                      var page=getCurrentPages().pop();
                      if(page == undefined || page == null)return;
                      page.onLoad();
                }
              })
            }else{
                Toast(data.msg)
            }
        }
    }
    );
  },
  onEnd(){
    next(
      {
        data:{
          document_circulation_auditor_id:this.data.document_circulation_auditor_id,
          document_circulation_auditor_type:2,
          document_circulation_auditor_idea:this.data.message,
          end_teacher_ids:this.data.activeMultiSelectItemId
        },
        success:responseData=>{
            var data=responseData.data;
            if(data.code==0){
              wx.navigateBack({
                delta: 0,
                success:function(){
                      var page=getCurrentPages().pop();
                      if(page == undefined || page == null)return;
                      page.onLoad();
                }
              })
            }else{
                Toast(data.msg)
            }
        }
    }
    );  },
    onFinish(){
      finish(
      {
        data:{
          document_circulation_auditor_id:this.data.document_circulation_auditor_id,
          document_circulation_auditor_idea:this.data.message,
          document_circulation_auditor_photo:this.data.endPhoto.join(",")
        },
        success:responseData=>{
            var data=responseData.data;
            if(data.code==0){
              wx.navigateBack({
                delta: 0,
                success:function(){
                      var page=getCurrentPages().pop();
                      if(page == undefined || page == null)return;
                      page.onLoad();
                }
              })
            }else{
                Toast(data.msg)
            }
        }
    }
    );  },
    selectPhoto(){
      wx.chooseImage({
        count: 10,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success:res=> {
          // tempFilePath可以作为 img 标签的 src 属性显示图片
          const tempFilePaths = res.tempFilePaths
          for( var x  in tempFilePaths){
            var uploadTask=endPhoto({
              filePath:tempFilePaths[x],
              success:(response)=>{
                  console.log(response.data);
                  var data=JSON.parse(response.data)
                  console.log(data.data.http_path)
                  var endPhoto=this.data.endPhoto;
                  console.log("图片",endPhoto)
                  endPhoto.push(data.data.http_path)
                  this.setData({
                    endPhoto:endPhoto
                  })
  
              }
          })
          }

        }
      })
    }
})