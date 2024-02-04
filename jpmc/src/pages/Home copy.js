import { Box, Grid, Container, Divider } from "@mui/material";
import { DrawerHeader, MiniDrawer } from "../components/Navbar";
import CoinSelect from "../components/CoinSelect";
import CoinsTable from "../components/CoinsTable";
import { useState, useEffect, createContext } from "react";
import { WebSocketResult as startRetrieveData } from "../components/WebSocket.js";

export const CoinContext = createContext({
  coinlist: [],
  setCoinList: () => {},
});

function createData(id, name, price, change, marketCap) {
  return {
    id,
    name,
    price,
    change,
    marketCap,
  };
  // }
}

let initList = [];

if (!window.localStorage.getItem("coins_table")) {
  window.localStorage.setItem("coins_table", JSON.stringify([]));
} else {
  initList = JSON.parse(window.localStorage.getItem("coins_table"));
}

export default function Home() {
  const [coinList, setCoinList] = useState(initList);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let retRows = [];
    coinList.forEach((coin, idx) => {
      if (coin === "ETH") {
        retRows.push(createData(idx, coin, 1, 1, 1));
      } else if (coin === "BTC") {
        retRows.push(createData(idx, coin, 1, 1, 1));
      } else if (coin === "SOL") {
        retRows.push(createData(idx, coin, 1, 1, 1));
      }
      setRows(retRows);
    });
  }, [coinList]);

  // function ProcessData(data) {
  //   // console.log(data);
  //   let retRows = [];
  //   coinList.forEach((coin, idx) => {
  //     if (coin === "ETH") {
  //       retRows.push(createData(idx, coin, data["ETH-USDT"], 1, 1));
  //     } else if (coin === "BTC") {
  //       retRows.push(createData(idx, coin, data["BTC-USDT"], 1, 1));
  //     } else if (coin === "SOL") {
  //       retRows.push(createData(idx, coin, data["SOL-USDT"], 1, 1));
  //     }
  //   });

  //   setRows(retRows);
  // }

  // startRetrieveData(ProcessData);
  useEffect(() => {
    window.localStorage.setItem("coins_table", JSON.stringify(coinList));
    initList = coinList;
    setCoinList(coinList);
    let updated_rows = rows.filter((element) =>
      coinList.includes(element.name)
    );
    console.log(coinList);
    // console.log(updated_rows);
    // setRows(updated_rows);
  }, [coinList]);

  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />;
      <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <CoinContext.Provider value={[coinList, setCoinList]}>
          <Grid container alignItems={"center"} justifyContent={"flex-end"}>
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
