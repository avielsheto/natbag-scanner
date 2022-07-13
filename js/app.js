let searchBtn = document.querySelector("#searchBtn");
let startDate = document.querySelector("#startDate");
let endDate = document.querySelector("#endDate");
let table = document.querySelector(".table");

// start Immediately
function start() {
    const fullTime = [];
    const yDepartures = [];
    const hours = [];
    let roundHour = [];
    let hoursTime = [];
    let onlyTwoH = [];
    let time;
    let finalY = [];

    const options = {
        method: "GET",
        url: `https://aerodatabox.p.rapidapi.com/flights/airports/icao/LLBG/${startDate.value}/${endDate.value}`,
        params: {
            withLeg: "true",
            withCancelled: "true",
            withCodeshared: "true",
            withCargo: "true",
            withPrivate: "true",
            withLocation: "false",
        },
        headers: {
            "X-RapidAPI-Key": "c9537b99d7msh33fc07d5c2ace1ep1d887ajsn6917e3b5e84c",
            "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
        },
    };

    axios
        .request(options)
        .then(function (response) {
            // display all the data on table 
            for (let i = 18; i < response.data.departures.length; i++) {

                table.innerHTML += `
            <tr>
            <td class ="text-center">${response.data.departures[i].airline.name}</td>
            <td class ="text-center">${response.data.departures[i].arrival.terminal}</td>
            <td class ="text-center">${response.data.departures[i].number}</td>
            <td class ="text-center">${response.data.departures[i].arrival.scheduledTimeLocal}</td>
            </tr>`;
                fullTime.push(response.data.departures[i].arrival.scheduledTimeLocal);
                yDepartures.push(response.data.departures[i]);
            }
            // Cuts only the necessary data
            for (let i = 0; i < fullTime.length; i++) {
                if (fullTime[i] == undefined) {
                } else {
                    time = fullTime[i].slice(11, 16);
                    TwoNumH = fullTime[i].slice(11, 13);
                    hours.push(time);
                    hoursTime.push(TwoNumH);
                }
            }
            // Circle the minutes and take it to y canvas label 
            const rounding = (num) => {
                let start = startDate.value;
                roundHour = [];
                num = start.slice(11, 13);
                roundHour.push(num + ":00");
                onlyTwoH.push(num);
                // add zero to one number hour
                for (let i = 0; i < 12; i++) {
                    num++;
                    if (num > 23) {
                        num = 0;
                    }
                    if (num == "0") {
                        num = "00";
                        onlyTwoH.push(num);
                    } else if (num == "1") {
                        num = "01";
                        onlyTwoH.push(num);
                    } else if (num == "2") {
                        num = "02";
                        onlyTwoH.push(num);
                    } else if (num == "3") {
                        num = "03";
                        onlyTwoH.push(num);
                    } else if (num == "4") {
                        num = "04";
                        onlyTwoH.push(num);
                    } else if (num == "5") {
                        num = "05";
                        onlyTwoH.push(num);
                    } else if (num == "6") {
                        num = "06";
                        onlyTwoH.push(num);
                    } else if (num == "7") {
                        num = "07";
                        onlyTwoH.push(num);
                    } else if (num == "8") {
                        num = "08";
                        onlyTwoH.push(num);
                    } else if (num == "9") {
                        num = "09";
                        onlyTwoH.push(num);
                    } else {
                        onlyTwoH.push(String(num));
                    }
                    roundHour.push(num + ":00");
                }
                console.log(onlyTwoH);
            };
            rounding();


            // Count all departures by their rounding hour
            onlyTwoH.forEach((element) => {
                let num = hoursTime.filter((x) => x === element).length;
                finalY.push(num);
            });
            console.log(finalY);

            
            // creating graph
            function chartIt() {
                // re-create with the new data
                searchBtn.addEventListener("click", function () {
                    function removeData(chart) {
                        chart.destroy();
                    }
                    removeData(chart);
                    start();
                });

                const ctx = document.getElementById("chart").getContext("2d");
                ctx.clearRect(
                    0,
                    0,
                    document.getElementById("chart").width,
                    document.getElementById("chart").height
                );
                const chart = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: roundHour,
                        datasets: [
                            {
                                label: "# number of departures",
                                data: finalY,
                                backgroundColor: [
                                    "rgba(255, 99, 132, 0.2)",
                                    "rgba(54, 162, 235, 0.2)",
                                    "rgba(255, 206, 86, 0.2)",
                                    "rgba(75, 192, 192, 0.2)",
                                    "rgba(153, 102, 255, 0.2)",
                                    "rgba(255, 159, 64, 0.2)",
                                ],
                                borderColor: [
                                    "rgba(255, 99, 132, 1)",
                                    "rgba(54, 162, 235, 1)",
                                    "rgba(255, 206, 86, 1)",
                                    "rgba(75, 192, 192, 1)",
                                    "rgba(153, 102, 255, 1)",
                                    "rgba(255, 159, 64, 1)",
                                ],
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
            chartIt();
        })

        .catch(function (error) {
            console.error(error);
        });
}
start();
