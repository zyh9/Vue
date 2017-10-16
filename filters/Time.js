export const Time=(time)=>{
	if(time){
		let oDate=new Date();
		oDate.setTime(time);

		let y=oDate.getFullYear();
		let m=oDate.getMonth()+1;
		let d=oDate.getDate();

		let hh=oDate.getHours();
		let mm=oDate.getMinutes();
		let ss=oDate.getSeconds();

		return y+'-'+two(m)+'-'+two(d)+' '+two(hh)+':'+two(mm)+':'+two(ss);
		
		function two(n){
			return n<10?'0'+n:''+n;
		}
	}
}
