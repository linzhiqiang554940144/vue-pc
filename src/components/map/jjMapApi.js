import IMAP from 'IMAP'

console.log(IMAP)

export default {
  init(id = 'jjMap', center = [120.20517, 30.2572]){
    window.map = new IMAP.Map(id, {
      minZoom: 3,
      maxZoom: 22,
      zoom: 12, //设置地图初始化级别
      center: new IMAP.LngLat(...center), //设置地图中心点坐标
      animation: true, //设置地图缩放动画效果
    });
  },

  //根据数据地图打点
  toggleIconMarkers(arr1, arr2) {
    if (window.map) {
      //图标红蓝色
      window.markers = [];
      for (let i = 0, len = arr1.length; i < len; i++) {
        let opts = new IMAP.MarkerOptions();
        opts.anchor = IMAP["Constants"]["BOTTOM_CENTER"];
        opts.icon = new IMAP.Icon(
          IMAP.MapConfig.API_REALM_NAME + "images/point_1.png", {
            size: {
              width: 34,
              height: 30
            },
            offset: {
              x: -34,
              y: 0
            }
          }
        );
        let lnglat = new IMAP.LngLat(arr1[i][0], arr1[i][1]);
        let marker = new IMAP.Marker(lnglat, opts);
        window.markers.push(marker);
      }
      for (let i = 0, len = arr2.length; i < len; i++) {
        let opts = new IMAP.MarkerOptions();
        opts.anchor = IMAP["Constants"]["BOTTOM_CENTER"];
        opts.icon = new IMAP.Icon(
          IMAP.MapConfig.API_REALM_NAME + "images/point_1.png", {
            size: {
              width: 34,
              height: 30
            },
            offset: {
              x: 1,
              y: -31
            }
          }
        );
        let lnglat = new IMAP.LngLat(arr2[i][0], arr2[i][1]);
        let marker = new IMAP.Marker(lnglat, opts);
        window.markers.push(marker);
      }
      window.map.getOverlayLayer().addOverlays(window.markers, true);
    }
  },

  //清空所有点图标
  toggleRemoveMarkers() {
    if (window.markers) {
      window.map.clearOverlays();
      window.markers = [];
    }
  },
}