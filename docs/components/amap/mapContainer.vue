<template>
  <div class="map-container">
    <div id="container"></div>
    <div class="more-area"></div>
  </div>
</template>
<script setup>
import AMapLoader from '@amap/amap-jsapi-loader';
import { onMounted } from 'vue'
import { shallowRef } from '@vue/reactivity'

const onComplete = (data) => {
  // data是具体的定位信息
  console.log(data, '数据获取成功')
}
const onError = (data) => {
  // 定位出错
  console.log(data, '数据获取失败')
  throw "地图加载失败，请重新加载"
}
const positionOptions = {
  showButton: true,
  // 是否使用高精度定位，默认：true
  enableHighAccuracy: true,
  // 设置定位超时时间，默认：无穷大
  timeout: 10000,
  // 定位按钮的停靠位置的偏移量
  offset: [20, 20],
  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
  zoomToAccuracy: true,
  //  定位按钮的排放位置,  RB表示右下
  position: 'RB',
  // 定位成功后用圆圈表示定位精度范围，默认：true
  showCircle: true,
}
let map = shallowRef(null);

const initMap = () => {
  AMapLoader.load({
    key:"3003cca968b1aed5bf0002b2fdc3e774",             // 申请好的Web端开发者Key，首次调用 load 时必填
    version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins:['AMap.Geolocation'],       // 需要使用的的插件列表，如比例尺'AMap.Scale', 'AMap.Geolocation'等
  }).then((AMap)=>{
    //设置地图容器id
    map = new AMap.Map("container", {
      viewMode: "3D",    //是否为3D地图模式
      zoom: 10,           //初始化地图级别
      // center:[105.602725,37.076636], // 初始化地图中心点位置, 不填默认是当前城市
    });
    AMap.plugin('AMap.Geolocation', function() {
      const geolocation = new AMap.Geolocation(positionOptions)
      map.addControl(geolocation)
      geolocation.getCurrentPosition(function(status,result) {
        if(status === 'complete'){
          onComplete(result)
        }else{
          onError(result)
        }
      });
    })
  }).catch(e=>{
    onError(e)
  })
}

onMounted(() => {
  initMap()
})
</script>
<style lang="scss" scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 200px;
  margin: 10px 0;

  #container {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    .amap-copyright {
      bottom: 7.1px;
    }
  }
}
</style>