/*
 * 多文件上传最终封装程序
 * author:maqianru
 * creactDate:2018/4/2
 */

class Multi{
	constructor(elements,ajaxOptions){
		let defaultElements = {
			formDOM:"",
			uploadBtn:"",
			fileArea:"",
			fileShow:"",
			max:5,
		},
		ajaxParame={
			url:"",
			type:"POST",
			dataType:"json",
			success:()=>{},
			error:()=>{}
		}
		this.elements = Object.assign({},defaultElements,elements);
		this.ajaxOptions = Object.assign({},ajaxParame,ajaxOptions);
		this.progress = 0;    //上传进度
		this.fileData = [];   //上传的多文件数组
		this.formData = null; //需要上传到服务器的数据
		this.checkElements().change().upload();
	}
	//1.必传元素[主动]
	checkElements(ajaxOptions){
		if(!this.elements.formDom){
			throw new Error("formDom is a must element!!!")
		}
		if(!this.elements.uploadBtn){
			throw new Error("uploadBtn is a must element!!!")
		}
		if(!this.elements.fileArea){
			throw new Error("fileArea is a must element!!!")
		}
		if(!this.ajaxOptions.url){
			throw new Error("url is a must parame!!!")
		}
		return this;
	}
	//2.文件变动操作(onchange只有在文件发生改动的时候会调用)[主动]
	change(){
		this.elements.fileArea.onchange = ()=>{
			let _this = this.elements.fileArea;
			this.progress = {
				value: 0,
				count: _this.files.length
			};
			for(var i = 0; i < _this.files.length; i++) this.readerFile(_this.files, i);
		}
		return this;
	}
	//3.文件异步读取程序[被动]
	readerFile(files,index){
		let _this = this;
		let reader = new FileReader();
		let currFile = files[index];
		reader.readAsDataURL(currFile);
		reader.onload = function(e) {
			//this指当前异步读取的文件，_this指当前的类对象
			currFile.result = e.target.result;
			if(_this.checkFile(currFile,_this.elements.max)) {
				_this.fileData.push(currFile); //可做传输文件格式整理
				if(_this.elements.fileShow)_this.createDOM(currFile);
				_this.progress.value += 1;
				let num = _this.progress.value / _this.progress.count * 100;
				if(_this.progress.value >= _this.progress.count) {
					console.log(_this.fileData.length + '个文件已全部读取完成!');
				}
			}
		}
		reader.onerror = function() {
			console.log("文件上传失败!");
		}
	}
	//4.文件格式、大小、数量、重复等检测[被动]
	checkFile(currFile, max){
		let isLegal = true;
		if(['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].indexOf(currFile.type) == -1) {
			console.log('文件类型只允许：png、jpg、gif');
			alert('文件类型只允许：png、jpg、gif');
			isLegal = false;
			return;
		}
		if(currFile.size > 2048 * 1024) {
			console.log('文件大小超出限制，最大允许 2 MB');
			alert('文件大小超出限制，最大允许 2 MB');
			isLegal = false;
			return;
		}
		if(this.fileExists(currFile.name + currFile.lastModified)) {
			console.log(currFile.name + ",文件重复");
			alert(currFile.name + ",文件重复");
			isLegal = false;
			return;
		}
		if(this.fileData.length >= max) {
			console.log('文件数量超出，最多上传' + max + '张图片');
			alert('文件数量超出，最多上传' + max + '张图片');
			isLegal = false;
			return;
		}
		return isLegal;
	}
	//5.文件去重(通过文件名和文件修改时间判断)[被动]
	fileExists(checkFlag){
		let isRepeat = false;
		this.fileData.forEach((f)=>{
			if(f.name+f.lastModified === checkFlag)isRepeat = true;
		})
		return isRepeat;
	}
	//6.创建图片缩略图（缩略图点击删除）[可选被动]
	createDOM(currFile){
		let img = new Image();
		img.src = currFile.result;
		let li = document.createElement("li");
		li.appendChild(img);
		this.elements.fileShow.appendChild(li);
		li.key = currFile.name+currFile.lastModified; //当前缩略图唯一的标识
		li.addEventListener("click",()=>{
			this.elements.fileShow.removeChild(li);
			this.fileData.forEach((f,i)=>{
				if(f.name+f.lastModified == li.key)this.fileData.splice(i,1);
			})
		})
	}
	//7.上传操作[主动]
	upload(){
		this.elements.uploadBtn.addEventListener("click",()=>{
			if(this.fileData<=0){
				alert("请至少选择一张图片！！！");
				return;
			}
			let formData = new FormData(this.elements.formDOM);
			formData.set("files",JSON.stringify(this.fileData));
			this.ajax({
				url:this.ajaxOptions.url,
				type:"POST",
				data:formData,
				success:this.ajaxOptions.success,
				error:this.ajaxOptions.error
			})
		})
	}
	//8.ajax[被动]
	ajax(options){
		let xhr;
		if(window.XMLHttpRequest){
			xhr = new XMLHttpRequest();
		}else{
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					options.success();
				}else{
					options.error();
				}
			}
		}
		xhr.open(options.type,options.url,true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
		xhr.send(options.data);
	}
}




/*======================================            所用技术：            ====================================
 * 使用formDate对象：更灵活操作需要发送的表单文件
 * 使用FileReader对象:允许web应用程序异步操作本地文件
 * FileReader.readAsDataURL()将读取的文件转换为base64编码的字符串
 * FileReader.onload()文件读取时触发该方法
 * FileReader.onerror()文件读取错误时触发该方法
 * ======================================================================================================
 */



/*======================================            使用方法：            ====================================
 * new Multi({
 * 	formDom:"",     //表单容器，必填
 * 	uploadBth:"",	//上传按钮，必填
 * 	fileArea:"",	//多文件文本域，必填
 * 	fileShow:"",     //已上传文件缩略图显示容器，选填
 *  max:5            //最大文件数量   
 * },{
 * 	url:"xxxx",
 * 	success:function(){},
 * 	error:function(){}
 * })
 * 
 *======================================================================================================
 */



/*======================================            参数说明：            ====================================
 * 上传文件组件所需参数：
 * 		1.上传按钮
 * 		2.表单容器
 * 		3.图片列表显示容器
 * 		4.多文件文本域
 * 		5.进度条就算了暂时不开发
 * 		6.图片上传接口
 * ======================================================================================================
 */
