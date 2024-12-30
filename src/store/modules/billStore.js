//编写账单列表相关store
import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const billStore = createSlice({
  name: "bill",
  //数据状态state
  initialState: {
    billList: [],
  },
  reducers: {
    //同步修改方法
    setBillList(state, action) {
      state.billList = action.payload
    },
    //同步添加账单
    addBill(state, action) {
      state.billList.push(action.payload)
    },
  },
})

//解构actions
const { setBillList, addBill } = billStore.actions

//编写异步修改方法
const getBillList = () => {
  return async (dispatch) => {
    //编写异步请求
    const res = await axios.get("http://localhost:8888/ka")
    //触发同步reducer
    dispatch(setBillList(res.data))
  }
}
//编写异步添加账单
const addBillList = (data) => {
  return async (dispatch) => {
    const res = await axios.post("http://localhost:8888/ka", data)
    //触发同步reducer
    dispatch(addBill(res.data))
  }
}
//导出store实例
export { billStore, setBillList, getBillList, addBillList }
//导出reducer
const reducer = billStore.reducer
export default reducer
