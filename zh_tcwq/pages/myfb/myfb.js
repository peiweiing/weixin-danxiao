// zh_tcwq/pages/myfb/myfb.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      urls:'',
      arr:[],
      arra:[
        // {id:'1',type_id:'2',user_name:'鱼大厨',details:'失物中份老碗鱼儿',img:'../../pages/image/dfsd.png'
        // img: [
        //   { url:'../image/dfsd.png'},
        //   { url:'../image/dfsd.png'},
        //   { url:'../image/dfsd.png'},
        // ],
        // },
        // {id:'2',type_id:'5',title:'鱼大厨',text:'中份老碗鱼儿',img:'../../pages/image/dfsd.png'},
        // {id:'3',type_id:'6',title:'鱼大厨',text:'中份老碗鱼儿',img:'../../pages/image/dfsd.png'},
      ],
      arrb:[],
      arrc:[],
  },
  goto(event){
    console.log(event.currentTarget);
    var index = event.currentTarget.dataset.index;
    var types = event.currentTarget.dataset.types;
    var the = this;
    console.log("跳转",index,"类型",types);
    
    if(types=='1'||types=='6'||types=='7'||types=='8'||types=='9'){
      wx.navigateTo({
        url: '../infodetial/infodetial?editid='+ index + "&types=" + types
      })
    }else if(types=='3'){
      wx.navigateTo({
        url: '../sellerinfo/sellerinfo?editid='+ index + "&types=" + types
      })
    }else if(types=='10'){
      wx.navigateTo({
        url: '../shun/shuninfo2/shuninfo2?editid='+ index + "&types=" + types
      })
    }else{
      wx.navigateTo({
        url: '../infodetial/infodetial?editid='+ index + "&types=" + types,
      })
    }
    // if(types==0){
        // wx.navigateTo({
        //   url: '../fabu/edit/edit?editid='+ index + "&types=" + types
        // })
    // }else if(types==2){
    //   wx.navigateTo({
    //     url: '../fabu/edit/edit?editid='+ index
    //   })
    // }else if(types==5){
    //   wx.navigateTo({
    //     url: '../fabu/edit/edit?editid='+ index
    //   })
    // }else if(types==123){
      // wx.navigateTo({
      //   url: '../fabu/typefabu/typefabu?editid=index'
      // })
      // wx.navigateTo({
      //   url: "../fabu/typefabu/typefabu?editid=" + index + "&types=" + types + "&user_id=" + uid + "&type2_id=" + ddd + "&id=" + idd + "&details=" + det + "&money=" + mm + "&info=" +ii  
      // })
    // }
    
  },
  redact(event){
    var index = event.currentTarget.dataset.index
    var types = event.currentTarget.dataset.types;
    var arr = this.data.arr
    var the =this;
    console.log("编辑：",index,"类型：",types);
    
    if(types=='6'||types=='7'||types=='8'||types=='9'){
      wx.navigateTo({
        url: '../fabu/typefabu/typefabu?editid='+ index + "&types=" + types
      })
    }else if(types=='1'){
      wx.navigateTo({
        url: '../message/vfabu?editid='+ index + "&types=" + types
      })
    }else if(types=='3'){
      wx.navigateTo({
        url: '../settled/vsettled?editid='+ index + "&types=" + types
      })
    }else if(types=='10'){
      wx.navigateTo({
        url: '../shun/shunfabu/shunfabu?editid='+ index + "&types=" + types
      })
    }else{
      wx.navigateTo({
        url: '../fabu/edit/edit?editid='+ index + "&types=" + types,
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          someEvent: function(data) {
            console.log(data)
          }
        },
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: arr })
        }
      })
    }
    // app.util.request({
    //   url: "entry/wxapp/mylist",
    //   data: {
    //       user_id: wx.getStorageSync("users").id,
    //       type:types
    //   },
    //   success: function(res) {
    //       console.log(res),
    //       the.setData({
    //           arr: res.data
    //       });
    //   }
    // });
    // wx.request({
    //   url: 'test.php', //仅为示例，并非真实的接口地址
    //   data: {},
    //   header: {},
    //   success (res) {
    //     console.log(res.data);
    //   }
    // })
  },
  close(event){
    var index = event.currentTarget.dataset.index;
    var types = event.currentTarget.dataset.types;
    var the = this;
    console.log("删除：",index,"类型：",types);
    wx.showModal({
			title: '提示',
			content: '确认删除吗？',
			success: function(res) {
				if (res.confirm) {
          console.log('用户点击确定')
          if(types==10){//拼车10，传2
            app.util.request({
              url: "entry/wxapp/DelList",
              data: {
                  type: 2,
                  id:index
              },
              success: function(res) {
                  console.log(res);
                  if(res.data==1){
                    // app.util.request({
                    //   url: "entry/wxapp/mylist",
                    //   data: {
                    //       user_id: wx.getStorageSync("users").id
                    //   },
                    //   success: function(res) {
                    //       console.log(res),
                    //       the.setData({
                    //           arr: res.data
                    //       });
                    //   }
                    // });

                    app.util.request({
                      url: "entry/wxapp/mylist",
                      data: {
                          user_id: wx.getStorageSync("users").id
                      },
                      success: function(res) {
                          console.log(res),
                          the.setData({
                              arra: res.data
                          });
                          if(the.data.arrb==''){
                            the.setData({
                                arr: res.data
                            });
                          }
                      }
                    });
                    app.util.request({
                      url: "entry/wxapp/mylist",
                      data: {
                          user_id: wx.getStorageSync("users").id,
                          type:2
                      },
                      success: function(res) {
                          console.log(res),
                          the.setData({
                              arrb: res.data
                          });
                          let arra = the.data.arra,arrb = the.data.arrb,arrbs = arrb.map(function(o) {
                            o.type_id = 10;return o;
                          })
                          let arrs =[...arra,...arrbs];
                          the.setData({
                            arr:arrs
                          })
                          console.log(arrs);
                      }
                    });
                    app.util.request({
                      url: "entry/wxapp/mylist",
                      data: {
                          user_id: wx.getStorageSync("users").id,
                          type:3
                      },
                      success: function(res) {
                          console.log(res),
                          the.setData({
                              arrc: res.data
                          });
                          let arra = the.data.arra,arrb = the.data.arrb,arrc = the.data.arrc,arrbs = arrb.map(function(o) {
                            o.type_id = 10;return o;
                          });
                          let arrcs = arrc.map(function(o) {
                            o.type_id = 3;return o;
                          })
                          console.log(arrcs);
                          let arrss =[...arra,...arrcs,...arrbs];
                          
                          the.setData({
                            arr:arrss
                          })
                          console.log(arrss);
                      }
                    });
                    wx.showToast({
                      title: '删除成功',
                      icon: 'success',
                      duration: 2000
                    })
                  }else{
                    wx.showToast({
                      title: '删除失败',
                      icon: 'loading',
                      duration: 2000
                    })
                  }
              }
            });
          }else if(types==3){//闲置3，传3
            app.util.request({
              url: "entry/wxapp/DelList",
              data: {
                  type: 3,
                  id:index
              },
              success: function(res) {
                  console.log(res);
                  if(res.data==1){
                    // app.util.request({
                    //   url: "entry/wxapp/mylist",
                    //   data: {
                    //       user_id: wx.getStorageSync("users").id
                    //   },
                    //   success: function(res) {
                    //       console.log(res),
                    //       the.setData({
                    //           arr: res.data
                    //       });
                    //   }
                    // });

                    app.util.request({
                      url: "entry/wxapp/mylist",
                      data: {
                          user_id: wx.getStorageSync("users").id
                      },
                      success: function(res) {
                          console.log(res),
                          the.setData({
                              arra: res.data
                          });
                          if(the.data.arrb==''){
                            the.setData({
                                arr: res.data
                            });
                          }
                      }
                    });
                    app.util.request({
                      url: "entry/wxapp/mylist",
                      data: {
                          user_id: wx.getStorageSync("users").id,
                          type:2
                      },
                      success: function(res) {
                          console.log(res),
                          the.setData({
                              arrb: res.data
                          });
                          let arra = the.data.arra,arrb = the.data.arrb,arrbs = arrb.map(function(o) {
                            o.type_id = 10;return o;
                          })
                          let arrs =[...arra,...arrbs];
                          the.setData({
                            arr:arrs
                          })
                          console.log(arrs);
                      }
                    });
                    app.util.request({
                      url: "entry/wxapp/mylist",
                      data: {
                          user_id: wx.getStorageSync("users").id,
                          type:3
                      },
                      success: function(res) {
                          console.log(res),
                          the.setData({
                              arrc: res.data
                          });
                          let arra = the.data.arra,arrb = the.data.arrb,arrc = the.data.arrc,arrbs = arrb.map(function(o) {
                            o.type_id = 10;return o;
                          });
                          let arrcs = arrc.map(function(o) {
                            o.type_id = 3;return o;
                          })
                          console.log(arrcs);
                          let arrss =[...arra,...arrcs,...arrbs];
                          
                          the.setData({
                            arr:arrss
                          })
                          console.log(arrss);
                      }
                    });
                    wx.showToast({
                      title: '删除成功',
                      icon: 'success',
                      duration: 2000
                    })
                  }else{
                    wx.showToast({
                      title: '删除失败',
                      icon: 'loading',
                      duration: 2000
                    })
                  }
              }
            });
          }else{
            app.util.request({
              url: "entry/wxapp/DelList",
              data: {
                  type: 1,
                  id:index
              },
              success: function(res) {
                  console.log(res);
                  if(res.data==1){
                    // app.util.request({
                    //   url: "entry/wxapp/mylist",
                    //   data: {
                    //       user_id: wx.getStorageSync("users").id
                    //   },
                    //   success: function(res) {
                    //       console.log(res),
                    //       the.setData({
                    //           arr: res.data
                    //       });
                    //   }
                    // });

                    app.util.request({
                      url: "entry/wxapp/mylist",
                      data: {
                          user_id: wx.getStorageSync("users").id
                      },
                      success: function(res) {
                          console.log(res),
                          the.setData({
                              arra: res.data
                          });
                          if(the.data.arrb==''){
                            the.setData({
                                arr: res.data
                            });
                          }
                      }
                    });
                    app.util.request({
                      url: "entry/wxapp/mylist",
                      data: {
                          user_id: wx.getStorageSync("users").id,
                          type:2
                      },
                      success: function(res) {
                          console.log(res),
                          the.setData({
                              arrb: res.data
                          });
                          let arra = the.data.arra,arrb = the.data.arrb,arrbs = arrb.map(function(o) {
                            o.type_id = 10;return o;
                          })
                          let arrs =[...arra,...arrbs];
                          the.setData({
                            arr:arrs
                          })
                          console.log(arrs);
                      }
                    });
                    app.util.request({
                      url: "entry/wxapp/mylist",
                      data: {
                          user_id: wx.getStorageSync("users").id,
                          type:3
                      },
                      success: function(res) {
                          console.log(res),
                          the.setData({
                              arrc: res.data
                          });
                          let arra = the.data.arra,arrb = the.data.arrb,arrc = the.data.arrc,arrbs = arrb.map(function(o) {
                            o.type_id = 10;return o;
                          });
                          let arrcs = arrc.map(function(o) {
                            o.type_id = 3;return o;
                          })
                          console.log(arrcs);
                          let arrss =[...arra,...arrcs,...arrbs];
                          
                          the.setData({
                            arr:arrss
                          })
                          console.log(arrss);
                      }
                    });
                    wx.showToast({
                      title: '删除成功',
                      icon: 'success',
                      duration: 2000
                    })
                  }else{
                    wx.showToast({
                      title: '删除失败',
                      icon: 'loading',
                      duration: 2000
                    })
                  }
              }
            });
          }
				} else if (res.cancel) {
        console.log('用户点击取消')
        
				}
			}
		})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        urls: wx.getStorageSync("url")
    })
    // var index = event.currentTarget.dataset.index
    // var types = event.currentTarget.dataset.type_id;
    var the =this
    console.log("进入页面",options)
    
    app.util.request({
      url: "entry/wxapp/mylist",
      data: {
          user_id: wx.getStorageSync("users").id
      },
      success: function(res) {
          console.log(res),
          the.setData({
              arra: res.data
          });
          if(the.data.arrb==''){
            the.setData({
                arr: res.data
            });
          }
      }
    });
    app.util.request({
      url: "entry/wxapp/mylist",
      data: {
          user_id: wx.getStorageSync("users").id,
          type:2
      },
      success: function(res) {
          console.log(res),
          the.setData({
              arrb: res.data
          });
          let arra = the.data.arra,arrb = the.data.arrb,arrbs = arrb.map(function(o) {
            o.type_id = 10;return o;
          })
          let arrs =[...arra,...arrbs];
          the.setData({
            arr:arrs
          })
          console.log(arrs);
      }
    });
    app.util.request({
      url: "entry/wxapp/mylist",
      data: {
          user_id: wx.getStorageSync("users").id,
          type:3
      },
      success: function(res) {
          console.log(res),
          the.setData({
              arrc: res.data
          });
          let arra = the.data.arra,arrb = the.data.arrb,arrc = the.data.arrc,arrbs = arrb.map(function(o) {
            o.type_id = 10;return o;
          });
          let arrcs = arrc.map(function(o) {
            o.type_id = 3;return o;
          })
          console.log(arrcs);
          let arrss =[...arra,...arrcs,...arrbs];
          
          the.setData({
            arr:arrss
          })
          console.log(arrss);
      }
    });
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