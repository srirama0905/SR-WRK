import clsx from "clsx";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import { BorderAll, SlowMotionVideoOutlined } from "@material-ui/icons";


export const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
   root: {
      display: "flex",
      border:"1px solid black"
    },
    maindiv: {
        width:"100%"
    },
    div1: {
        width:"35%",
        border:"1px solid black"
    },
    div2: {
        width:"35%",
        border:"1px solid black"
    },
    div3: {
        width:"30%"
        
    }
  }));
  