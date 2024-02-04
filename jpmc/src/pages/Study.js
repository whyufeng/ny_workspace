import { Box } from "@mui/material";
import { DrawerHeader, MiniDrawer } from "../components/Navbar";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />;
      <Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Typography variant="h1">Study</Typography>
        </Box>
      </Box>
    </Box>
  );
}
