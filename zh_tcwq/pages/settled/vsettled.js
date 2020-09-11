// zh_tcwq/pages/settled/vsettled.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:'',
    arrimg:'',
    arrimgs:false,
    arrayN:0,
    array: ['选项1', '选项2', '选项3', '选项4'],
    title:"",
    alt:"",
    price:"",
    type:"",
    qq:"",
    weixin:"",
    tel:"",
    pics:[],
    logo:[],
    img_arr: [], 
    formdata: '' ,
    isShow: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e);
    this.setData({
        urls: wx.getStorageSync("url")
    })
    var the =this;
    console.log(e);
    app.util.request({
        url: "entry/wxapp/Mytz",
        data: {
            id: e.editid,
            type:3
            // type:e.types
        },
        success: function(res) {
            console.log(res),
            the.setData({
                arr: res.data,
                arrimg:res.data.img,
                arrimgs:true
            });
        }
    });
  },



  formSubmit:function(e){
    var users = wx.getStorageSync("users").id;
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    
    if(e.detail.value.title == ""||e.detail.value.alt == ""||e.detail.value.price == ""){
      console.log("空的")
      wx.showToast({
        title: '请确认内容完整',
        icon: 'loading',
        duration: 1500
      })
    }else{
      console.log("不是空");

      wx.request({
        // url: that.data.url + "app/index.php?i=" + n + "&c=entry&a=wxapp&do=Student&m=zh_tcwq",
        url: 'https://jskh.lovehou.com/app/index.php?i=6&t=0&v=1.21&from=wxapp&c=entry&a=wxapp&do=Student&&m=zh_tcwq&sign=f1e40497cdabc0cffe5bfeab959dbd09',
        method: "GET",
        data:{title:e.detail.value.title,user_id:users,alt:e.detail.value.alt,price:e.detail.value.price,type:e.detail.value.type,qq:e.detail.value.qq,weixin:e.detail.value.weixin,tel:e.detail.value.tel,logo:this.data.logo},
        success: function(res) {
          console.log(res)
          wx.showToast({
            title: "信息成功",
            icon: 'success',
            duration: 1500
          }),
          setTimeout(
            wx.reLaunch({
              url: "../index/index"
          }),2000)
        }
      })

    }
  },


  

 /**上传图片 */
 uploadImage:function(e){
  let that=this;
  let pics = that.data.pics;
  wx.chooseImage({
    count:1,
    sizeType: ['original', 'compressed'], 
    sourceType: ['album', 'camera'], 
    success: function(res) {
      console.log(res)
      let imgSrc = res.tempFilePaths;

      pics.push(imgSrc);
      if (pics.length >= 1){
        that.setData({
          isShow: false
        }) 
      }
      that.setData({
          pics: pics
      }),
      // wx.getImageInfo({ 
      //   src: res.tempFilePaths[0], 
      //   success: function (res) { 
      //     console.log(res)
      //     that.setData({ 
            
      //     }) 
      //   } 
      // }),
      wx.uploadFile({
        url: 'https://jskh.lovehou.com/app/index.php?i=6&t=0&v=1.21&from=wxapp&c=entry&a=wxapp&do=Uploads&&m=zh_tcwq&sign=f1e40497cdabc0cffe5bfeab959dbd09', //仅为示例，非真实的接口地址
        // url: that.data.url + "app/index.php?i=" + n + "&c=entry&a=wxapp&do=Student&m=zh_tcwq", //仅为示例，非真实的接口地址
        
        filePath: imgSrc[0],
        name: 'logo',
        header: { "Content-Type": "multipart/form-data" },
        formData: {
          // 'user': 'test'
        },
        success (res){
          const data = res.data
          console.log(res)
          console.log(res.data)
          that.setData({
            logo:data
          })
          //do something
        }
      })
      
    },
  })
}, 

upimg: function () {  
  var that = this;  
  if (this.data.pics.length<1){  
  wx.chooseImage({  
    sizeType: ['original', 'compressed'],  
    success: function (res) {  
      that.setData({  
        pics: that.data.pics.concat(res.tempFilePaths)  
      })  
    }  
  })  
  }else{  
    wx.showToast({  
      title: '最多上传一张图片',  
      icon: 'loading',  
      duration: 3000  
    });  
  }  
},

  

//   /**获取标题 */
//  vtitle:function(e){
//   this.setData({
//     title:e.detail.value
//   })
// },
//   /**获取textarea值：评论内容 */
//  valt:function(e){
//   this.setData({
//     alt:e.detail.value
//   })
// },
// /**获取价格 */
// vprice:function(e){
//  this.setData({
//    price:e.detail.value
//  })
// },
// /**qq */
// vqq:function(e){
//  this.setData({
//    qq:e.detail.value
//  })
// },
// /**weixin */
// vweixin:function(e){
//  this.setData({
//    weixin:e.detail.value
//  })
//  console.log("号码"+weixin)
//  console.log("tel"+e.detail.value)
// },
// /**tel */
// vtel:function(e){
//  this.setData({
//    tel:e.detail.value
//  })
//  console.log("号码"+tel)
//  console.log("tel"+e.detail.value.tel)
// },

 //普通类型选择器：
 vtype: function (e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    index: e.detail.value
  })
},
 
 /**删除图片 */
 deleteImg:function(e){
    let that=this;
    let deleteImg=e.currentTarget.dataset.img;
    let pics = that.data.pics;
    let newPics=[];
    for (let i = 0;i<pics.length; i++){
      //判断字符串是否相等
      if (pics[i]["0"] !== deleteImg["0"]){
      newPics.push(pics[i])
      }
    }
    that.setData({
      pics: newPics,
      isShow: true
    })
  },

  /**提交 */
  submitAdvice:function(){
    let that=this;
    // let advice = that.data.advice
    // let name=this.data.name
    // let phone=this.data.phone
    // let pics=this.data.pics
    //保存操作
    
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

  }
})