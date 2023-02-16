import React from "react";
import { Tooltip, IconButton } from "@chakra-ui/react";
const CustomTooltip = ({ label, icon, onClick }) => {
  return (
    <Tooltip label={label} shouldWrapChildren fontSize="xs">
      <IconButton color="gray.600" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default CustomTooltip;
