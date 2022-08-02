import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );



function Graphics( { dataF } ) {

  const dataImage = ()=> {
    const arrayImg = [];
    dataF.forecast.forecastday[0].hour.forEach( (x, i) => {
      arrayImg.push(new Image(35, 35))
      arrayImg[i].src = x.condition.icon;
    })
    return arrayImg;
  }

    const data = {
        labels: dataF.forecast.forecastday[0].hour.map( x => (x.time.slice(11, 13) + "h" )),
        datasets:[
            {
                responsive: true,
                label: "Forecast: Today",
                fill: true,
                lineTension: 0.5,
                backgroundColor: 'rgb(63, 167, 89, 0.5)',
                borderColor: 'rgb(63, 167, 89, 1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgb(63, 167, 89, 1)',
                pointBackgroundColor: "#fff",
                pointBorderWidth: 2,
                pointHoverRadius: 2,
                pointHoverBorderWidth: 5,
                pointHitRadius: 10,
                pointStyle: dataImage(),
                data: dataF.forecast.forecastday[0].hour.map( x => (Math.round(x.temp_c)))
            }
        ]
    }
    const options = {
      scales: {
        x: {
          grid: {
            color: 'transparent',
          }
        },
        y: {
          ticks: {
            display: false,
          }
        }
      }
    }
    return (
            <Line data={data} options={options} />
    );
}

export default Graphics;