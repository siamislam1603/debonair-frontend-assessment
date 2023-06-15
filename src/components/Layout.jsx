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
const Offset = styled('div')(({theme}) => theme.mixins.toolbar)
const Layout = () => {
  return (
    <>
      <AppBar position="fixed" elevation={0} color="secondary">
        <Toolbar>
          <Typography variant="h6" flexGrow={1} color="primary">
            DEMO APP
          </Typography>
          <Stack spacing={4} direction="row" alignItems="center">
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
