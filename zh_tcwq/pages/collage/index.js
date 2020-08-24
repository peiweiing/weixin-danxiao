var app = getApp();

Page({
    data: {
        page: 1,
        group_list: []
    },
    onLoad: function(a) {
        app.pageOnLoad(this);
        this.setData({
            url: wx.getStorageSync("url")
        }), app.setNavigationBarColor(this);
    },
    refresh: function(a) {
        var i = this, t = wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/ad",
            cachetime: "0",
            data: {
                type: 13,
                cityname: t
            },
            success: function(a) {
                console.log("轮播图列表", a);
                var t = [];
                for (var e in a.data) 13 == a.data[e].type && t.push(a.data[e]);
                i.setData({
                    imgArray: t
                });
            }
        }), app.util.request({
            url: "entry/wxapp/GroupType",
            cachetime: "0",
            success: function(a) {
                if (console.log("分类列表", a), 5 < a.data.length) var t = 340; else t = 170;
                for (var e = [], n = 0, o = a.data.length; n < o; n += 10) e.push(a.data.slice(n, n + 10));
                i.setData({
                    nav_array: e,
                    height: t
                });
            }
        });
    },
    reload: function(a) {
        var t = this, e = t.data.page, n = t.data.group_list, o = wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/GroupGoods",
            cachetime: "0",
            data: {
                type_id: "",
                page: e,
                cityname: o
            },
            success: function(a) {
                console.log("商品列表", a), 0 < a.data.length && (n = n.concat(a.data), t.setData({
                    group_list: n,
                    page: e + 1
                }));
            }
        });
    },
    nav_child: function(a) {
        wx.navigateTo({
            url: "nav?id=" + a.currentTarget.dataset.id + "&store_id=&display=1"
        });
    },
    index: function(a) {
        wx.navigateTo({
            url: "info?id=" + a.currentTarget.dataset.id
        });
    },
    onReady: function() {},
    onShow: function() {
        this.refresh(), this.reload();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var a = this;
        a.refresh(), a.setData({
            group_list: [],
            page: 1
        }), a.reload(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.reload();
    }
});