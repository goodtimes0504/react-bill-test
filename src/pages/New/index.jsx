import { Button, DatePicker, Input, NavBar } from "antd-mobile"
import Icon from "@/components/Icon"
import "./index.scss"
import classNames from "classnames"
import { billListData } from "@/contents"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addBillList } from "@/store/modules/billStore"
const New = () => {
  const navigate = useNavigate()
  //准备一个控制收入支出的状态 pay 支出 income 收入
  const [billType, setBillType] = useState("pay")
  //准备一个控制金额的状态
  const [money, setMoney] = useState(0)
  const moneyChange = (value) => {
    setMoney(value)
  }
  //收集账单类型
  const [useFor, setUseFor] = useState("")
  const dispatch = useDispatch()
  //保存账单回调函数
  const saveBill = () => {
    // console.log("保存账单")
    // 收集表单数据
    const data = {
      type: billType,
      money: billType === "pay" ? -money : money,
      date: new Date(),
      useFor,
    }
    //触发异步action
    dispatch(addBillList(data))
  }
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames({ selected: billType === "pay" })}
            onClick={() => setBillType("pay")}
          >
            支出
          </Button>
          <Button
            className={classNames({ selected: billType === "income" })}
            shape="rounded"
            onClick={() => setBillType("income")}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text">{"今天"}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={moneyChange}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {/* 数据区域 */}
        {billListData[billType].map((item) => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map((item) => {
                  return (
                    <div
                      className={classNames("item", "")}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New
