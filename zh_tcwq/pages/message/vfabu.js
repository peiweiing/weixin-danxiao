// zh_tcwq/pages/message/vfabu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    time:"",
    site:"",
    way:"",
    wage:"",
    alt:"",
    qq:"",
    weixin:"",
    tel:"",
  },
  formSubmit:function(e){

    var tid = e.currentTarget.dataset.id;
    var a = e.currentTarget.dataset.name;
    console.log("tid:",tid +","+ "a:",a)

    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    if(e.detail.value.title == ""||e.detail.value.time == ""||e.detail.value.site == ""||e.detail.value.way == ""||e.detail.value.wage == ""||e.detail.value.alt == ""){
      console.log("空的")
      wx.showToast({
        title: '请确认内容完整',
        icon: 'loading',
        // image:'../image/about.png',
        duration: 1500
      })
    }else{
      console.log("不是空")
      var t = wx.getStorageSync("users").id;
      console.log(t)
      wx.request({
        url: 'https://jskh.lovehou.com/app/index.php?i=6&t=0&v=1.21&from=wxapp&c=entry&a=wxapp&do=Posting&&m=zh_tcwq&sign=f1e40497cdabc0cffe5bfeab959dbd09',  
        method: "GET",
        data:{title:e.detail.value.title,time:e.detail.value.time,site:e.detail.value.site,way:e.detail.value.way,wage:e.detail.value.wage,alt:e.detail.value.alt,qq:e.detail.value.qq,weixin:e.detail.value.weixin,tel:e.detail.value.tel,user_id:t,type_id:1,},
        success: function(res) {
          console.log(res)
          wx.showToast({
            title: "发布成功",
            icon: 'success',
            duration: 1500
          })
          setTimeout(() => {
            wx.reLaunch({
              // url: "../marry/opone?id=" + tid + "&name=" + a,
              // url: "../marry/opone?id=1" + "&name=" + "勤工俭学",
              url: "../index/index",
            })
            // wx.navigateBack({
            //     // url: "../marry/opone?id=" + tid + "&name=" + a,
            //     // url: "../marry/opone?id=1" + "&name=勤工俭学",
            //     delta:1
            // })
              // var pages = getCurrentPages()
              // var beforePage = pages[pages.length - 2];
              // beforePage.loadData();
              // wx.navigateBack({
              //   delta: 1,
              // })
          }, 1500);
          console.log(res); 
          
    
        }  
      })
    }
  },

})