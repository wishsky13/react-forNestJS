import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { Colors } from "../../themes";

type IButton = {
  text: string;
  onClick: () => void;
};

const CustomButton = styled(Button)<ButtonProps>(() => ({
  textAlign: "left",
  color: Colors.Dark_Green,
  fontWeight: 600,
  maxWidth: 220,
  textTransform: "none",
  "&:hover": {
    backgroundColor: "transparent",
    color: Colors.Dark_Green,
  },
  "&:active": {
    backgroundColor: "transparent",
    color: Colors.Green,
  },
}));

const TextButton = (props: IButton) => {
  return (
    <CustomButton
      className="ellipsis"
      variant="text"
      disableRipple
      onClick={() => {
        props.onClick();
      }}
      sx={{
        ml: -1,
        justifyContent: "flex-start",
        display: "block",
      }}
    >
      {props.text}
    </CustomButton>
  );
};

export default TextButton;
