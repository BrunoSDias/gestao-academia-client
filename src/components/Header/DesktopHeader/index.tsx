import React, { useState, useCallback, useEffect, } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { useNavigate } from 'react-router';

export const DesktopHeader: React.FC = () => {
  const navigate = useNavigate();

  return(
    <>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
      >
        Gestão Academia
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Button
          key={'historico'}
          onClick={() => navigate('/historico')}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          Histórico
        </Button>
        <Button
          key={'acompanhar'}
          onClick={() => navigate('/')}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          Acompanhar
        </Button>
      </Box>
    </>
  )
}