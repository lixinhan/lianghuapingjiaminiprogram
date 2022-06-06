import { gradeList,organizationList, teacherExamineAdd,teacherExamineEdit,teacherExamineDetail } from "../../api/teacher";
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

// pages/teacher/launch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      teacherExamineId:"",
      teacherExamineTitle:"",
      teacherExamineDescription:"",
      teacherExamineType:'1',
      startTime:"",
      endTime:"",
      testItem:'',
      examineItem:[

      ],
      title:[],
      score:[],
      gradeSelectShow:false,
      gradeSelectItem:[],
      mainGradeActiveIndex:0,
      activeGradeId:[],
      activeGradeText:[],

      organizationSelectShow:false,
      organizationSelectItem:[],
      mainOrganizationActiveIndex:0,
      activeOrganizationId:[],
      activeOrganizationText:[],
      defaultDate:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    gradeList({
      success:(responseData)=>{
        var data=responseData.data.data;
        console.log(data)
        var gradeSelectItem=[];
        data.forEach(element => {
            gradeSelectItem.push({
              id:element.grade_id,
              text:element.department_alias
            })
        });
        this.setData({
          gradeSelectItem:[{text:"年级",children:gradeSelectItem}]
        })
      }
    })
  
    organizationList({
      success:(responseData)=>{
        var data=responseData.data.data;
        console.log(data)
        var organizationSelectItem=[];
        data.forEach(element => {
          organizationSelectItem.push({
              id:element.organization_id,
              text:element.organization_name
            })
        });
        
        this.setData({
          organizationSelectItem:[{text:"科室",children:organizationSelectItem}]
        })
        console.log(this.data.organizationelectItem)
      }
    })


    if(options.teacher_examine_id){
      teacherExamineDetail({
        data:{
          teacher_examine_id:options.teacher_examine_id
        },
        success:(responseData)=>{
          const data=responseData.data.data;
          console.log(data)
          var examineItem=[]
          var n=0;
          data.teacher_examine_item.forEach(element=>{
            examineItem.push({
              id:++n,
              title:element.name,
              score:element.score
            })
          })
          this.setData({
            teacherExamineId:data.teacher_examine_id,
            teacherExamineTitle:data.teacher_examine_title,
            teacherExamineDescription:data.teacher_examine_description,
            teacherExamineType:data.teacher_examine_type,
            activeGradeText:data.grade_names,
            activeOrganizationText:data.organization_names,
            examineItem,
            activeGradeId:data.grade_ids,
            activeOrganizationId:data.organization_ids,
            activeDateText:`${this.formatDate(data.teacher_examine_apply_start_time*1000)} 到 ${this.formatDate(data.teacher_examine_apply_end_time*1000)}`,
            defaultDate:[data.teacher_examine_apply_start_time*1000,data.teacher_examine_apply_end_time*1000],
            startTime:data.teacher_examine_apply_start_time,
            endTime:data.teacher_examine_apply_end_time
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 添加新的考核项目
   */
  addItem:function(){
    var count=this.data.examineItem;

    count.push({
      id:count.length+1 ,title:"",score:"1.0"
    })
    this.setData({
      examineItem : count
    })
  },
  onClickGradeNav({ detail = {} }) {
    this.setData({
      mainGradeActiveIndex: detail.index || 0,
    });
  },
  onClickGradeItem({ detail = {} }) {
    const { activeGradeId,activeGradeText } = this.data;
    const index = activeGradeId.indexOf(detail.id);
    if (index > -1) {
      activeGradeId.splice(index, 1);
      activeGradeText.splice(index,1);
    } else {
      activeGradeId.push(detail.id);
      activeGradeText.push(detail.text);
    }
  
    this.setData({ activeGradeId,activeGradeText});
  },
  showGradePopup() {
    this.setData({ gradeSelectShow: true });
  },

  onGradeClose() {
    this.setData({ gradeSelectShow: false });
  },
  //机构相关
  onClickOrganizationNav({ detail = {} }) {
    this.setData({
      mainOrganizationActiveIndex: detail.index || 0,
    });
  },
  onClickOrganizationItem({ detail = {} }) {
    const { activeOrganizationId,activeOrganizationText } = this.data;
    const index = activeOrganizationId.indexOf(detail.id);
    if (index > -1) {
      activeOrganizationId.splice(index, 1);
      activeOrganizationText.splice(index,1);
    } else {
      activeOrganizationId.push(detail.id);
      activeOrganizationText.push(detail.text);
    }
  
    this.setData({ activeOrganizationId,activeOrganizationText});
  },
  showOrganizationPopup() {
    this.setData({ organizationSelectShow: true });
  },

  onOrganizationClose() {
    this.setData({ organizationSelectShow: false });
  },

  //日期相关

  onDateDisplay() {
    this.setData({ dateShow: true });
  },
  onDateClose() {
    this.setData({ dateShow: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1} - ${date.getDate()}`;
  },
  onDateConfirm(event) {
    const [start, end] = event.detail;
    this.setData({
      dateShow: false,
      startTime:start.getTime()/1000,
      endTime:end.getTime()/1000+86400-1,
      activeDateText: `${this.formatDate(start)} 到 ${this.formatDate(end)}`,
    });
  },
  onTypeChange(event){
    this.setData({
      teacherExamineType: event.detail,
    });
  },
  onStepChange(event){
    var id =event.currentTarget.dataset.id;
    var examineItem=this.data.examineItem;
    examineItem.forEach(element=>{
      if(element.id==id){
          element.score=event.detail
      }
    })
    this.setData({examineItem});
  },
  onItemChange(event){
    var id =event.currentTarget.dataset.id;
    var examineItem=this.data.examineItem;
    examineItem.forEach(element=>{
      if(element.id==id){
          element.title=event.detail
      }
    })
    this.setData({examineItem});
  },
  onSubmit(){
    const {
      teacherExamineId,
      teacherExamineTitle,teacherExamineDescription,
      teacherExamineType,
      activeOrganizationId,
      activeGradeId,
      startTime,
      endTime,
      examineItem
    }=this.data;
    var item=[];
    examineItem.forEach(element=>{
      item.push({
        name:element.title,
        score:element.score
      })
    })
    const submitData={
      teacher_examine_id:teacherExamineId,
      teacher_examine_title:teacherExamineTitle,
      teacher_examine_description:teacherExamineDescription,
      teacher_examine_type:teacherExamineType,      teacher_examine_apply_start_time:startTime,
      teacher_examine_apply_end_time:endTime,
      organization_ids:activeOrganizationId,
      grade_ids:activeGradeId,
      teacher_examine_item:JSON.stringify(item)
    };

    const option={
      data:submitData,
      success:(responseData)=>{
          var data=responseData.data;
          console.log(data)
          if(data.code!=0){
            Toast(data.msg)
          }else{
            Toast(data.msg)
            wx.navigateBack({
              delta: 0,
              success:function(){
                    var page=getCurrentPages().pop();
                    if(page == undefined || page == null)return;
                    page.onLoad();
              }
            })


          //   wx.redirectTo({
          //     url: '/pages/teacher/launchlist',
          // })
            // wx.navigateTo({
            //   url: '/pages/teacher/launchlist',
            // })
          }
      }
    }
    if(this.data.teacherExamineId==""){
      teacherExamineAdd(option)
    }else{
      teacherExamineEdit(option)
    }

    
  }
})