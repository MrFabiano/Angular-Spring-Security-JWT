import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { UserChart } from 'src/app/model/userchart';
import {ChartDataset} from 'chart.js';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  constructor(private userService: UsuarioService){}

  userChart = new UserChart();

  ngOnInit(): void {
    this.userService.loadGraph().pipe().subscribe(data =>{
      this.userChart = data;

      this.barChartLabels === this.userChart.nome.split(',');

      var arraySalario = JSON.parse('[' + this.userChart.salario + ']');

      this.barChartData = [
        {data: arraySalario, label: 'Wage User'}
      ];
    });
  }
  
  barChartLabels = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataset[] = [
    { data: [],  label: 'Wage' }
  ];
}
