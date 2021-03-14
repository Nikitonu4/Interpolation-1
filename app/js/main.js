"use struct;"
// function alpha*Math.sin(beta/Math.pow((x-gamma),2))*Math.cos(delta*x)

let button = document.querySelector(".button");

let w = document.getElementById('myChart').width;
let h = document.getElementById('myChart').height;

let mat;

let ctx = newChart();

function newChart(minY, maxY){
    return new Chart (document.getElementById('myChart').getContext('2d'), {
        type: 'line',
        data: {
         labels: [], //Подписи оси x
         datasets: [{
           label: 'f(x)', //Метка
           data: [], //Данные
           borderColor: "#d79e50", //Цвет
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
         animation: {
            duration: 1500,
            easing: 'linear',
            tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true,
            }
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

    let perX = w/(+B - +A); // масштаб по x
    let perY = h/(+D - +C); // масштаб по y

    //берем чеки
    let f = document.querySelector("#f");
    let p = document.querySelector("#p");
    let r = document.querySelector("#r");
    let df = document.querySelector("#df");
    let dp = document.querySelector("#dp");

    let hh = (B - A) / n;

    mat = matrix(n + 1, n + 1);
    table(hh, n, A, B, C, D, perX, perY, alpha, beta, gamma, delta);

    if(f.checked){
        printf(A, B, C, D, perX, perY, alpha, beta, gamma, delta);
    }

    if(p.checked){
        printp(A, B, C, D, perX, perY, alpha, beta, gamma, delta, n);
    }
    //
    // if(r.checked){
    //     printr(A, B, C, D, perX, perY, alpha, beta, gamma, delta, hh, n);
    // }
    //
    // if(df.checked){
    //     printdf(A, B, C, D, perX, perY, alpha, beta, gamma, delta,  hh, n, del);
    // }
    //
    // if(dp.checked){
    //     printdp(A, B, C, D, perX, perY, alpha, beta, gamma, delta,  hh, n, del);
    // }
}

// создание матрицы из нулей
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
//первый столбец (func(x))
    for (let x = A, i = 0; i <= n; x += hh, i++) {
        // mat[i][0] = alpha*Math.sin(beta/Math.pow((x-gamma),2))*Math.cos(delta*x);
        mat[i][0] = Math.cos(delta*x);
    }

    for(let j=1; j<=n; j++){
        for(let i=0; i<=(n-j); i++){
            mat[i][j]=mat[i+1][j-1]-mat[i][j-1];
        }
    }
}

//печать функции
function printf(A, B, C, D, perX, perY, alpha, beta, gamma, delta){
    ctx.destroy();
    ctx = newChart(C, D);

    for (let x = A; x <= B; x +=0.1/perX) { //0.1 - шаг
        ctx.data.labels.push(''+x.toFixed(2));
        ctx.data.datasets[0].data.push(f(x, alpha, beta, gamma, delta).toFixed(2));

    }
    ctx.update();


}

function printp(A, B, C, D, perX, perY, alfa, betta, gamma, delta, n) {

    hh = (Number(B)-Number(A))/Number(n);

    let s = floor(n / 2); 


    ctx.moveTo(Math.round(- Number(A) * perX + x * perX), Math.round(Number(D) * perY - pol((x - Number(A)) / hh, 0, n) * perY));
    for (let x = A; x <= B; x +=0.1/perX) {
        ctx.lineTo(Math.round(- Number(A) * perX + x * perX), Math.round(Number(D) * perY - pol((x - Number(A)) / hh, 0, n) * perY), 1, 1);
    }

    ctx.stroke();
}


function f(x, alpha, beta, gamma, delta) { //Вычисление нужной функции
    return alpha*Math.sin(beta/Math.pow((x-gamma),2))*Math.cos(delta*x);
}




