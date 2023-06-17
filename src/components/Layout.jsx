import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
const MenuItem = styled(Button)`
  flex-direction: column;
  & span {
    margin-right: 0;
    margin-left: 0;
  }
`;
const LinkButton = styled(IconButton)(({theme})=>`
  background:white;
  border-radius:12px;
  color:${theme.palette.primary.light};
  border:1px solid ${theme.palette.secondary.dark}
`);
const Logo = styled("img")`
  height: 58px;
  object-fit: contain;
  object-position: center;
`;
const externalLinks = [
  { href: "mailto:siamislam1603@gmail.com", icon: <EmailIcon /> },
  { href: "https://github.com/siamislam1603", icon: <GitHubIcon /> },
  { href: "https://www.linkedin.com/in/siam-islam-161915143/", icon: <LinkedInIcon /> },
];
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
const Layout = () => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar position="fixed" elevation={0} color="secondary">
        <Toolbar>
          <Logo
            src="https://debonairgroupbd.com/wp-content/uploads/2022/02/logo-1.png"
            alt=""
          />
          <Stack
            flexGrow={1}
            justifyContent="end"
            spacing={1}
            direction="row"
            alignItems="center"
          >
            <MenuItem startIcon={<HomeIcon />} onClick={() => navigate("/")}>
              Home
            </MenuItem>
            {externalLinks.map((link, i) => (
              <LinkButton key={i} href={link.href} target="_blank">
                {link.icon}
              </LinkButton>
            ))}
          </Stack>
        </Toolbar>
      </AppBar>
      <Offset />
      <Container sx={{ py: 3 }}>
        <Outlet />
      </Container>
      <AppBar
        position="static"
        color="secondary"
        sx={{ top: "auto", bottom: 0 }}
      >
        <Toolbar>
          <Typography align="center" flexGrow={1} variant="body1">
            &copy; Copyright 2023, All Rights Reserved by Siam Islam
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Layout;
