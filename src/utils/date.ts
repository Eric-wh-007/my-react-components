
/**
 * 根据年 月 获取那个月的天数
 * @param year 年份
 * @param month 月份
 * @return dayCount 指定月份的天数
 */ 
export const getDays = (year:number, month:number): number => {
  const dayCount = new Date(year, month, -1).getDate() + 1;
  return dayCount;
}
/**
 * 根据 年 ，月 获取指定月份的第一天是周几 
 * @param year 
 * @param month 
 * @return whichDay 第一次是周几 0-6
 */
export const getSomeMonthFirstDay = (year: number, month: number):number => {
  if(month-1<0) {throw Error('wrong month')}
  let whichDay = new Date(year, month - 1).getDay();
  if(whichDay === 0) {whichDay =7}
  return whichDay;
}

/**
 * 根据 年 ，月 获取指定月份的最后一天是周几 
 * @param year 
 * @param month 
 * @return whichDay 是周几 0-6
 */
export const getSomeMonthEndDay = (year: number, month: number):number => {
  if(month - 1 < 0) {throw Error('wrong month')}
  const curMonthDays = getDays(year, month);
  let whichDay = new Date(year, month - 1, curMonthDays).getDay();
  if(whichDay === 0) {whichDay = 7}
  return whichDay;
}

export const weeks = ['一', '二','三','四','五','六','日' ];
