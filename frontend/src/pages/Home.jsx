import { Box, Grid, Container, Divider } from "@mui/material";
import { DrawerHeader, MiniDrawer } from "../components/Navbar";
import CoinSelect from "../components/CoinSelect";
import CoinsTable from "../components/CoinsTable";
import { useState, useEffect, createContext } from "react";
import { WebSocketResult as startRetrieveData } from "../components/WebSocket";

export const CoinContext = createContext({
  coinlist: [],
  setCoinList: () => {},
});

function createData(id, name, price, high24h, low24h) {
  return { id, name, price, high24h, low24h };
}

function initialize() {
  let initList = [];
  let initrows = [];
  if (!window.localStorage.getItem("coins_table")) {
    window.localStorage.setItem("coins_table", JSON.stringify([]));
  } else {
    initList = JSON.parse(window.localStorage.getItem("coins_table"));
  }
  initList.forEach((coin, idx) => {
    initrows.push(createData(idx, coin, "", "", ""));
  });
  return [initList, initrows];
}

export default function Home() {
  let [initList, initrows] = initialize();
  const [coinList, setCoinList] = useState(initList);
  const [rows, setRows] = useState(initrows);
  const [wsData, setWsData] = useState({ ETH: {}, BTC: {}, SOL: {} });

  const processData = (rawData) => {
    setWsData({
      ETH: rawData["ETH-USDT"],
      BTC: rawData["BTC-USDT"],
      SOL: rawData["SOL-USDT"],
    });
  };

  startRetrieveData(processData);

  useEffect(() => {
    let retRows = [];
    coinList.forEach((coin, idx) => {
      if (wsData[coin] === undefined) {
        retRows.push(createData(idx, coin, null, null, null));
      } else {
        retRows.push(
          createData(
            idx,
            coin,
            wsData[coin].price,
            wsData[coin].high24h,
            wsData[coin].low24h
          )
        );
      }

      setRows(retRows);
    });
  }, [coinList, wsData]);

  useEffect(() => {
    window.localStorage.clear("coins_table");
    window.localStorage.setItem("coins_table", JSON.stringify(coinList));
  }, [coinList]);

  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />
      <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <CoinContext.Provider value={[coinList, setCoinList]}>
          <Grid container justifyContent={"flex-end"}>
            <CoinSelect />
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid container justifyContent={"center"}>
            <CoinsTable rows={rows} />
          </Grid>
          <Divider sx={{ my: 2 }} />
        </CoinContext.Provider>
      </Container>
    </Box>
  );
}
