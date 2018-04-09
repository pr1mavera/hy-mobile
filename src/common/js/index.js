export function formatDate(date, format) {
  if(format === undefined){
      format = date;
      date = new Date();
  }
  var map = {
      "M": date.getMonth() + 1, //月份
      "d": date.getDate(), //日
      "h": date.getHours(), //小时
      "m": date.getMinutes(), //分
      "s": date.getSeconds(), //秒
      "q": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
  };
  format = format.replace(/([yMdhmsqS])+/g, function(all, t){
      var v = map[t];
      if(v !== undefined){
          if(all.length > 1){
              v = '0' + v;
              v = v.substr(v.length-2);
          }
          return v;
      }
      else if(t === 'y'){
          return (date.getFullYear() + '').substr(4 - all.length);
      }
      return all;
  });
  return format;
};
export function MP() {
   //console.log("初始化百度地图脚本...");
   const AK = "2BC451XkZEB1oB2v61CuAEuSsXgiR7kA";
   const BMap_URL = "https://api.map.baidu.com/api?v=2.0&ak="+ AK +"&s=1&callback=onBMapCallback";
   return new Promise((resolve, reject) => {
     // 如果已加载直接返回
     if(typeof BMap !== "undefined") {
       resolve(BMap);
       return true;
     }
     // 百度地图异步加载回调处理
     window.onBMapCallback = function () {
       console.log("百度地图脚本初始化成功...");
       resolve(BMap);
     };
     // 插入script脚本
     let scriptNode = document.createElement("script");
     scriptNode.setAttribute("type", "text/javascript");
     scriptNode.setAttribute("src", BMap_URL);
     document.body.appendChild(scriptNode);
   });
};

