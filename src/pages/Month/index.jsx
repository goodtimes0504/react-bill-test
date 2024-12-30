import { NavBar, DatePicker } from "antd-mobile"
import "./index.scss"
import { useEffect, useMemo, useState } from "react"
import classNames from "classnames"
import { useSelector } from "react-redux"
import _ from "lodash"
import dayjs from "dayjs"
//引入按日期显示账单组件
import DailyBill from "./components/DayBill/index.jsx"

const Month = () => {
  //按月做数据的分组
  const billList = useSelector((state) => state.bill.billList)
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"))
  }, [billList])
  //控制弹窗的打开和关闭
  const [dateVisible, setDateVisible] = useState(false)
  // 存储展示的月份
  const [currentMonth, setCurrentMonth] = useState(() =>
    dayjs().format("YYYY-MM")
  )
  // 存储选择器的日期对象
  const [date, setDate] = useState(() => new Date())
  // 存储当前月份的账单
  const [currentMonthBill, setCurrentMonthBill] = useState([])
  //当前月按照日期分组后的账单
  // const [currentDayBill, setCurrentDayBill] = useState([])
  const dayGroup = useMemo(() => {
    const groupData = _.groupBy(currentMonthBill, (item) =>
      dayjs(item.date).format("YYYY-MM-DD")
    )
    const keys = Object.keys(groupData)
    return {
      keys,
      groupData,
    }
  }, [currentMonthBill])

  const onConfirm = (val) => {
    setDateVisible(false)
    const formattedMonth = dayjs(val).format("YYYY-MM")

    // 1. 先获取数据
    const monthBills = monthGroup[formattedMonth] || []

    // 2. 更新状态
    setCurrentMonth(formattedMonth)
    setCurrentMonthBill(monthBills)

    setDate(val)
  }
  const monthResult = useMemo(() => {
    const pay = currentMonthBill
      .filter((item) => item.type === "pay")
      .reduce((sum, item) => sum + item.money, 0)
    const income = currentMonthBill
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.money, 0)
    const balance = income + pay
    return { pay, income, balance }
  }, [currentMonthBill])
  //初始化的时候把当前月的数据显示出来
  useEffect(() => {
    const nowDate = dayjs().format("YYYY-MM")
    setCurrentMonthBill(monthGroup[nowDate] || [])
  }, [monthGroup])

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">{currentMonth}月账单</span>
            {/* 根据当前弹窗打开状态控制expand类名 */}
            <span
              className={classNames("arrow", dateVisible && "expand")}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.balance.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            value={date}
            onClose={() => setDateVisible(false)}
            onConfirm={onConfirm}
            max={new Date()}
          />
        </div>
        {/* 按日期显示账单 */}
        {dayGroup.keys.map((key) => {
          return (
            <DailyBill
              date={key}
              billList={dayGroup.groupData[key]}
              key={key}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Month
