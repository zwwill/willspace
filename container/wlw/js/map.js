// JavaScript Document
var map;
$(document).ready(function(){
	map=new BMap.Map("allmap");
    show_map_local();
});
function getmapbycity(cityName){
	// 百度地图API功能
	var point = new BMap.Point(116.331398,39.897445);
	map.centerAndZoom(point,12);

	function myFun(result){
		var cityName = result.name;
		map.setCenter(cityName);
	}
	var myCity = new BMap.LocalCity();
	myCity.get(myFun);
}


function show_map(){
	
	// 百度地图API功能           
	map.centerAndZoom("中国",5);
	map.setDefaultCursor("crosshair");
	map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
	map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用   
        map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT}));  //左下角，添加比例尺      
        map.addControl(new BMap.NavigationControl());//左上角，添加默认缩放平移控件     
	//单击获取点击的经纬度
	var marker;
	var gc = new BMap.Geocoder();   
	
	
	map.addEventListener("click",function(e){
		var pt = e.point;
		map.removeOverlay(marker);
		marker = new BMap.Marker(pt); // 创建点
		map.addOverlay(marker);  
                       
		//alert(e.point.lng + "," + e.point.lat);
		gc.getLocation(pt, function(rs){
			var addComp = rs.addressComponents;
			alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street );
		});      
	});
}

function show_map_local(){
	
	// 百度地图API功能           
	
	////////
    var point = new BMap.Point(116.331398,39.897445);
	map.centerAndZoom(point,12);
	//
	map.setDefaultCursor("crosshair");
	map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
	map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用   
        map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT}));  //左下角，添加比例尺      
        map.addControl(new BMap.NavigationControl());//左上角，添加默认缩放平移控件     
	//单击获取点击的经纬度
	function myFun(result){
		var cityName = result.name;
		map.setCenter(cityName);
	}
	var marker;
	var gc = new BMap.Geocoder();   
	
	//
	var myCity = new BMap.LocalCity();
	myCity.get(myFun);    
	
	map.addEventListener("click",function(e){
		var pt = e.point;
		map.removeOverlay(marker);
		marker = new BMap.Marker(pt); // 创建点
		map.addOverlay(marker);  
                       
		//alert(e.point.lng + "," + e.point.lat);
		gc.getLocation(pt, function(rs){
			var addComp = rs.addressComponents;
			alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street);
		});      
	});
}