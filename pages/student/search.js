// index.js
// 获取应用实例
import { classList } from '../../api/student';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

const app = getApp()
Page({
  data: {
    type:"",
    studentName:"",
    studentNumber:"",
    classText:"",
    show:false,
    items:[],
    mainActiveIndex: 0,
    activeId: null,
  },
  onLoad(query){
    this.setData({type:query.type})
    console.log("onload")
      classList({
        success:(response)=>{
          var data=response.data.data
          console.log(data)
          this.setData({
            items:data
          })
        }
      })
  },
  showPopup(){
    this.setData(
      {show:true}
    )
  },
  onConfirm(event) {
    const { picker, value, index } = event.detail;
    Toast(`当前值：${value}, 当前索引：${index}`);
  },

  onCancel() {
    this.setData(
      {show:false}
    );
  },
  goToResult() {
    var studentNumber=this.data.studentNumber || "";
    var studentName=this.data.studentName || "";
    var classId=this.data.activeId || "";
    if(studentNumber=='' && studentName=='' && classId==''){
      Toast("请至少输入一个检索项，然后在点击搜索")
      return false;
    }

    wx.navigateTo({
      url: '/pages/student/searchresult?studentName='+studentName+'&studentNumber='+studentNumber+'&classId='+classId+"&type="+this.data.type
    })
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
  onClose() {
    this.setData({ show: false });
  },
})
