import { Component, OnInit } from '@angular/core';
import { ChartOptions, LabelItem } from 'chart.js';
import { UsuarioService } from 'src/app/service/usuario.service';
import { UserChart } from 'src/app/model/userchart';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private userService: UsuarioService){}

 userChart = new UserChart();

  ngOnInit(): void {
    this.userService.loadGraph().subscribe(data =>{
      this.userChart = data;

      this.chartData.labels == this.userChart.nome.split(',');

      var arraySalario = JSON.parse('[' + this.userChart.salario + ']');

      this.chartData.datasets = [
        {data: arraySalario, label: 'Salário Usuário'}
      ];
    });
  }

  options: ChartOptions = {
    responsive: true,
  };

  chartData = {
    labels: [],
    legend: true,
    plugins: [],
    part: parent,
    datasets: [
      {
        data: [],
        label: 'Salário Usuário'
      }
    ]
  }
}