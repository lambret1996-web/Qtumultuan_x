 /***
  [task_local]
  event-interaction https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/geo_location.js, tag=GeoIP 查询, img-url=location.fill.viewfinder.system
  
  @XIAO_KOP

  **/
// 城市英译中对照表（可直接整体替换原 cityCnMap）
/*const cityCnMap = new Map([
// —— 美国 ——
["Santa Clara","圣克拉拉"],["San Jose","圣何塞"],["Fremont","弗里蒙特"],
["San Francisco","旧金山"],["Los Angeles","洛杉矶"],["Palo Alto","帕洛阿尔托"],
["San Diego","圣迭戈"],["Sacramento","萨克拉门托"],
["New York","纽约"],["Chicago","芝加哥"],["Seattle","西雅图"],["Dallas","达拉斯"],
["Miami","迈阿密"],["Phoenix","凤凰城"],["Atlanta","亚特兰大"],["Denver","丹佛"],
["Portland","波特兰"],["Houston","休斯顿"],["Boston","波士顿"],["Ashburn","阿什本"],
["Las Vegas","拉斯维加斯"],["Tampa","坦帕"],["Kansas City","堪萨斯城"],
["Minneapolis","明尼阿波利斯"],["Salt Lake City","盐湖城"],["Philadelphia","费城"],
["Charlotte","夏洛特"],["Columbus","哥伦布"],["Detroit","底特律"],["Nashville","纳什维尔"],
["Orlando","奥兰多"],["Newark","纽瓦克"],["St. Louis","圣路易斯"],["Oklahoma City","俄克拉何马城"],
// —— 亚洲 ——
["Tokyo","东京"],["Osaka","大阪"],["Fukuoka","福冈"],["Nagoya","名古屋"],
["Hong Kong","香港"],["Singapore","新加坡"],["Seoul","首尔"],["Taipei","台北"],
["Bangkok","曼谷"],["Kuala Lumpur","吉隆坡"],["Jakarta","雅加达"],
["Mumbai","孟买"],["Bangalore","班加罗尔"],["Delhi","德里"],["Chennai","金奈"],
["Hanoi","河内"],["Ho Chi Minh City","胡志明市"],["Manila","马尼拉"],
["Islamabad","伊斯兰堡"],["Lahore","拉合尔"],["Dhaka","达卡"],["Colombo","科伦坡"],
["Karachi","卡拉奇"],["Riyadh","利雅得"],["Dubai","迪拜"],["Tel Aviv","特拉维夫"],
["Istanbul","伊斯坦布尔"],["Almaty","阿拉木图"],["Tashkent","塔什干"],
// —— 欧洲 ——
["London","伦敦"],["Manchester","曼彻斯特"],["Frankfurt","法兰克福"],
["Amsterdam","阿姆斯特丹"],["Paris","巴黎"],["Madrid","马德里"],["Barcelona","巴塞罗那"],
["Stockholm","斯德哥尔摩"],["Zurich","苏黎世"],["Warsaw","华沙"],["Milan","米兰"],
["Vienna","维也纳"],["Bucharest","布加勒斯特"],["Lisbon","里斯本"],
["Munich","慕尼黑"],["Berlin","柏林"],["Prague","布拉格"],["Brussels","布鲁塞尔"],
["Copenhagen","哥本哈根"],["Oslo","奥斯陆"],["Helsinki","赫尔辛基"],
["Dublin","都柏林"],["Athens","雅典"],["Budapest","布达佩斯"],["Riga","里加"],
["Tallinn","塔林"],["Vilnius","维尔纽斯"],["Sofia","索菲亚"],["Zagreb","萨格勒布"],
// —— 大洋洲 ——
["Sydney","悉尼"],["Melbourne","墨尔本"],["Brisbane","布里斯班"],["Perth","珀斯"],
["Auckland","奥克兰"],["Wellington","惠灵顿"],
// —— 加拿大 ——
["Toronto","多伦多"],["Vancouver","温哥华"],["Montreal","蒙特利尔"],
["Calgary","卡尔加里"],["Ottawa","渥太华"],["Quebec City","魁北克城"],
// —— 拉美 ——
["Sao Paulo","圣保罗"],["Rio de Janeiro","里约热内卢"],["Buenos Aires","布宜诺斯艾利斯"],
["Mexico City","墨西哥城"],["Santiago","圣地亚哥"],["Lima","利马"],["Bogota","波哥大"],
["Montevideo","蒙得维的亚"],["Caracas","加拉加斯"],["Panama City","巴拿马城"],
// —— 其他 ——
["Moscow","莫斯科"],["Kyiv","基辅"],["Johannesburg","约翰内斯堡"],
["Cape Town","开普敦"],["Cairo","开罗"],["Lagos","拉各斯"],["Nairobi","内罗毕"],
["Istanbul","伊斯坦布尔"],["Tbilisi","第比利斯"],["Yerevan","埃里温"]
]);
// 城市翻译：先统一格式再查表，不存在就原样输出英文
let cityKey = bodyJson.city ? bodyJson.city.replace(/\b\w/g, c => c.toUpperCase()) : "";
if(cityCnMap.has(cityKey)){
    bodyJson.city = cityCnMap.get(cityKey);
}*/

// var content= `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold">` + response.body + `</p>`;

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
