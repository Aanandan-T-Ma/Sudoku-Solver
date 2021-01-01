for(var i=1;i<=9;i++)
  for(var j=3;j<=6;j+=3)
    document.getElementById("cell-"+i+j).parentElement.style.borderRight = "4px solid black"

for(var i=3;i<=6;i+=3)
  for(var j=1;j<=9;j++)
    document.getElementById("cell-"+i+j).parentElement.style.borderBottom = "4px solid black"

function checkInput(event){
    return (document.getElementById(event.target.id).value.length == 0 && event.code.length == 6 && 
            event.code.substr(0,5) == 'Digit' && Number(event.code[5]) != 0)
}

function clearAll(){
	for(var i=1;i<=9;i++)
	  for(var j=1;j<=9;j++)
		document.getElementById("cell-"+i+j).value = ""   
}

function check(table, i, j, num){
	var k,l,m,n
	for(k=0;k<9;k++)
	  if((k!=j && table[i][k]==num) || (k!=i && table[k][j]==num))
		return false
	k = 3*(Math.floor(i/3))
	l = 3*(Math.floor(j/3))
	for(m=k;m<k+3;m++)
	  for(n=l;n<l+3;n++)
		if((i!=m || j!=n) && table[m][n]==num)
		  return false
	return true
}

function solvable(table){
	for(var i=0;i<9;i++)
	  for(var j=0;j<9;j++)
		if(table[i][j] && !check(table, i, j, table[i][j]))
			return false
	return true;
}

function solve(table, x, y){
	if(x==9) 
		return true
	if(y==9)
		return solve(table,x+1,0)
	if(table[x][y])
		return solve(table,x,y+1)
	for(var i=1;i<=9;i++){
		if(check(table,x,y,i)){
			table[x][y] = i
			//document.getElementById("cell-"+(x+1)+(y+1)).value = i
			if(solve(table,x,y+1))
			  return true
			else table[x][y] = 0
		}
	}
	return false
}

function fill(table){
	var i,j
	for(i=0;i<9;i++){
		for(j=0;j<9;j++){
			document.getElementById("cell-"+(i+1)+(j+1)).value = table[i][j]
		}
	}
}

function solveSudoku(){
    var table = new Array()
    for(var i=1;i<=9;i++){
       var row = new Array()
       for(var j=1;j<=9;j++){
         value = document.getElementById("cell-"+i+j).value
         if(value)
           row.push(value)
         else
           row.push(0)  
       }
       table.push(row)   
	}
	if(solvable(table)){
		solve(table, 0, 0)
		fill(table)
	}
	else
	  alert("Unsolvable")
}