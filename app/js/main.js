let button = document.querySelector(".button");
var ctx = document.getElementById('myChart').getContext('2d');

var myRadarChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
        datasets: [{
            data: [20, 10, 4, 2]
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: false
            },
            ticks: {
                suggestedMin: 50,
                suggestedMax: 100
            }
        }
    }
});


button.addEventListener("click", function() {

    //берем параметры функции и окна
    let alpha = document.querySelector("#alpha").value;
    let beta = document.querySelector("#beta").value;
    let gamma = document.querySelector("#gamma").value;
    let delta = document.querySelector("#delta").value;
    let A = document.querySelector("#A").value;
    let B = document.querySelector("#B").value;
    let C = document.querySelector("#C").value;
    let D = document.querySelector("#D").value;
    let n = document.querySelector("#n").value;

    let perX = w/(+B-+A);
    let perY = h/(+D-+C);

    //берем чеки
    let f = document.querySelector("#f");
    let p = document.querySelector("#p");
    let r = document.querySelector("#r");
    let df = document.querySelector("#df");
    let dp = document.querySelector("#dp");

});


