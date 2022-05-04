// index.js

const { login,oldLogin } = require("../../api/login")

// 获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  getPhoneNumber (e) {
    var code = e.detail.code||"";
    if(code==""){
      wx.login({
        success:(res)=>{
          console.log(e)
            //如果是老版本
            oldLogin({
              data:{
                encrypted_data:e.detail.encryptedData,
                iv:e.detail.iv,
                wx_login_code:res.code
              },
              success(response){
                var data=response.data;
                console.log(data)
                if(data.code==0){
                  wx.setStorageSync("login_token", data.data.teacher_login_token)
                  wx.switchTab({
                    url: '/pages/index/index',
                    success: function (e) {  
                      var page = getCurrentPages().pop();  
                      if (page == undefined || page == null) return;  
                      page.onLoad();  
                    }  
                  })
                }else{
                  wx.showToast({
                    title: data.msg,
                  })
                }
                
              },
              error(data){
                wx.showToast({
                  title: data.msg,
                })
              }
            })
        }
      })
    }else{
      wx.login({
        success:(res)=>{
            //如果是新版本
            login({
              data:{
                phone_code:e.detail.code,
                wx_login_code:res.code
              },
              success(response){
                var data=response.data;
                console.log(data)
                if(data.code==0){
                  wx.setStorageSync("login_token", data.data.teacher_login_token)
                  wx.switchTab({
                    url: '/pages/index/index',
                    success: function (e) {  
                      var page = getCurrentPages().pop();  
                      if (page == undefined || page == null) return;  
                      page.onLoad();  
                    }  
                  })
                }else{
                  wx.showToast({
                    title: data.msg,
                  })
                }
                
              },
              error(data){
                wx.showToast({
                  title: data.msg,
                })
              }
            })
        }
      })

    }
    
  },
})
