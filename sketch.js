let populate;
let x = 0;
let v = 0.01;
let max_dens = 0.1


function preload() {
  // precharge les elements avant de charger la page
  let url =
    "https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-population-density.json";
  populate = loadJSON(url, "JSON", my_function);
}

function my_function() {
  console.log("all is good");
  // console.log(populate);
}

function setup() {
  noCanvas(); // remove the default canvas
  counter = Object.keys(populate).length;

  // recupere la densité maximum pour afficher une hauteur global de canvas
  for(let i = 0; i < counter; i++){
    if(max_dens < float(populate[i].density)){
      max_dens = float(populate[i].density);
      console.log(populate[i].density);
    }
  }
  //console.log(max_dens);

  for (let i = 0; i < counter; i += 1) {
    dens = populate[i].density; // à recuperer dans l'instance du canvas

    my_div = createElement("div");
    my_div.parent('container');
    my_div.id("div"+i);
    my_h2 = createElement("h2", populate[i].country);
    my_h2.parent('div'+i);

    
    my_p = createP("Density : " + populate[i].density);
    my_p.parent('div'+i);
    my_canvas = new p5(sketch,'div'+i); // le voilà


    //art = select("article");
  }
}

function draw() {
}

//namespacing
// et il est declaré ici...
var sketch = function (p) {
  p.setup = function () {
    p.dens = dens; // la densité propre a my_canvas...
    p.createCanvas(50, p.dens / 10 + 1); //hauteur du canvas selon la densité de population
    //p.createCanvas(60, max_dens/2);
  };

  p.draw = function () {
    p.background(220);
    p.stroke(120);  
    //p.createFirstFloor();
    p.line(x, 0, x, p.height);
    p.rect(0, p.height -1, p.width,  p.width - (p.dens/2) );
    
    //gestion des mouvement de la ligne animée
    x += v;
    if (x > my_canvas.width) {
      // attention, recuperer la largeur de mon canvas
      v = - 0.01;
    }
    if (x < 0) {
      v = 0.01;
    }
    p.line(x, p.height, x, 0);
  }
  // fonction pour créer des petites maisons suivant la densité de population du pays.
  p.createFirstFloor = function(){
    p.push() // push the matrix

    p.fill(20,20,200); // c'est une maison bleu...adossée à la colline...
    p.stroke(255,100,100);
    p.strokeWeight(2);
    // first floor
    p.rect(0, p.height - 40, 60, 40);
    // porte
    p.rect(22, p.height - 20 , 16, 20 );
    // fenetres
    p.rect(6, p.height - 30, 10, 10);
    p.rect(44, p.height - 30, 10, 10);

    p.pop()
  }
  p.createLastFloor = function (){
    p.push() 

    p.fill(20,20,200); // c'est une maison bleu...adossée à la colline...
    p.stroke(255,100,100);
    p.strokeWeight(2);
    // first floor
    p.rect(0, p.height - 40, 60, 40);
    // porte
    p.rect(22, p.height - 20 , 16, 20 );
    // fenetres
    p.rect(6, p.height - 30, 10, 10);
    p.rect(44, p.height - 30, 10, 10);

    p.pop()

  }
}


