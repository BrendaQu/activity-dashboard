import { useState, useEffect } from "react";
import "./App.scss";
import data from "../data/chartData.json";
import LineChartTP from "./components/LineChartTP";
import ChartMenu from "./components/ChartMenu";
import type { DataDensity, DataItem } from "./types";

function App() {
  // Default Graphs to display
  const DefaultGraphs = [
    "Heart Rate",
    "Power",
    "Speed",
    "Cadence",
    "Altitude",
    "Temperature",
  ];

  const [dataDensity, setDataDensity] = useState({
    densityType: "Full",
    densityValue: 1,
  });

  /**
   * On change for Data Density filter, set new value
   * @param density - new density value to set
   */
  const onDensityChange = (density: DataDensity) => {
    setDataDensity(density);
  };

  type GraphTypeList = { [key: string]: GraphTypeItem };

  type GraphTypeItem = {
    id: string;
    displayName: string;
    visibility: boolean;
    unit: string;
    data: DataItem[];
  };

  const GraphsData = {} as GraphTypeList;

  // Loop through data.dataElement to populate info fields for GraphData (id, displayName, unit, etc.)
  data.dataElements.forEach((item: any) => {
    if (item.identifier !== "time") {
      GraphsData[item.identifier] = {
        id: item.identifier,
        displayName:
          item.identifier !== "Altitude"
            ? item.identifier.replace(/([A-Z])/g, " $1").trim()
            : "Elevation", // Prompt specify "Elevation", so replacing "Altitude" with "Elevation"
        visibility: DefaultGraphs.includes(item.identifier) ? true : false,
        unit: item.unit,
        data: [],
      };
    }
  });

  //Loop through data.data to populate data field for GraphData
  data.data.forEach((item: any) => {
    const time = item.time;
    Object.keys(item).forEach((key) => {
      if (key === "time") return;
      GraphsData[key].data.push({
        time,
        measurement: parseInt(item[key]),
      });
    });
  });

  const [graphArray, setGraphArray] = useState(Object.values(GraphsData));

  /**
   * On selection graph change from filter, update graphArray visibility field from graphItems list
   * @param graphItems - list of graphs to display on change
   */
  const onSelectionGraphChange = (graphItems: string[]) => {
    const newGraphArray = graphArray.map((item: GraphTypeItem) => {
      if (graphItems.includes(item.id)) {
        return { ...item, visibility: true };
      } else {
        return { ...item, visibility: false };
      }
    });

    const sortByVisibility = [
      ...newGraphArray.filter((item: GraphTypeItem) => item.visibility),
      ...newGraphArray.filter((item: GraphTypeItem) => !item.visibility),
    ];
    setGraphArray(sortByVisibility);
  };

  /**
   * Calculate min from data
   * @param data - array type DataItem, to calculate min
   * @returns minimum number
   */
  const getMin = (data: DataItem[]) => {
    const min = data.reduce((acc: number, curr: DataItem) => {
      return curr.measurement < acc ? curr.measurement : acc;
    }, Infinity);
    return min;
  };
  /**
   * Calculate max from data
   * @param data - array type DataItem, to calculate max
   * @returns  - maximum number
   */
  const getMax = (data: DataItem[]) => {
    const min = data.reduce((acc: number, curr: DataItem) => {
      return curr.measurement > acc ? curr.measurement : acc;
    }, 0);
    return min;
  };
  /**
   * Calculate avergae from data
   * @param data - array type DataItem, to calculate avg
   * @returns - average float
   */
  const getAvg = (data: DataItem[]) => {
    const total = data.reduce(
      (sum: number, curr: DataItem) => sum + curr.measurement,
      0
    );
    return parseFloat((total / data.length).toFixed(2));
  };

  /**
   * Function to rearrange graph order
   * @param graphArr - current graphArray
   * @param index - current index of element
   * @param direction - number -1 for left and +1 for right
   * @returns new rearranged graph array
   */
  const moveItem = (
    graphArr: GraphTypeItem[],
    index: number,
    direction: number
  ) => {
    const newGraphArr = [...graphArr];
    const [moveItem] = newGraphArr.splice(index, 1);
    newGraphArr.splice(index + direction, 0, moveItem);
    return newGraphArr;
  };

  /**
   * on emit set the new rearranged graph array
   * @param index - current index of graph component
   * @param direction - number -1 for left and +1 for right
   */
  const onEmitMoveChange = (index: number, direction: number) => {
    setGraphArray(moveItem(graphArray, index, direction));
  };
  /**
   * Count of visible graphs on page, used for rearranging graph logic
   * @returns returns count of visible graphs on page
   */
  const visibilityCount = () => {
    let countVisible = 0;
    graphArray.forEach((item) => {
      if (item.visibility) {
        countVisible++;
      }
    });
    return countVisible;
  };

  // Sort all the visible graphs at the beginning of the array, for rearranging purposes
  useEffect(() => {
    setGraphArray((prev) => [
      ...prev.filter((item) => item.visibility),
      ...prev.filter((item) => !item.visibility),
    ]);
  }, []);

  return (
    <>
      <div className="page-heading">
        <h2 className="heading-text">TrainingPeaks Front End Assessment</h2>
      </div>
      <ChartMenu
        menu={graphArray}
        currentDataDensity={dataDensity}
        onEmitGraphs={onSelectionGraphChange}
        onEmitDensity={onDensityChange}
      />
      <div className="line-display-wrapper">
        {graphArray.map((item: GraphTypeItem, index: number) => {
          return (
            <LineChartTP
              key={item.id}
              graphName={item.displayName}
              lineData={item.data.filter((_: any, index: number) => {
                if (index === 0 || index === item.data.length - 1) return true;
                return index % dataDensity.densityValue === 0;
              })}
              unit={item.unit}
              minimum={getMin(item.data)}
              maximum={getMax(item.data)}
              average={getAvg(item.data)}
              isVisible={item.visibility}
              index={index}
              onEmitMove={onEmitMoveChange}
              visibilityCount={visibilityCount()}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
