import * as React from 'react';
import { getDays, weeks } from '../../utils/date';
import './index.css';

const activeClassName = 'Datepicker-Active';
const notActiveClassName = 'Datepicker-notActive';

class DatePicker extends React.Component {
  private gridNums:number;
  private now: Date;
  private year: number;
  private month: number;
  private day: number;

  constructor(props:any) {
    super(props);
    this.gridNums = 42; // 6*7
    this.now = new Date();
    this.year = this.now.getFullYear();
    this.month = this.now.getMonth() + 1;
    this.day = this.now.getDate();
  }

  private generateDayGrid = () => {
    const grids = [];
    for(let i = 1; i <= this.gridNums; i++) {
      if(i%2 === 0) {
        grids.push(<span className='Datepicker-notActive'>{i}</span>)
      }else {
        grids.push(<span className='Datepicker-Active'>{i}</span>)
      }
      
    }
    return grids;
  }

  public render() {
    return (
      <div className='Datepicker'>
        <header className='Datepicker-header'>
          <div>
            <span>&lt;&lt; </span>
            <span>&lt;</span>
          </div>
          <span>{` ${this.year}年 ${this.month}月 `}</span>
          <div>
            <span>&gt; </span>
            <span>&gt;&gt;</span>
          </div>
        </header>
        <section className='Datepicker-body'>
          <div>
            {weeks.map(item => (<span>{item}</span>))}
          </div>
          <div>
            {this.generateDayGrid()}
          </div>
        </section>
        <footer>foot</footer>
      </div>
    )
  }
}

export default DatePicker;
