
/**
 * 根据年 月 获取那个月的天数
 * @param year 年份
 * @param month 月份
 */
export const getDays = (year:number, month:number): number => {
  const result = new Date(year, month, -1).getDate() + 1;
  return result;
}

export const weeks = ['一', '二','三','四','五','六','日' ];

