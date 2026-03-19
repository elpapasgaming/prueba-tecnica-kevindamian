import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#90caf9"   
        },
        background: {
            default: "#f5f7fa"
        }
    },
    ypography: {    
        fontFamily: "Roboto, Arial, sans-serif",
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
});

export default theme;

