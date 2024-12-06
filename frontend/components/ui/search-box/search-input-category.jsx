import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
// LOCAL CUSTOM COMPONENTS

//import SearchResult from "./components/search-result";
//import CategoryDropdown from "./components/category-dropdown"; 
// LOCAL CUSTOM HOOKS

//import useSearch from "./hooks/use-search"; 
// CUSTOM ICON COMPONENT

//import Search from "@/theme/icons/Search";
import { SearchIcon } from '@/theme/icons'

export default function SearchInputWithCategory() {
  /*
  const {
    categoryTitle,
    parentRef,
    resultList,
    handleCategoryChange,
    handleSearch
  } = useSearch();
  */

  const INPUT_PROPS = {
    sx: {
      //border: 0,
      height: 44,
      padding: 0,
      overflow: "hidden",
      backgroundColor: "grey.200",
      "& .MuiOutlinedInput-notchedOutline": {
        //border: 0
      }
    },
    startAdornment: <Box mr={2} px={2} display="grid" alignItems="center" justifyContent="center" borderRight="1px solid" borderColor="grey.400">
      <SearchIcon sx={{ color: "grey.600" }} />
    </Box>,
    //endAdornment: <CategoryDropdown title={categoryTitle} handleChange={handleCategoryChange} />
  }
  return <Box component="form" action="/search" position="relative" flex="1 1 0" maxWidth="670px" mx="auto" {...{
    //ref: parentRef
  }}>
    <TextField name="q" fullWidth variant="outlined" placeholder="Искать..." /*onChange={handleSearch}*/ InputProps={INPUT_PROPS} />

    {
      /* SHOW SEARCH RESULT LIST */
    }
    {/*resultList.length > 0 ? <SearchResult results={resultList} /> : null*/}
  </Box>
}