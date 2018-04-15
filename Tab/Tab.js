/*
 * tab切换
 * author:maqianru
 * creactDate:2018/4/12
 * updateDate:2018/4/15
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
		//获取当前事件对象的下标 __this指代当前事件对象
		for(var i = 0; i < this.options.navDoms.length; i++) {
			let __this = this.options.navDoms[i];
			__this.addEventListener(this.options.type, () => {
				this.classList(this.options.navDoms, __this, "open")
				let index;
				for(var k in this.options.navDoms) {
					if(this.options.navDoms[k] == __this) index = k;
				}
				this.classList(this.options.contentDoms, this.options.contentDoms[index], "open")
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