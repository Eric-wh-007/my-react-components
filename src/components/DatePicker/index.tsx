import * as React from 'react';
import { getDays, weeks, getSomeMonthEndDay, getSomeMonthFirstDay } from '../../utils/date';
import './index.css';
import DayGrid from './DayGrid';

interface Props {
  onSelect: (newdate:Date, predate:Date) => void;
}

interface State {
  dateGrids: DateGridItem[];
}

interface Today {
  year: number;
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
  private gridNums:number;
  private now: Date;
  private today: Today;
  private dateGrids: DateGridItem[];
  private selectedDate: Date;
  private preSelectedIndex: number;

  constructor(props:any) {
    super(props);
    this.gridNums = 42; // 6*7
    this.now = new Date();
    this.today = {
      year: this.now.getFullYear(),
      month: this.now.getMonth(),
      day: this.now.getDate(),
    }
    this.state = {
      dateGrids: []
    }
  }
  public componentDidMount = () => {
    this.setState({
      dateGrids: this.generateDayGrid(),
    })
  }

  private generateDayGrid = (): DateGridItem[] => {
    const { month, year } = this.today;
    let preMonthLastDay = 0;
    const thisMonthDays = getDays(year,month);
    if(month === 1) { // month 为1月份的时候
      preMonthLastDay = getSomeMonthEndDay(year - 1,12)
    } else {
      preMonthLastDay = getSomeMonthEndDay(year,month-1)
    }
    
    const preGrids: DateGridItem[] = [];
    const midGrids: DateGridItem[] = [];
    const lastGrids: DateGridItem[] = [];
    for(let i = 1;i <= preMonthLastDay; i++) { // 上个月
      const isActive = false;
      const inThisMonth = false;
      const lastmonthDays = getDays(year, month-1);// 上个月的天数
      const day = lastmonthDays-preMonthLastDay+i
      preGrids.push({
        title: `${year} 年 ${month-1} 月 ${day} 日`,
        value: `${year}/${month-1}/${day}`,
        isActive,
        inThisMonth,
      })
    }

    for(let i = 1;i <= thisMonthDays; i++) {// 这个月
      const isActive = false;
      const inThisMonth = true;
      midGrids.push({
        title: `${year} 年 ${month} 月 ${i} 日`,
        value: `${year}/${month}/${i}`,
        isActive,
        inThisMonth,
      })
    }
    let nextMonthForTimes = this.gridNums-thisMonthDays-preMonthLastDay;
    if( nextMonthForTimes > 7) {
      nextMonthForTimes = nextMonthForTimes - 7;
    }
    for(let i = 1;i <= nextMonthForTimes; i++) { // 下个月
      const isActive = false;
      const inThisMonth = false;
      lastGrids.push({
        title: `${year} 年 ${month+1} 月 ${i} 日`,
        value:`${year}/${month+1}/${i}`,
        isActive,
        inThisMonth,
      })
    }
    const result = preGrids.concat(midGrids, lastGrids);
    this.setState({
      dateGrids: result,
    })
    return result;
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

  public render() {
    return (
      <div className='Datepicker'>
        <header className='Datepicker-header'>
          <div>
            <span>&lt;&lt; </span>
            <span>&lt;</span>
          </div>
          <span>{` ${this.today.year}年 ${this.today.month}月 `}</span>
          <div>
            <span>&gt; </span>
            <span>&gt;&gt;</span>
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
