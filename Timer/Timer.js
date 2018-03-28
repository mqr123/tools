/*
 * js秒表计时
 * author:maqianru
 * creactDate:2018/3/28
 */

class akumaTimer {
	constructor(options) {
		let defaultOptions = {
				element: "",
				cancelDom: "",
				startDom: "",
				againDom: "",
				num: 0, //需要格式化的时间戳
			},
			__Timer;
		this.options = Object.assign({}, defaultOptions, options);
		this.checkOption().timer().cancel().start().again();
	}
	//确保有显示时间的容器
	checkOption() {
		if(!this.options.element) {
			throw new Error("Element is required!!!")
		}
		return this
	}
	//定时器
	timer() {
		let countTime = this.options.num || 0, //累计的时间戳
			startTime = new Date().getTime(),
			nowTime,
			ms,
			sec,
			min,
			timeStr;
		this.__Timer = setInterval(() => {
			nowTime = new Date().getTime();
			this.options.num = countTime + nowTime - startTime;
			ms = Math.floor(this.options.num / 10 % 100); //毫秒
			sec = Math.floor((this.options.num / 1000) % 60); //秒
			min = Math.floor((this.options.num / 1000 / 60) % 60); //分
			timeStr = this.formatter(min) + ":" + this.formatter(sec) + ":" + this.formatter(ms);
			this.options.element.innerText = timeStr;
		}, 100)
		return this;
	}
	//暂停键
	cancel() {
		if(this.options.cancelDom) {
			this.options.cancelDom.onclick = () => {
				clearInterval(this.__Timer);
			}
		}
		return this;
	}
	//开始键
	start() {
		if(this.options.startDom) {
			this.options.startDom.onclick = () => {
				clearInterval(this.__Timer);
				this.timer()
			}
		}
		return this;
	}
	//重新开始键
	again() {
		if(this.options.againDom) {
			this.options.againDom.onclick = () => {
				clearInterval(this.__Timer);
				this.options.num = 0;
				this.timer()
			}
		}
		return this;
	}
	//格式化秒表数字
	formatter(t) {
		const res = t > 9 ? t : "0" + t;
		return res;
	}
}



/*=========================================            使用方法：            =========================================*/
/*
 *
 * new akumaTimer({
 *		element:"秒表文字显示容器",  //必填
 * 		cancelDom:"暂停按钮",        //选填
 *		startDom:"继续按钮",         //选填
 *		againDom:"重新开始按钮"      //选填
 *})
 */
 /*==================================================================================================================*/
