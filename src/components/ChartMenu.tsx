import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Tooltip,
  type SelectChangeEvent,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import "./ChartMenu.scss";
import type { DataDensity } from "../types";

/**
 * ChatMenu displays filters to Show/Hide Graphs and Data Density
 */

type MenuItem = { id: string; displayName: string; visibility: boolean };

type DensityType = keyof typeof dataDensityOptions;

const dataDensityOptions = {
  Low: 30,
  Medium: 20,
  High: 10,
  Full: 1,
};

type ChartMenuProps = {
  menu: MenuItem[]; // Menu array for Show/Hide Graphs filter
  currentDataDensity: DataDensity; // Current Data Density for Data Density selection filter
  onEmitGraphs: (multiSelect: string[]) => void; // Emit changes in Show/Hide graph filter
  onEmitDensity: (density: DataDensity) => void; // Emit changes in Data Density filter
};

const ChartMenu = ({
  menu,
  currentDataDensity,
  onEmitGraphs,
  onEmitDensity,
}: ChartMenuProps) => {
  /**
   * handles the change event for Show/Hide Graph selection
   * @param event - The change event,  event.target.value will be an array of strings that shows multiple selections
   */
  const handleGraphChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    const multiSelect = typeof value === "string" ? value.split(",") : value;
    onEmitGraphs(multiSelect);
  };
  /**
   *hanles the change event for Data Density filter
   * @param event - change event, event.target.value will be a string that can be used as a key for dataDensityOption to get value
   */
  const handleDensityChange = (event: SelectChangeEvent) => {
    const emitValue = {
      densityType: event.target.value,
      densityValue: dataDensityOptions[event.target.value as DensityType],
    };
    onEmitDensity(emitValue);
  };
  return (
    <>
      <div className="chart-menu-wrapper">
        <div className="filter-icon">
          <FilterListIcon sx={{ color: "#3177ff" }} />
          <p>Filters</p>
        </div>
        <FormControl sx={{ m: 1, width: 500 }} size="small">
          <Tooltip title="Select Graph to Show or Hide">
            <InputLabel id="multiple-checkbox-label">
              Show/Hide Graphs
            </InputLabel>
          </Tooltip>
          <Select
            labelId="multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={menu
              .filter((item: MenuItem) => item.visibility)
              .map((item: MenuItem) => item.id)}
            onChange={(event: SelectChangeEvent<string[]>) =>
              handleGraphChange(event)
            }
            input={<OutlinedInput label="Show/Hide Graphs" />}
            renderValue={(selected: string[]) =>
              selected
                .map((id: string) => {
                  const item = menu.find((m) => m.id === id);
                  return item?.displayName || id;
                })
                .join(", ")
            }
          >
            {menu.map((item: MenuItem) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox checked={item.visibility} />
                <ListItemText primary={item.displayName} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ m: 1, minWidth: 100 }}>
          <FormControl fullWidth size="small">
            <Tooltip title="Select the amount of data points shown">
              <InputLabel id="data-density-label">Data Density </InputLabel>
            </Tooltip>
            <Select
              labelId="data-density-label"
              id="data-density"
              value={currentDataDensity.densityType}
              label="Data Density"
              onChange={(e: SelectChangeEvent) => handleDensityChange(e)}
            >
              {Object.keys(dataDensityOptions).map((key: string) => {
                return (
                  <MenuItem value={key} key={key}>
                    {key}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </div>
    </>
  );
};

export default ChartMenu;
