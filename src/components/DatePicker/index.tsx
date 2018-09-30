import * as React from 'react';
import { getDays, weeks, getSomeMonthEndDay, getSomeMonthFirstDay } from '../../utils/date';
import './index.css';
import DayGrid from './DayGrid';

interface Props {
  onSelect: (newdate:Date, predate:Date) => void;
}

interface State {
  dateGrids: DateGridItem[];
  year:number;
  month: number;
  day: number;
}


interface DateGridItem {
  title: string;
  value: string;
  isActive: boolean;
  inThisMonth: boolean;
}

class DatePicker extends React.Component<Props, State> {
  private selectedDate: Date;
  private preSelectedIndex: number;

  constructor(props:any) {
    super(props);
    const date = new Date();
    this.state = {
      dateGrids: [],
      year: date.getFullYear(), // 默认是当前时间点
      month:date.getMonth() + 1,
      day:date.getDate(),
    }
  }
  public componentDidMount = () => {
    const { year,month } = this.state;
    this.setState({
      dateGrids: this.generateDayGrid(year, month),
    })
    
  }

  private generateDayGrid = (year:number, month: number): DateGridItem[] => {
    const date = {year,month};
    const result = this.preMonthGrid(date).concat(this.curMonthGrid(date), this.nextMonthGrid(date));
    return result;
  }

  private preMonthGrid = ({year, month}:{year:number,month:number}): DateGridItem[] => {
    const isActive = false;
    const inThisMonth = false;
    const resultGrids: DateGridItem[] = [];
    const curMonthFirstDay = getSomeMonthFirstDay(year, month); // 当前月的第一天是周几
    if(curMonthFirstDay === 1) { return []; } // 若第一天是周一 没必要再往下走
    if(month === 1) {
      year--;
      month = 12;
    } else {
      month--;
    }
    const preMonthLastDay = getDays(year, month);  // 上一个月的总天数
    const forTimes = curMonthFirstDay-1;
    const start = preMonthLastDay - forTimes; // 日历开始的日期
    
    for(let i = 0;i <forTimes;i++) {
      const day = start+i+1;
      resultGrids.push({
        title: `${year} 年 ${month} 月 ${day} 日`,
        value: `${year}/${month}/${day}`,
        isActive,
        inThisMonth,
      });
    }
    return resultGrids;

  }
  private curMonthGrid = ({year, month}:{year:number,month:number}): DateGridItem[] => {
    const resultGrids: DateGridItem[] = [];
    const curMonthDays = getDays(year, month); // 当前月的天数
    const curMonthFirstDay = getSomeMonthFirstDay(year, month); // 当前月的第一天
    const forTimes = curMonthDays;
    const isActive = false;
    const inThisMonth = true;

    for(let i = 0;i<forTimes;i++) {
      const day = i+1;
      resultGrids.push({
        title: `${year} 年 ${month} 月 ${day} 日`,
        value: `${year}/${month}/${day}`,
        isActive,
        inThisMonth,
      })
    }
    return resultGrids;
  }
  private nextMonthGrid = ({year, month}:{year:number,month:number}): DateGridItem[] => {
    const resultGrids: DateGridItem[] = [];
    const curMonthLastDay = getSomeMonthEndDay(year, month); // 当前月的最一天是周几
    const forTimes = 7 - curMonthLastDay;
    if(forTimes === 0){return[]}
    const isActive = false;
    const inThisMonth = false;
    if(month === 12) {
      month=1;
      year++;
    } else {
      month++;
    }

    for(let i = 0;i<forTimes;i++) {
      const day = i+1;
      resultGrids.push({
        title: `${year} 年 ${month} 月 ${day} 日`,
        value: `${year}/${month}/${day}`,
        isActive,
        inThisMonth,
      })
    }
    return resultGrids;
  }

  private select = (index: number) => {
    const { onSelect } = this.props;
    const tmp = this.state.dateGrids;
    this.selectedDate = new Date(tmp[index].value);
    const preSelectedDate =this.preSelectedIndex !== undefined ? new Date(tmp[this.preSelectedIndex].value) : undefined;
    if(this.preSelectedIndex !== undefined) {
      tmp[this.preSelectedIndex].isActive = false;
    }
    tmp[index].isActive = true;
    this.setState({
      dateGrids: tmp,
    })
    this.preSelectedIndex = index;
    if(typeof onSelect === 'function') { // 触发组件回调
      onSelect(this.selectedDate, preSelectedDate);
    }
  }

  private lastYear = () => {
    
    let { year } = this.state;
    const { month } = this.state;
    year--;
    this.setState({
      year,
      dateGrids: this.generateDayGrid(year, month),
    })
  }
  private lastMonth = () => {
    let { month } = this.state;
    const { year } = this.state;
    month--;
    this.setState({
      month,
      dateGrids: this.generateDayGrid(year, month),
    })
  }

  private nextYear = () => {
    let { year } = this.state;
    const { month } = this.state;
    year++;
    this.setState({
      year,
      dateGrids: this.generateDayGrid(year, month),
    })
  }

  private nextMonth = () => {
    let { month, year } = this.state;
    if(month === 12) {
      month = 1;
      year++;
    }
    month++;
    this.setState({
      year,
      month,
      dateGrids: this.generateDayGrid(year,month),
    })
  }

  public render() {
    return (
      <div className='Datepicker'>
        <header className='Datepicker-header'>
          <div>
            <span onClick={this.lastYear}>&lt;&lt; </span>
            <span onClick={this.lastMonth}>&lt;</span>
          </div>
          <span>{` ${this.state.year}年 ${this.state.month}月 `}</span>
          <div>
            <span onClick={this.nextMonth}>&gt; </span>
            <span onClick={this.nextYear}>&gt;&gt;</span>
          </div>
        </header>
        <section className='Datepicker-body'>
          <div>
            {weeks.map(item => (<span key={item}>{item}</span>))}
          </div>
          <div>
            {this.state.dateGrids.map((item, index) => {
              return (<DayGrid key={index} indexKey={index} {...item} onSelect={this.select} />)
            })}
          </div>
        </section>
        <footer>foot</footer>
      </div>
    )
  }
}

export default DatePicker;
