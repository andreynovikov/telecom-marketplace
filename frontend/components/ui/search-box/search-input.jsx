import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"; 
// LOCAL CUSTOM HOOKS

//import useSearch from "./hooks/use-search"; 
// LOCAL CUSTOM COMPONENT

//import SearchResult from "./components/search-result"; 
// STYLED COMPONENT

import { SearchIcon } from '@/theme/icons'

export default function SearchInput() {
  /*
  const {
    handleSearch,
    parentRef,
    resultList
  } = useSearch();
   */
  const INPUT_PROPS = {
    sx: {
      border: 0,
      height: 44,
      paddingRight: 0,
      overflow: "hidden",
      backgroundColor: "grey.200",
      "& .MuiOutlinedInput-notchedOutline": {
        border: 0
      }
    },
    endAdornment: <Button color="primary" disableElevation variant="contained" sx={{
      px: "3rem",
      height: "100%",
      borderRadius: "0 4px 4px 0"
    }}>
        Искать
      </Button>,
    startAdornment: <SearchIcon sx={{ color: "grey.600", mr: 1 }} fontSize="small" />
  };
  return <Box component="form" action="/search" position="relative" flex="1 1 0" maxWidth="670px" mx="auto" {...{
    //ref: parentRef
  }}>
      <TextField name="q" fullWidth variant="outlined" placeholder="Искать..." /*onChange={handleSearch}*/ InputProps={INPUT_PROPS} />

      {
      /* SHOW SEARCH RESULT LIST */
    }
      {/*resultList.length > 0 ? <SearchResult results={resultList} /> : null*/}
    </Box>;
}