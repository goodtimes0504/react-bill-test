import classNames from "classnames"
import "./index.scss"
import { useMemo } from "react"
import { billTypeToName } from "@/contents"

// eslint-disable-next-line react/prop-types
const DailyBill = ({ date, billList }) => {
  const dayResult = useMemo(() => {
    const pay = billList
      .filter((item) => item.type === "pay")
      .reduce((sum, item) => sum + item.money, 0)
    const income = billList
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.money, 0)
    const balance = income + pay
    return { pay, income, balance }
  }, [billList])
  return (
    <div className={classNames("dailyBill")}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames("arrow")}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.balance.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      {/* 单日列表 */}
      <div className="billList">
        {billList.map((item) => {
          return (
            <div className="bill" key={item.id}>
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames("money", item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default DailyBill
