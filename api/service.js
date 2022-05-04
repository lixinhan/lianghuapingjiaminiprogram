import { API_BASE_URL } from "../config/config";


export function service(option){

  option.url=API_BASE_URL+"miniprogram/"+option.url;
  console.log(option)
  const loginToken=wx.getStorageSync('login_token');
  console.log("登录秘钥",loginToken)
  if(typeof(option.header)=='undefined'){
      option.header={}
  }
  if(typeof(option.goToLoginPage)=='undefined'){
    option.goToLoginPage=true
  }
  option.header['login_token']=loginToken
  
  option.complete=function(res){
      if(option.goToLoginPage==true&&res.data.code==90000){
        console.log("需要登录了")
        wx.setStorageSync('login_token',"")
        wx.navigateTo({
          url: '/pages/system/login',
        })
      }
  }
  return wx.request(option)
} 
export function upload(option){
  option.url=API_BASE_URL+"miniprogram/"+option.url;
  const loginToken=wx.getStorageSync('login_token');
  console.log("登录秘钥",loginToken)
  if(typeof(option.header)=='undefined'){
      option.header={}
  }
  option.header['login_token']=loginToken
  option.name='file';
  option.complete=function(res){

      if(typeof(res.data.code)!=="undefined"&&res.data.code==90000){
        console.log("需要登录了")
        wx.setStorageSync('login_token',"")
        wx.navigateTo({
          url: '/pages/system/login',
        })
      }
  }
  return wx.uploadFile(option)
  
} 