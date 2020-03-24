1.tab.js
页签切换插件；
所需参数：id:父级id(字符串'id')；title:id下title类名(字符串'title')，detaile:要展示的详情类名(字符串'detail')，acitve:激活class(字符串'active'),type:类型，选填默认为'click'(字符串'click','hover','autoPlay'),time:时间(Number型，默认为1000)
内置方法：
(1)init()初始化方法
(2)hide()全部隐藏方法
(3)show()展示方法
(4)hover()悬浮展示方法
(5)autoPlay()自动切换方法（伪轮播）
使用方式例：console.log(new tab('tab','tabtitle','detail','active'));
2.jsonTree.js
json结构转树形结构:
所需参数：_jsonData:json数据源（json数组）；_pid:父级id的key值(字符串)，_id:本身id值(字符串)，_children:子级列表key值（自定义默认为'children'可选项，字符串），_jsonStr:要转换的key值（json型数据）
_jsonData形式：var jsons = [
					{
						"parentChannelId":"",
						"level":"2",
						"channelName":"\u4E00\u7EA7\u680F\u76EE1",
						"channelId":"379b2622-34c6-450c-a3ce-f415d2db3bac"
					},
					{
						"parentChannelId":"379b2622-34c6-450c-a3ce-f415d2db3bac",
						"level":"3",
						"channelName":"\u4E8C\u7EA7\u680F\u76EE1",
						"channelId":"fe45381d-917a-4750-ba1f-35b27525fabc"
					}]
_jsonStr形式：var keyMap = {//将所有key名为channelName转换为name，channelId转换为id
				    "channelName" : "name",
					"channelId" : "id"
				};
内置方法：
(1)getTreeDate()获取jsonTree结构
(2)getJsonStr()key值转换方法
使用方式例：
var json=new treeData(jsons,'parentChannelId','channelId','children',keyMap).getTreeDate();
console.log(json);
3.currentDate
获取当前时间：
内置方法：
(1)init()给初始化时间所需参数赋值date,year,mouth,day,week,hours,minutes,seconds
(2)getCurrentDate()获取当前日期，返回值类型 yyyy年mm月dd日 week
(3)getCurrentTime()获取当前时间，返回值类型 hh:mm:ss
(4)getAllCurrentDate()获取当前日期时间，返回值类型 yyyy-mm-dd hh:mm:ss week
使用方式例：console.log(new currentDate().getAllCurrentDate());
4.formCheck
数据验证：
所需参数：{'a':' value'，'b':'  ',c:''}//key:要验证的参数名，value:要验证的参数值
内置方法：
(1)check()对数据进行非空校验，返回所有值为空的key名[]，返回类型数组
使用方式例：console.log(new formCheck(arr).check()+'不能为空');//console.log(['b','c']);
5.fontRoll
文字横向滚动
所需参数：_id:包裹id(字符串'id'),_class:文字class名(字符串'class'),_speed:滚动速度(Number型，默认为50)
内置方法：
(1)init()初始化方法，内含是否开启滚动校验，以及触发事件绑定
(2)isScoll()校验是否开启滚动
(3)marquee()定时器开启
(4)mouseover()鼠标移入关闭定时器
(5)mouseout()鼠标移出开启定时器
使用方式例：new fontRoll('txt-scroll','aaa',50);