import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Typography, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

const BreadcrumbLink = styled(NavLink)`
  color: #757575;
  opacity: 0.8;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const BreadcrumbsMenu = ({ items }) => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{pb:1, borderBottom:'1px solid #eee',mb:2}}
    >
      {items.slice(0, -1).map((item, i) => (
        <BreadcrumbLink key={i} to={item.link}>
          {item.title}
        </BreadcrumbLink>
      ))}
      <Typography color="text.primary">
        {items.slice(-1)[0].title}
      </Typography>
    </Breadcrumbs>
  );
};

export default BreadcrumbsMenu;
