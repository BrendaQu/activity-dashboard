# WELCOME

Welcome to the Peaksware Front End Code Test!

We want you to build a small dashboard application using the data in the `data` directory.

# DESIGN

Designs is totally up to you, we want you to provide the best you can.

# EXISTING CODE

To help you get started, we've included some code and infrastructure:

- React using [Vite](https://vitejs.dev/)
- [MUI](https://mui.com/) for the UI components
- TypeScript setup
- SCSS for styling
- A `data` directory with a JSON file containing the chart data you will use.
  - [Recharts](https://recharts.org/en-US/) is already installed and set up for you to use.

Use your own best judgment for the structure of directories, files, and code.

# GRAPHING

Create a page that displays [Line charts](https://recharts.org/en-US/api/LineChart) of the data in the JSON file. We expect to see graphs for at least the following:

- Heart Rate
- Power
- Speed
- Cadence
- Elevation
- Temperature

The charts above are the minimum, but there is more data, so more charts can be added. Also, please add the following features:

- Minimum, maximum and average values for each graph
- Create an x-axis that shows the time (Duration) of the data
- Connect all graphs so when the user hovers over a point on one graph, the corresponding points on the other graphs are highlighted
- A menu to show/hide each graph
- Bonus: A way to re-arrange the graphs on the page
- Note: Please use your creativity to add whatever else you think would be useful to the end user to bring more insights into the data.

# GETTING STARTED

Start by installing the npm dependencies:

### `npm install`

Then launch the project by running:

### `npm run dev`

Run the app in the development mode.
Review the link provided on the console to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

# STANDARDS FOR QUALITY

At a minimum, we expect your submission to include:

- High readability
- Consistent formatting with a high level of attention to detail
- Well named variables, functions, classes, directories, and files
- Clean separation of concerns
- Concern for reusability and deduplication

We will also review your submission for:

- Design and interaction quality

# SUBMISSION

If you have any questions on the code or what is being asked,
please don't hesitate to email us.

Please submit your completed test as a zip file or using a private repo.

# SUBMISSION NOTES - Brenda Q

- Show/Hide Graph dropdown checkbox filter, toggles on and off graphs
- To rearrange the graphs, toggle on the left and right arrows by the graphs
- Data Density filter, controls the amount of data points to display on the graph
- Min, Max, Avg are displayed below the graphs
- Default graphs (Heart Rate, Power, Speed, Cadencem Elevation, Temperature) are shown. But more graphs can be toggled on.
