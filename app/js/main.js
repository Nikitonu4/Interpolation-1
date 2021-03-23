// "use struct;"
let button = document.querySelector(".button");

let w = document.getElementById('myChart').width;
let h = document.getElementById('myChart').height;

let matr;

let ctx = newChart();

function newChart(minY, maxY){
    return new Chart (document.getElementById('myChart').getContext('2d'), {
        type: 'line',
        data: {
         labels: [], //Подписи оси x
         datasets: [{
           label: 'f(x)', //Метка
           data: [], //Данные
           borderColor: "#000", //Цвет
           borderWidth: 1, //Толщина линии
           fill: false, //Не заполнять под графиком
           pointRadius: 0,
          },
          {
            label: 'Pn(x)', //Метка
           data: [], //Данные
           borderColor: "#01b4bc", //Цвет
           borderWidth: 1, //Толщина линии
           fill: false, //Не заполнять под графиком
           pointRadius: 0,
        },
        {
            label: 'df(x)', //Метка
           data: [], //Данные
           borderColor: "#5fa55a", //Цвет
           borderWidth: 1, //Толщина линии
           fill: false, //Не заполнять под графиком
           pointRadius: 0,
        },
        {
            label: 'dPn(x)', //Метка
           data: [], //Данные
           borderColor: "#fa8925", //Цвет
           borderWidth: 1, //Толщина линии
           fill: false, //Не заполнять под графиком
           pointRadius: 0,
        },
        {
            label: 'Rn(x)', //Метка
           data: [], //Данные
           borderColor: "#fa5457", //Цвет
           borderWidth: 1, //Толщина линии
           fill: false, //Не заполнять под графиком
           pointRadius: 0,
        }]
        },
        options: {
         responsive: false, //Вписывать в размер canvas
         scales: {
          xAxes: [{
           display: true
          }],
          yAxes: [{
           display: true,
           ticks: {
            display: true, 
            min: minY,
            max: maxY,
            stepSize: 1
          }
        }],
         },
        
        }
       })
}

button.addEventListener("click", function(e) {
    e.preventDefault();
    click();
});

function click(){

    //берем параметры функции и окна
    let alpha = +document.querySelector("#alpha").value;
    let beta = +document.querySelector("#beta").value;
    let gamma = +document.querySelector("#gamma").value;
    let delta = +document.querySelector("#delta").value;
    let A = +document.querySelector("#A").value;
    let B = +document.querySelector("#B").value;
    let C = +document.querySelector("#C").value;
    let D = +document.querySelector("#D").value;
    let n = +document.querySelector("#n").value;
    let del = +document.querySelector("#del").value;

    let perX = w/(B - A); // масштаб по x
    let perY = h/(D - C); // масштаб по y

    let hh = (B-A)/n;

    matr = matrix(n+1, n+1);
    table(hh, n, A, B, C, D, perX, perY, alpha, beta, gamma, delta);

    printf(A, B, C, D, perX, perY, alpha, beta, gamma, delta);
    printp(A, B, C, D, perX, perY, alpha, beta, gamma, delta, n, hh);
    ctx.data.datasets[2].hidden = true;
    ctx.data.datasets[3].hidden = true;
    ctx.data.datasets[4].hidden = true;
    ctx.update();
    printdf(A, B, C, D, perX, perY, alpha, beta, gamma, delta, del);
    printdp(A, B, C, D, perX, perY, alpha, beta, gamma, delta, hh, n, del);
    printr(A, B, C, D, perX, perY, alpha, beta, gamma, delta,  hh, n)
    }

//полином
function pol(t, k, n) {
    if (k < n)
        return (pol(t, k + 1, n) + (fac(t, k) * matr[0][k]));
    return fac(t, k) * matr[0][k];
}

//коэффициент при дельта^k(y0)
function fac(t, k) {
    if (k == 0)
        return 1;
    return t / k * fac(t-1, k - 1);
}

//создание матрицы
function matrix(rows, columns){
    let arr = [];
    for (let i=0; i < rows; i++){
        arr[i] = [];
        for (let j=0; j < columns; j++){
            arr[i][j] = 0;
        }
    }
    return arr;
}

//создание таблицы конечных разностей
function table(hh, n, A, B, C, D, perX, perY, alpha, beta, gamma, delta) {
    for (let x = A, i = 0; i <= n; x += hh, i++) {
        matr[i][0] =  f(x, alpha, beta, gamma, delta)
    }

  for(let j=1; j<=n; j++){
    for(let i=0; i<=(n-j); i++){
      matr[i][j]=matr[i+1][j-1]-matr[i][j-1];
    }
  }
}

function printf(A, B, C, D, perX, perY, alpha, beta, gamma, delta){
    ctx.destroy();
    ctx = newChart(C, D);
    for (let x = A; x <= B; x += (B-A)/1000) { 
        ctx.data.labels.push(''+x.toFixed(2));
        ctx.data.datasets[0].data.push(f(x, alpha, beta, gamma, delta).toFixed(2));
    }
    ctx.update();
}

// печать полинома
function printp(A, B, C, D, perX, perY, alpha, beta, gamma, delta, n, hh) {
    for (let x = A; x <= B; x += (B-A)/1000) {
        ctx.data.datasets[1].data.push(pol((x - A) / hh, 0, n).toFixed(2));
    }
    ctx.update();
}

function printdf(A, B, C, D, perX, perY, alpha, beta, gamma, delta, del) {
    for (let x = A; x <= B; x +=(B-A)/1000) { 
        let y = f(x, alpha, beta, gamma, delta); 
        let s = f(x+del, alpha, beta, gamma, delta); 
        ctx.data.datasets[2].data.push(((s-y)/del).toFixed(2));
    }
    ctx.update();
}

function printdp(A, B, C, D, perX, perY, alpha, beta, gamma, delta, hh, n, del) {
    for (let x = A; x <= B; x += (B-A)/1000) {
        let y = pol((x - A) / hh, 0, n)
        let s = pol((x + del - A) / hh, 0, n)
        ctx.data.datasets[3].data.push(((s-y)/del).toFixed(2));
    }
    ctx.update();
}

function printr(A, B, C, D, perX, perY, alpha, beta, gamma, delta,  hh, n) {
    for (let x = A; x <= B; x += (B-A)/1000) {
        let y = f(x, alpha, beta, gamma, delta); 
        ctx.data.datasets[4].data.push(y-pol((x - A) / hh, 0, n).toFixed(2));
    }
    ctx.update();
}

function f(x, alpha, beta, gamma, delta) { //Вычисление нужной функции
    return alpha * (Math.sin(beta/Math.pow((x-gamma),2))) * Math.cos(delta*x);
    // return Math.sin(x);
    // return alpha * Math.sin(beta * x) * Math.cos(Math.tan((gamma / (x - delta))));
}