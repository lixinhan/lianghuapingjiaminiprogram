import { detail, list } from "../../api/office"
import { httpBuildQuery } from "../../utils/util";

// pages/office/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doList:[],
    undoList:[],
    unauditList:[],
    active:0
  },
  getList(title){
    list({
      data:{
        document_circulation_title:title,
        document_circulation_auditor_status:1,
      },
      success:reponseData=>{
        var data=reponseData.data.data;
        this.setData({unauditList:data})
      }
    })
    list({
      data:{
        document_circulation_title:title,
        document_circulation_auditor_status:2,
      },
      success:reponseData=>{
        var data=reponseData.data.data;
        this.setData({undoList:data})
      }
    })
    list({
      data:{
        document_circulation_title:title,
        document_circulation_status:3
      },
      success:reponseData=>{
        var data=reponseData.data.data;
        this.setData({doList:data})
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(typeof(options.document_circulation_id)!="undefined"){
        detail({
          data:{
            document_circulation_id:options.document_circulation_id
          },
          success:responseData=>{
            var data=responseData.data.data;
            if(data.document_circulation_status==3){
              this.setData({
                active:2
              })
            }else if(data.document_circulation_auditor_id==""){
              this.setData({
                active:1
              })
            }
              
          }
        })
    }
    this.getList("");
    
    // wx.downloadFile({
    //   // 示例 url，并非真实存在
    //   url: 'https://lianghuapingjia.zgxwl.cn/demo.pdf',
    //   success: function (res) {
    //     const filePath = res.tempFilePath
    //     wx.openDocument({
    //       filePath: filePath,
    //       showMenu:true,
    //       success: function (res) {
    //         console.log('打开文档成功')
    //       }
    //     })
    //   }
    // })

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
    var page = getCurrentPages().pop();  // 得到这个页面对象
    page.onLoad();                       // 调用页面的onLoad()方法进行刷新页面
    wx.stopPullDownRefresh()             // 刷新成功后停止下拉刷新
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
  goToDetail(event){
    var query=httpBuildQuery({
      id:event.currentTarget.dataset.id,
      auditor_id:event.currentTarget.dataset.auditor_id
    })
    wx.navigateTo({
      url: '/pages/office/detail?'+query,
    })

  },
  onSearch(event){
    this.getList(event.detail)
  },
  onCancel(){
    this.getList();
  }
})