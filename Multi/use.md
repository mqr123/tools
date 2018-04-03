#多图片上传插件
### 所用技术：
- 使用formDate对象：更灵活操作需要发送的表单文件
- 使用FileReader对象:允许web应用程序异步操作本地文件
- FileReader.readAsDataURL()将读取的文件转换为base64编码的字符串
- FileReader.onload()文件读取时触发该方法
- FileReader.onerror()文件读取错误时触发该方法
***
### 使用方法：
```js
new Multi({
	formDom:"",     //表单容器，必填
	uploadBth:"",	//上传按钮，必填
	fileArea:"",	//多文件文本域，必填
	fileShow:"",     //已上传文件缩略图显示容器，选填
	max:5            //最大文件数量   
},{
	url:"xxxx",
	success:function(){},
	error:function(){}
})
```
***
### 参数说明：
**上传文件组件所需参数：
	1. 上传按钮
	2. 表单容器
	3. 图片列表显示容器
	4. 多文件文本域
	5. 进度条就算了暂时不开发
	6. 图片上传接口
