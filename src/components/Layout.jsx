import HomeIcon from '@mui/icons-material/Home'
import {
  AppBar,
  Avatar,
  Button,
  Container,
  Link,
  Stack,
  Toolbar,
  Typography,
  styled,
} from '@mui/material'
import {Outlet} from 'react-router-dom'
const MenuItem = styled(Button)`
  flex-direction: column;
  & span {
    margin-right: 0;
    margin-left: 0;
  }
`
const Logo=styled('img')`
  height:58px;
  object-fit:contain;
  object-position:center;
`
const Offset = styled('div')(({theme}) => theme.mixins.toolbar)
const Layout = () => {
  return (
    <>
      <AppBar position="fixed" elevation={0} color="secondary">
        <Toolbar>
          <Logo src="https://debonairgroupbd.com/wp-content/uploads/2022/02/logo-1.png" alt=""  />
          <Stack flexGrow={1} justifyContent='end' spacing={4} direction="row" alignItems="center">
            <MenuItem startIcon={<HomeIcon />}>Home</MenuItem>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar />
              <Stack>
                <Typography variant="body1">Siam Islam</Typography>
                <Link href="mailto:siamislam1603@gmail.com" color="inherit" variant="body2">
                  siamislam1603@gmail.com
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Offset />
      <Container sx={{py: 3}}>
        <Outlet />
      </Container>
      <Offset />
      <AppBar position="fixed" color="secondary" sx={{top: 'auto', bottom: 0}}>
        <Toolbar>
          <Typography align="center" flexGrow={1} variant="body1">
            &copy; Copyright 2023, All Rights Reserved by Siam Islam
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Layout
