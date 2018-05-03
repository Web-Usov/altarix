document.getElementById('CalcForm').onsubmit = function (e) {
    e.preventDefault();
    var a = Number(document.getElementById('Calc_a').value);
    var b = document.getElementById('Calc_b').value;
    var c = Number(document.getElementById('Calc_c').value);
    try{
        document.getElementById('Calc_out').value = Calc(a,b,c)
    }catch (e){
        log(e.message);
        alert(e.message);
    }
};

document.getElementById('SearchForm').onsubmit = function (e) {
    e.preventDefault();
    var array =[];
    var area = document.getElementById('Search_area');
    var value = area.value;
    var str = "";
    for(var i = 0; i < value.length;i++){
        if(value[i]==="\n"){
            if(str!==""){
                array.push(str);
                str = "";
            }
        }else{
            str+=value[i]
        }
    }
    if(str!=="") array.push(str);
    if (array!==null){
        document.getElementById('Search_out').value = StrInArray(
            array,
            document.getElementById('Search_in').value);
    }
};

document.getElementById('ConvertForm').onsubmit = function (e) {
    e.preventDefault();
    document.getElementById('Convert_out').value = ConvertNum(document.getElementById('Convert_in').value);
};

document.getElementById('CalendarForm').onsubmit = function (e) {
    e.preventDefault();

    var date = new Date(document.getElementById('Calendar_date').value);
    var countN = 5;
    date.setDate(30);
    if(date.getDay()===1 || date.getDay()===2){
        countN = 6;
    }

    var tb = "<thead>" +
                "<tr>" +
                    "<td>Пн</td>" +
                    "<td>Вт</td>" +
                    "<td>Ср</td>" +
                    "<td>Чт</td>" +
                    "<td>Пт</td>" +
                    "<td>Сб</td>" +
                    "<td>Вс</td>" +
                "</tr>" +
            "</thead>";
    for(var i = 1; i <=countN;i++){
        tb += "<tr>";
        for(var j = 1; j<=7; j++){
            tb+="<td id='"+"c_"+i+j+"'></td>";
        }
        tb += "</tr>";
    }
    var table = document.getElementById('Calendar_table');
    table.innerHTML = tb;

    var w = 1;
    var d = 1;
    var m = date.getMonth();

    for(i = 1; i<=31; i++){
        date.setDate(i);
        var dayW = date.getDay();
        switch (dayW){
            case 1:
                d = 1;
                break;
            case 2:
                d = 2;
                break;
            case 3:
                d = 3;
                break;
            case 4:
                d = 4;
                break;
            case 5:
                d = 5;
                break;
            case 6:
                d = 6;
                break;
            case 0:
                d = 7;
                break;
        }
        document.getElementById('c_'+w+d).innerHTML = i;
        if(d===7){
            w++;
            d=1;
        }
        if(date.getMonth()!==m){
            document.getElementById('c_'+w+d).innerHTML = " ";
        }
    }
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