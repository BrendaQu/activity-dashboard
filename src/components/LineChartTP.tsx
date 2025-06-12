import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Label,
} from "recharts";
import "./LineChartTP.scss";
import { IconButton, Tooltip as MuiTooltip } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import type { DataItem } from "../types";

/**
 * LineChartTP component displays line chart with stats (min, max, avg) and arrows to rearrange charts
 */
type LineChartTPProps = {
  graphName: string; // Graph Title
  lineData: DataItem[]; // graph data points
  minimum: number; // Minimum of data
  maximum: number; // Maximum of data
  average: number; // Average of data
  isVisible: boolean; // Boolean value to display or hide graph
  unit: string; // Unit of data measurement
  index: number; // Index of component, used to idenity component order for rearranging
  onEmitMove: (index: number, direction: number) => void; // Handle rearranging component
  visibilityCount: number; // Number of visible graph components, used to hide last move right arrow (for rearranging graphs logic)
};

const LineChartTP = ({
  graphName,
  lineData,
  minimum,
  maximum,
  average,
  isVisible,
  unit,
  index,
  onEmitMove,
  visibilityCount,
}: LineChartTPProps) => {
  /**
   * Handles moving graph to left
   * @param index - current index of graph in array
   */
  const handleMoveLeft = (index: number) => {
    onEmitMove(index, -1);
  };
  /**
   * Handles moving graph to right
   * @param index - current index of graph in array
   */
  const handleMoveRight = (index: number) => {
    onEmitMove(index, 1);
  };
  return (
    <>
      {isVisible ? (
        <div className="line-chart-wrapper">
          <div className="line-chart-title">{graphName}</div>
          <div className="line-chart-item">
            {index !== 0 ? (
              <MuiTooltip title="Move Left">
                <IconButton onClick={() => handleMoveLeft(index)}>
                  <ArrowLeftIcon
                    sx={{
                      height: "32px", // Or a percentage
                      width: "32px", // Or a percentage
                    }}
                  />
                </IconButton>
              </MuiTooltip>
            ) : null}
            <LineChart
              key={lineData.length}
              width={500}
              height={300}
              data={lineData}
              margin={{ top: 5, right: 10, left: 10, bottom: 10 }}
              syncId="mySyncGroup"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ angle: -25, fontSize: 11 } as any}>
                <Label
                  value="Duration (time)"
                  offset={-8}
                  position="insideBottom"
                  fontSize={14}
                />
              </XAxis>
              <YAxis
                type="number"
                domain={["dataMin - 5", "dataMax + 5"]}
                label={{
                  value: `${unit ? unit : ""}`,
                  angle: -90,
                  position: "insideLeft",
                  fontSize: 14,
                }}
                tick={{ fontSize: 11 }}
              ></YAxis>
              <Tooltip
                labelFormatter={(label) => `Time: ${label}`}
                formatter={(value) => [`${value} ${unit ? unit : ""}`]}
              />
              <Line type="monotone" dataKey="measurement" stroke="#3177ff" />
            </LineChart>
            {visibilityCount - 1 !== index ? (
              <MuiTooltip title="Move Right">
                <IconButton onClick={() => handleMoveRight(index)}>
                  <ArrowRightIcon
                    sx={{
                      height: "32px", // Or a percentage
                      width: "32px", // Or a percentage
                    }}
                  />
                </IconButton>
              </MuiTooltip>
            ) : null}
          </div>
          <div className="stats-card">
            <div>
              <b>Min: </b> {minimum} {unit}
            </div>
            <div>
              <b>Max: </b> {maximum} {unit}
            </div>
            <div>
              <b>Avg: </b> {average} {unit}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LineChartTP;
