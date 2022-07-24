import { Component, Self } from '@angular/core';
import { ApiService } from './services/services.service'
import { DataModel } from './models/data.model';
import * as _ from 'lodash';
import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'covid19App';
  value = new DataModel();
  statewise = [];
  india ;
  notification = [];
  clicked = false;
  currentDate = moment().format('LLL');

  myOptions={
    startVal:0,
    duration:1.5,
  }


  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.fetchData()
  }

  async fetchData() {
    let india
    await this.api.fetchEntireData()
      .toPromise()
      .then((res: any[]) => {
        Object.keys(res).forEach(key => this.statewise.push({
          state: key,
          stats: res[key]
       }));
       this.statewise = _.remove(this.statewise,function(n){
         if(n.state === 'TT'){
            india = n 
            return ''
          }else
            return n;
        })
      })  
    this.india = india;
    this.value = this.statewise[0]
}

 async logs(){  
    let ap = [];
    await this.api.fetchLogs().toPromise()
      .then((res: any[]) => {
        let cp  = [];
        let arr = [];
        cp = Object.values(res)
        cp.forEach((cv)=>{
          arr.push(cv)
        })
        arr.reverse().slice(0,10).forEach(function(cv){
          ap.push([cv.update.replace(/\u21B5\r/g,''),moment.unix(cv.timestamp).format('LT')])
        })    
    }).catch(err=>{console.log(err)})
    console.log(ap)
    this.notification = ap;
    this.clicked = true;
  }


  close(){
    this.clicked=false;
  }
  
}