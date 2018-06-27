import { Component, OnInit , Input } from '@angular/core';
import * as d3 from 'd3';
import * as c3 from 'c3';
import * as radarChartD3 from './RadarChart';

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input() testingArray;

  arrayWithResults = [];
  currentAnswer: any;
  cancerApiJSON:any;

  //chart stuff
  RadarCharter: any;
  chartData:any;
  constructor() { }

  mapArrayWithResults() {
    const newCordsX = this.arrayWithResults.map(data => data.x_position);
    const newCordsY = this.arrayWithResults.map(data => data.y_position);
    return {x: newCordsX, y: newCordsY};
  }

  ngAfterViewInit() {
    const results = this.mapArrayWithResults();
    let chart = c3.generate({
    bindto: '#chart',
      data: {
          xs: {
              posibilidad: 'posibilidad_x',
          },
          // iris data from R
          columns: [
              ["posibilidad_x", ...results.x],
              ["posibilidad", ...results.y],
          ],
          type: 'scatter'
      },
      axis: {
          x: {
              label: 'Posibilidad de no contraer cancer',
              tick: {
                  fit: false
              }
          },
          y: {
              label: 'Posibilidad de no contraer cancer'
          }
      }
    });
  }


  pushTheResult(currentAnswer) {
    let result = {};
    result['x_position'] = this.calculateXPositionResult(currentAnswer);
    result['y_position'] = this.calculateXPositionResult(currentAnswer);
    result['color'] = 'blue';
    result['delay'] = this.calculateDelayResult(currentAnswer);
    result['isOurResult'] = true;
    this.arrayWithResults.push(result);
  }

  fillTheResultsArray() {
      for(let result of this.testingArray) {
        result['x_position'] = this.calculateXPosition(result);
        result['y_position'] = this.calculateXPosition(result);
        result['color'] = this.calculateColor(result);
        result['delay'] = this.calculateDelay(result);
        result['isOurResult'] = false;
        this.arrayWithResults.push(result);
      }
  }

  calculateXPosition(result) {
    let xposition: number = 0;
    for(let value of result.input) {
      xposition = xposition + value;
    }
    xposition = (xposition/9) * 100;
    return xposition;
  }

  calculateDelay(result) {
    let xposition: number = 0;
    for(let value of result.input) {
      xposition = xposition + value;
    }
    xposition = (xposition/9);
    return xposition;
  }

  calculateXPositionResult(result) {
    let xposition: number = 0;
    for(let value of result) {
      xposition = xposition + value;
    }
    xposition = (xposition/9) * 100;
    return xposition;
  }

  calculateDelayResult(result) {
    let xposition: number = 0;
    for(let value of result) {
      xposition = xposition + value;
    }
    xposition = (xposition/9);
    return xposition;
  }

  calculateColor(result) {
    let color: string = '';
    if(result.output[0] == 0) {
      color = 'green';
    } else {
      color = 'red';
    }
    return color;
  }

  ngOnInit() {
    this.fillTheResultsArray();

  }

  popLastEntry() {
    this.arrayWithResults.pop();
  }


}
