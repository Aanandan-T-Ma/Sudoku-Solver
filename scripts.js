for(var i=1;i<=9;i++)
  for(var j=3;j<=6;j+=3)
    document.getElementById("cell-"+i+j).parentElement.style.borderRight = "4px solid black"

for(var i=3;i<=6;i+=3)
  for(var j=1;j<=9;j++)
	document.getElementById("cell-"+i+j).parentElement.style.borderBottom = "4px solid black"
	
for(var i=1;i<=9;i++)
  for(var j=1;j<=9;j++)
	document.getElementById("cell-"+i+j).setAttribute('onkeypress','return checkInput(event)')

function checkInput(event){
    return (document.getElementById(event.target.id).value.length == 0 && event.code.length == 6 && 
            event.code.substr(0,5) == 'Digit' && Number(event.code[5]) != 0)
}

function clearAll(){
	for(var i=1;i<=9;i++){
		for(var j=1;j<=9;j++){
			var k = document.getElementById("cell-"+i+j)
			k.value = ""
			k.classList.remove('solution')
		}
	}
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
			if(solve(table,x,y+1))
			  return true
			else table[x][y] = 0
		}
	}
	return false
}

function fill(table, question){
	var i, j, k, delay = 0
	for(i=0;i<9;i++){
		for(j=0;j<9;j++){
			if(question[i][j]) continue
			k = document.getElementById("cell-"+(i+1)+(j+1))
			k.classList.add('solution')
			k.style.animationDelay = delay + 's'
			k.value = table[i][j]
			delay += .1
		}
	}
}

function solveSudoku(){
	var table = new Array()
	var question = new Array()
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
	   question.push(row.slice()) 
	}
	if(solvable(table)){
		solve(table, 0, 0)
		fill(table, question)
	}
	else
		showAlert()
}

function showAlert(){
	if(screen.width < 1195)
		document.getElementById('text').innerHTML = "It's <br> Unsolvable"
	document.getElementById('unsolvable').classList.add('font-enlarge')
	document.getElementById('unsolvable').style.display = 'block'
}

function closeAlert(){
	document.getElementById('unsolvable').classList.remove('font-enlarge')
	document.getElementById('unsolvable').style.display = 'none'
}