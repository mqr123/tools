/*
 * tab切换
 * author:maqianru
 * creactDate:2018/4/12
 */



class Tab {
	constructor(options) {
		let defaultOptions = {
			type: "hover",
			navDoms: null,
			contentDoms: null
		}
		this.options = Object.assign({}, defaultOptions, options);
		this.checkOptions().change();
	}
	checkOptions() {
		if(!this.options.navDoms) {
			throw new Error("navDoms is required");
		}
		if(!this.options.contentDoms) {
			throw new Error("contentDoms is required");
		}
		return this
	}
	change() {
		//因获取的是HTMLcollection集合,无法根据元素获取下标，so使用重新格式化数组的形式定义
		let navArr = [],
			contentArr = [];
		for(var i = 0; i < this.options.navDoms.length; i++) {
			navArr.push({
				key: i,
				value: this.options.navDoms[i]
			})
		}
		for(var i = 0; i < this.options.contentDoms.length; i++) {
			contentArr.push({
				key: i,
				value: this.options.contentDoms[i]
			})
		}
		//获取当前事件对象的下标
		for(var i = 0; i < this.options.navDoms.length; i++) {
			let __this = this.options.navDoms[i];
			__this.addEventListener(this.options.type, () => {
				this.classList(this.options.navDoms, __this, "open")
				let index = navArr.filter((k, index) => {
					return navArr[index].value == __this ? true : false;
				})[0].key;
				this.classList(this.options.contentDoms, contentArr[index].value, "open")
			})
		}
	}
	classList(arr, target, name) {
		for(var i = 0; i < arr.length; i++) {
			if(arr[i].classList.contains(name)) {
				arr[i].classList.remove(name)
			}
		}
		target.classList.add(name)
	}

}

//问题：HTMLCollection集合获取对象下标
//解决办法：重新定义数组替代集合对象，暂时没找到更好的办法



/*=========================================            使用方法：            =========================================*/
/*
 *
 * new Tab({
 * 	type:"click",    			//切换方式
 * 	navDoms:navDoms,  			//导航列表
 * 	contentDoms:contentDoms		//切换区域列表
 * })
 */
 /*==================================================================================================================*/