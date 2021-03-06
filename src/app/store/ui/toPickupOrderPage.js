import { createSlice } from "@reduxjs/toolkit";
import { getShipperOrders } from "../../services/orderService";
import { orderStatus, orderBy } from "../../../config.json";

export const defaultPageSize = 5;

const slice = createSlice({
  name: "toPickupOrderPage",
  initialState: {
    orders: [],
    totalOrders: 0,
    pageSize: defaultPageSize,
    pageNumber: 0,
  },
  reducers: {
    ordersReloaded: (page, action) => {
      page.orders = action.payload;
    },
    pageNumberSet: (page, action) => {
      page.pageNumber = action.payload;
    },
    totalOrdersSet: (page, action) => {
      page.totalOrders = action.payload;
    },
  },
});

export default slice.reducer;

const { ordersReloaded, pageNumberSet, totalOrdersSet } = slice.actions;

export const reloadOrders =
  (pageSize = defaultPageSize, pageNumber = 0) =>
  async (dispatch) => {
    const { orders, totalOrders } = await getShipperOrders(
      pageSize,
      pageNumber,
      orderStatus.toPickup.statusCode,
      orderBy.dateAppointment,
      true
    );

    dispatch(ordersReloaded(orders));
    dispatch(totalOrdersSet(totalOrders));
    dispatch(pageNumberSet(pageNumber));
  };
