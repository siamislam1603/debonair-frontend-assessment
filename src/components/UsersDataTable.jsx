import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const gridStyle = { minHeight: 550 };

const UsersDataTable = ({ usersList, children }) => {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setDataSource(usersList);
  }, [usersList]);
  const [gridRef, setGridRef] = useState(null);
  const [searchText, setSearchText] = useState("");
  const searchTextRef = useRef(searchText);
  searchTextRef.current = searchText;
  const render = useCallback(({ value }) => {
    const lowerSearchText = searchTextRef.current.toLowerCase();
    if (!lowerSearchText) {
      return value;
    }

    const str = value + "";
    const v = str.toLowerCase();
    const index = v.indexOf(lowerSearchText);

    if (index === -1) {
      return value;
    }
    return [
      <span key="before">{str.slice(0, index)}</span>,
      <span key="match" style={{ background: "yellow", fontWeight: "bold" }}>
        {str.slice(index, index + lowerSearchText.length)}
      </span>,
      <span key="after">{str.slice(index + lowerSearchText.length)}</span>,
    ];
  }, []);

  const shouldComponentUpdate = () => true;
  const defaultColumns = [
    {
      name: "firstName",
      header: "First Name",
      minWidth: 150,
      defaultFlex: 1,
      render,
      shouldComponentUpdate,
    },
    {
      name: "lastName",
      header: "Last Name",
      maxWidth: 1000,
      defaultFlex: 1,
      render,
      shouldComponentUpdate,
    },
    {
      name: "disvision",
      header: "Division",
      maxWidth: 1000,
      defaultFlex: 1,
      render,
      shouldComponentUpdate,
    },
    {
      name: "district",
      header: "District",
      maxWidth: 1000,
      defaultFlex: 1,
      render,
      shouldComponentUpdate,
    },
    {
      name: "empID",
      header: "Details",
      maxWidth: 1000,
      defaultFlex: 1,
      render: ({ value }) => (
        <Stack direction="row" justifyContent="center">
          <Button
            endIcon={<ChevronRightIcon />}
            onClick={() => navigate(`/users/${value}`)}
          >
            See Details
          </Button>
        </Stack>
      ),
      shouldComponentUpdate,
    },
  ];
  const [columns] = useState(defaultColumns);
  const defaultFilterValue = defaultColumns.map((col) => {
    return {
      name: col.name,
      operator: "startsWith",
      type: "string",
      value: "",
    };
  });
  const onSearchChange = ({ target: { value } }) => {
    const visibleColumns = gridRef.current.visibleColumns;

    setSearchText(value);

    const newDataSource = usersList.filter((p) => {
      return visibleColumns.reduce((acc, col) => {
        const v = (p[col.id] + "").toLowerCase(); // get string value
        return acc || v.indexOf(value.toLowerCase()) != -1; // make the search case insensitive
      }, false);
    });

    setDataSource(newDataSource);
  };
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems='flex-end'
        marginY={3}
        spacing={2}
        flexWrap="wrap"
        useFlexGap 
      >
        <TextField
          label="Search Users"
          variant="standard"
          onChange={onSearchChange}
        />
        {children}
      </Stack>
      <ReactDataGrid
        onReady={setGridRef}
        idProperty="empID"
        columnMinWidth={150}
        columns={columns}
        dataSource={dataSource}
        style={gridStyle}
        enableFiltering={true}
        defaultFilterValue={defaultFilterValue}
      />
    </Box>
  );
};

export default UsersDataTable;
