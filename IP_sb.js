 /***
  [task_local]
  event-interaction https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/geo_location.js, tag=GeoIP 查询, img-url=location.fill.viewfinder.system
  
  @XIAO_KOP

  **/


  var url = "https://api.ip.sb/geoip"
  var opts = {
      policy: $environment.params
  };
  var myRequest = {
      url: url,
      opts: opts,
      timeout: 4000
  };
 
  var message = ""
  const paras = ["ip","isp","country_code","city","offset"]
  const paran = ["IP地址","ISP提供商","地区","城市","时区"]
  $task.fetch(myRequest).then(response => {
    message = response? json2info(response.body,paras) : ""
      $done({"title": "    🔎 你的节点查询结果", "htmlMessage": message});
  }, reason => {
    message = "</br></br>🛑 查询超时稍后再试"
    message = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;">` + message + `</p>`
      $done({"title": "🔎 该节点查询结果", "htmlMessage": message});
  })


function json2info(cnt,paras) {
  var res = "------------------------------"
  cnt =JSON.parse(cnt)
  for (i=0;i<paras.length;i++) {
    cnt[paras[i]] = paras[i] == "country_code"? cnt[paras[i]]+" ⟦"+flags.get(cnt[paras[i]].toUpperCase())+"⟧":cnt[paras[i]]
    res = cnt[paras[i]]?   res +"</br><b>"+ "<font  color=>" +paran[i] + "</font> : " + "</b>"+ "<font  color=>"+cnt[paras[i]] +"</font></br>" : res
  }
  res =res+ "------------------------------"+"</br>"+"<font color=#6959CD>"+"<b>节点</b> ➟ " + $environment.params+ "</font>"
  res =  `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin">` + res + `</p>`
  return res
}

var flags = new Map([
["AC","阿森松岛"],
["AE","阿联酋"],
["AF","阿富汗"],
["AI","安圭拉"],
["AL","阿尔巴尼亚"],
["AM","亚美尼亚"],
["AQ","南极洲"],
["AR","阿根廷"],
["AS","美属萨摩亚"],
["AT","奥地利"],
["AU","澳大利亚"],
["AW","阿鲁巴"],
["AX","奥兰群岛"],
["AZ","阿塞拜疆"],
["BA","波黑"],
["BB","巴巴多斯"],
["BD","孟加拉国"],
["BE","比利时"],
["BF","布基纳法索"],
["BG","保加利亚"],
["BH","巴林"],
["BI","布隆迪"],
["BJ","贝宁"],
["BM","百慕大"],
["BN","文莱"],
["BO","玻利维亚"],
["BR","巴西"],
["BS","巴哈马"],
["BT","不丹"],
["BV","布韦岛"],
["BW","博茨瓦纳"],
["BY","白俄罗斯"],
["BZ","伯利兹"],
["CA","加拿大"],
["CF","中非"],
["CH","瑞士"],
["CK","库克群岛"],
["CL","智利"],
["CM","喀麦隆"],
["CN","中国"],
["CO","哥伦比亚"],
["CP","克利珀顿岛"],
["CR","哥斯达黎加"],
["CU","古巴"],
["CV","佛得角"],
["CW","库拉索"],
["CX","圣诞岛"],
["CY","塞浦路斯"],
["CZ","捷克"],
["DE","德国"],
["DG","迪戈加西亚岛"],
["DJ","吉布提"],
["DK","丹麦"],
["DM","多米尼克"],
["DO","多米尼加"],
["DZ","阿尔及利亚"],
["EA","休达梅利利亚"],
["EC","厄瓜多尔"],
["EE","爱沙尼亚"],
["EG","埃及"],
["EH","西撒哈拉"],
["ER","厄立特里亚"],
["ES","西班牙"],
["ET","埃塞俄比亚"],
["EU","欧盟"],
["FI","芬兰"],
["FJ","斐济"],
["FK","福克兰群岛"],
["FM","密克罗尼西亚"],
["FO","法罗群岛"],
["FR","法国"],
["GA","加蓬"],
["GB","英国"],
["HK","中国香港"],
["HU","匈牙利"],
["ID","印度尼西亚"],
["IE","爱尔兰"],
["IL","以色列"],
["IM","马恩岛"],
["IN","印度"],
["IS","冰岛"],
["IT","意大利"],
["JP","日本"],
["KR","韩国"],
["LU","卢森堡"],
["MO","中国澳门"],
["MX","墨西哥"],
["MY","马来西亚"],
["NL","荷兰"],
["PH","菲律宾"],
["RO","罗马尼亚"],
["RS","塞尔维亚"],
["RU","俄罗斯"],
["RW","卢旺达"],
["SA","沙特阿拉伯"],
["SB","所罗门群岛"],
["SC","塞舌尔"],
["SD","苏丹"],
["SE","瑞典"],
["SG","新加坡"],
["TH","泰国"],
["TN","突尼斯"],
["TO","汤加"],
["TR","土耳其"],
["TV","图瓦卢"],
["TW","中国台湾"],
["UK","英国"],
["UM","美国本土外小岛屿"],
["US","美国"],
["UY","乌拉圭"],
["UZ","乌兹别克斯坦"],
["VA","梵蒂冈"],
["VE","委内瑞拉"],
["VG","英属维尔京群岛"],
["VI","美属维尔京群岛"],
["VN","越南"],
["ZA","南非"]
 
]);
