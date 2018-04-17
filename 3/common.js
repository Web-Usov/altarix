try{
    log(Calc(3,"+",2));
    log(Calc(3,"-",2));
    log(Calc(3,"*",2));
    log(Calc(3,"/",2));
    strArray = ["Kit", "Nick", "Bob", "Alex"];
    log(strArray);
    str = "Ivan";
    log(str+" in array: "+StrInArray(strArray,str));
    str = "bob";
    log(str+" in array: "+StrInArray(strArray,str));

    log(ConvertNum(-13252523.46436));
}catch(e) {
	log(e.message)
}

function Calc(a, op, b) {
	switch(op){
		case "+":
			return a+b;
		case "-":
            return a-b;
		case "*":
            return a*b;
		case "/":
            return a/b;
		default:
            throw new Error("Undefined command: "+op);
	}
}

function StrInArray(arr, str) {
    for (var i = 0;i < arr.length; i++)
		if (arr[i].toLowerCase() === str.toLowerCase())
			return true;
	return false
}

function ConvertNum(num) {
	snum = ""+Math.abs(num);
	var z = 0;
    for(var i = 0; i< snum.length;i++){
        if(snum[i]==="."){
            z = i;
            break;
        }
    }
    var nnum = "";
    if(z>0){
    	var k = 0;
        for(i = (z-1);i>=0;i--){
        	k++;
        	if(k===4){
                nnum=" "+nnum;
                k = 0;
			}
            nnum=snum[i]+nnum;
        }
        var zend = 0;
        if(snum.length-z > 2){
            nnum+=",";
            zend = z+2;
		}
        else if(snum.length-z === 2){
            nnum+=",";
            zend = z+1;
        }

        for(i = (z+1);i< zend+1;i++){
            nnum+=snum[i];
        }
	}else{
        var k = 0;
        for(i = snum.length-1;i>=0;i--){
            k++;
            if(k===4){
                nnum=" "+nnum;
                k = 0;
            }
            nnum=snum[i]+nnum;
        }
	}
	if(num<0)
		nnum="-"+nnum;
	return nnum;
}
function log(str) {
	console.log(str)
}