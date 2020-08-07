<template>
	<div class="migrate">
		<m-header mTitle="迁徙图"></m-header>
		<div id="map"></div>
	</div>
</template>

<script>
	import mHeader from '@/components/common/m-header';
	export default {
		components: {
			mHeader
		},
		data() {
			return {
				
			}
		},
		mounted() {
			let AMap = window.AMap
			var map = new AMap.Map("map", {
		        resizeEnable: true,
		        center: [116.397428, 39.90923],
		        zoom: 6
		    });
		
//		    var object3Dlayer = new AMap.Object3DLayer({ zIndex: 10 });
			var startPoint = [[116.407394,39.904211]]; // 起点
			var viaPoint1 = [[117.200983,39.084158],[114.530235,38.037433]]; // 控制点，途经点
			var endPoint = [[112.562678,37.873499]]; // 控制点，终点
			var path = [
				startPoint,
				viaPoint1,
				endPoint
			];
//		    map.add(object3Dlayer);
			var lineArr = [[116.407394,39.904211],[117.200983,39.084158],[114.530235,38.037433],[112.562678,37.873499]];
			var bezierCurve = new AMap.BezierCurve({
				path: path,
				strokeWeight: 2, // 线条宽度
				strokeColor: 'red', // 线条颜色
				isOutline: true,	// 是否描边
				outlineColor: 'red', // 描边颜色
				borderWeight: 0 // 描边宽度
			});
			map.add(bezierCurve);
//			var polyline = new AMap.Polyline({
//		        map: map,
//		        path: lineArr,
//		        showDir:true,
//		        strokeColor: "#ea1111",  //线颜色
//		        // strokeOpacity: 1,     //线透明度
//		        strokeWeight: 2,      //线宽
//		        // strokeStyle: "solid"  //线样式
//		   });
		}
	}
</script>

<style lang="less" scoped>
	#map{
		height: 50vh;
	}
</style>