import React from 'react';
import { Button } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ThemeButton = ({ toggleColorMode, theme }) => {
  return (
    <div>
      <Button onClick={toggleColorMode}>
        {theme?.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </Button>
    </div>
  );
}

export default ThemeButton;
