import * as React from 'react';

interface Props {
  title?: string;
  value: string | number ;
  indexKey: number;
  isActive: boolean;
  inThisMonth: boolean;
  onSelect?: (index:number) => void;
}
const defaultClassName = 'Datepicker-default'
const activeClassName = 'Datepicker-Active';
const notActiveClassName = 'Datepicker-notActive';

export default class DayGrid extends React.Component<Props> {
  private date: Date;
  private value: number;
  private key: number;
  constructor(props: any) {
    super(props);
    this.date = new Date(this.props.value);
    this.key = this.props.indexKey;
  }
  private onSelect = () => {
    this.props.onSelect(this.key);
  }
  public render = () => {
    const { title, isActive, inThisMonth ,value} = this.props;
    const content = new Date(value).getDate()
    let cls = '';
    if(inThisMonth && isActive === false) { // 在月份内 但未选中
      cls = notActiveClassName;
    }else if (isActive && inThisMonth) { // 在月份内 并点击选中了
      cls = activeClassName;
    }else { // 不在月份内的
      cls = defaultClassName;
    }
    return (
      <span title={title} className={cls} onClick={this.onSelect}>{content}</span>
    )
  }
}