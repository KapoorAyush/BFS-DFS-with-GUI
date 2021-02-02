
class Queue 
{ 
	constructor() 
	{ 
		this.items = []; 
	} 

  enqueue(element) 
  {	 
    // adding element to the queue 
    this.items.push(element); 
  } 
  dequeue() 
  { 
    // removing element from the queue 
    // returns underflow when called 
    // on empty queue 
    if(this.isEmpty()) 
      return "Underflow"; 
    return this.items.shift(); 
  } 
  isEmpty() 
  { 
    // return true if the queue is empty. 
    return this.items.length == 0; 
  } 


} 

class Graph {
	constructor()
	{
		this.AdjList = new Map();
	}
  addVertex(v)
  {
    // initialize the adjacent list with a
    // null array
    this.AdjList.set(v, []);
  }

  addEdge(v, w)
  {
    this.AdjList.get(v).push(w);

    this.AdjList.get(w).push(v);
  }

  printGraph()
  {
    var get_keys = this.AdjList.keys();

    for (var i of get_keys) 
    {
      var get_values = this.AdjList.get(i);
      var conc = "";

      for (var j of get_values)
        conc += j + " ";

      console.log(i + " -> " + conc);
    }
  }  
  bfs(startingNode)
  {
      // create a visited object
      var visited = {};
  
      // Create an object for queue
      var q = new Queue();
  
      // add the starting node to the queue
      visited[startingNode] = true;
      q.enqueue(startingNode);
  
      // loop until queue is element
      while (!q.isEmpty()) {
          // get the element from the queue
          var getQueueElement = q.dequeue();
          bfsv.push(getQueueElement);
          bfsOrder=bfsOrder+getQueueElement.toString()+" -> ";
          
          // get the adjacent list for current vertex
          var get_List = this.AdjList.get(getQueueElement);
  
          // loop through the list and add the element to the
          // queue if it is not processed yet
          for (var i in get_List) {
              var neigh = get_List[i];
              if (!visited[neigh]) {
                  visited[neigh] = true;
                  q.enqueue(neigh);
              }
          }
      }
  }
  dfs(startingNode)
  {
  
      var visited = {};
  
      this.DFSUtil(startingNode, visited);
  }
 
// Recursive function which process and explore
// all the adjacent vertex of the vertex with which it is called
  DFSUtil(vert, visited)
  {
      visited[vert] = true;
      dfsv.push(vert);
      dfsOrder=dfsOrder+vert.toString()+" -> ";
         
      var get_neighbours = this.AdjList.get(vert);
  
      for (var i in get_neighbours) {
          var get_elem = get_neighbours[i];
          if (!visited[get_elem])
              this.DFSUtil(get_elem, visited);
      }
  }
}
var bfsOrder,dfsOrder;
var bfsv,dfsv;
var g = new Graph();
var fx,fy;
var i=1
var j=1
var array2D = [[]];
var line2D=[[]];
var current;

function setup() { 
  var cnv = createCanvas(900, 600);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height)-40 ;
  cnv.position(x, y);
  background(220);
  strokeWeight(0.5);
  textAlign(CENTER,CENTER);
  stroke(0,0,0);
}

function draw() {
  if (mouseX <= width && mouseX >= 0 && mouseY <= height && mouseY >= 0){
    if(mouseIsPressed){
      background(220);
      for(var c=1;c<j;c++){
        line(array2D[line2D[c][0]][0],array2D[line2D[c][0]][1],array2D[line2D[c][1]][0],array2D[line2D[c][1]][1])
      }
      for(var c=1;c<i;c++){
        fill(255);
        ellipse(array2D[c][0],array2D[c][1], 30, 30);
        fill(0);
        text(c,array2D[c][0],array2D[c][1]);  
      }

      line(fx, fy, mouseX, mouseY);
    }
  }

}

function mousePressed(){
if (mouseX <= width && mouseX >= 0 && mouseY <= height && mouseY >= 0){

    fx=mouseX;
    fy=mouseY;
    var flag=true;
    for(var c=1;c<i;c++){

        if(overCircle(array2D[c][0],array2D[c][1],fx,fy, 15)) {
          current=c;
          console.log(array2D)
          flag=false;
        }    
    }
    if(flag){
      fill(255);
      ellipse(mouseX,mouseY, 30, 30);
      fill(0);
      text(i,mouseX,mouseY);
      g.addVertex(i);
      array2D[i] = [];
      array2D[i][0] = mouseX;
      array2D[i][1] = mouseY;
      current=i;
      i=i+1;
    }
  }
}

function mouseReleased() {
  if (mouseX <= width && mouseX >= 0 && mouseY <= height && mouseY >= 0){
    background(220);
    for(var c=1;c<i;c++){
      if (overCircle(array2D[c][0],array2D[c][1],mouseX,mouseY, 15) && c!=current) {
        line2D[j] = [];
        line2D[j][0] =current;
        line2D[j][1]=c;
        g.addEdge(c, current);
        j++;
      }
    }
    for(var c=1;c<j;c++){
      line(array2D[line2D[c][0]][0],array2D[line2D[c][0]][1],array2D[line2D[c][1]][0],array2D[line2D[c][1]][1])
    }
    for(var c=1;c<i;c++){
        fill(255);
        ellipse(array2D[c][0],array2D[c][1], 30, 30);
        fill(0);
        text(c,array2D[c][0],array2D[c][1]);
    }

    g.printGraph();
  }

}

function overCircle(x1, y1,x2,y2 ,r) {
  if (dist(x1, y1, x2, y2) < r) {
    return true;
  } else {
    return false;
  }
}

function input(){
  bfsv=[];
  bfsOrder="";
  var root=parseInt(document.getElementById('rootN').value);
  g.bfs(root);
  bfsOrder="BFS Traversal Order : "+bfsOrder
  document.getElementById('output').innerHTML=bfsOrder;
  console.log(bfsv);
  console.log(bfsOrder);
  simulation(bfsv);
}

function input2(){
  dfsv=[]
  dfsOrder="";
  var root=parseInt(document.getElementById('rootN').value);
  g.dfs(root);
  dfsOrder="DFS Traversal Order : "+dfsOrder
  document.getElementById('output').innerHTML=dfsOrder;
  console.log(dfsOrder);
  simulation(dfsv);
}

function clearg(){
  background(220);
  array2D=[[]];
  line2D=[[]];
  i=1;
  j=1;
  document.getElementById('output').innerHTML="<h3>Draw Graph below</h3>";
}

async function simulation(fsv){
  for(var a=0;a<i-1;a++){
    background(220);
    for(var c=1;c<j;c++){
      line(array2D[line2D[c][0]][0],array2D[line2D[c][0]][1],array2D[line2D[c][1]][0],array2D[line2D[c][1]][1])
    }
    for(var c=1;c<i;c++){
        if(check(fsv,a,c))
        {
          fill(150,200,255);
          ellipse(array2D[c][0],array2D[c][1], 30, 30);
        }
        else
        {
          fill(255);
          ellipse(array2D[c][0],array2D[c][1], 30, 30);
        }
        fill(0)
        text(c,array2D[c][0],array2D[c][1]);
    
    }
    await sleep(1000);
  }
  await sleep(500);

  //redrawing for the final time (simulation ended)
  background(220);
  for(var c=1;c<j;c++){
    line(array2D[line2D[c][0]][0],array2D[line2D[c][0]][1],array2D[line2D[c][1]][0],array2D[line2D[c][1]][1])
  }
  for(var c=1;c<i;c++){
      fill(255);
      ellipse(array2D[c][0],array2D[c][1], 30, 30);
      fill(0)
      text(c,array2D[c][0],array2D[c][1]);
  }
}


function check(fsv,a,c){
  for(var b=0;b<=a;b++){
    if(fsv[b]==c)
      return true
  }
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


