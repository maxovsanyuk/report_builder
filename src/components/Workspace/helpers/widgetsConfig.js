const DEFAULT_WG_WEIGHT = 200;
const DEFAULT_WG_HEIGHT = 200;
const DEFAULT_WG_POSITION_TOP = 10;
const DEFAULT_WG_POSITION_LEFT = 10;

export const widgetsConfig = [
  {
    title: "Basic items",
    widgetsList: [
      { name: "text" },
      {
        name: "image",
        basicSettings: { name: "Source", value: "" },
        linkTo: null,
        appearence: { border: "solid" },
        size: {
          sizing: { width: DEFAULT_WG_WEIGHT, height: DEFAULT_WG_HEIGHT },
        },
        position: {
          top: DEFAULT_WG_POSITION_TOP,
          left: DEFAULT_WG_POSITION_LEFT,
        },
        visibility: { visible: true },
        miscellaneous: { tooltip: [] },
      },
      { name: "line" },
      { name: "rectangle" },
    ],
  },
  {
    title: "Comparison",
    widgetsList: [
      { name: "column" },
      { name: "bar" },
      { name: "stacked-column" },
      { name: "stacked-bar" },
      { name: "stacked-column-100" },
      { name: "stacked-bar-100" },
    ],
  },
  {
    title: "Data regions",
    widgetsList: [{ name: "table" }, { name: "list" }],
  },

  {
    title: "KPI",
    widgetsList: [
      { name: "data-bar" },
      { name: "sparkline" },
      { name: "indicator" },
    ],
  },

  {
    title: "Deviation",
    widgetsList: [{ name: "radial-gauge" }, { name: "linear-gauge" }],
  },

  {
    title: "Proportion",
    widgetsList: [
      { name: "pie" },
      { name: "exploded-pie" },
      { name: "doughnut" },
      { name: "pyramid" },
      { name: "funnel" },
    ],
  },

  {
    title: "Distribution",
    widgetsList: [
      { name: "area" },
      { name: "smooth-area" },
      { name: "stacked-area" },
      { name: "stacked-area-100" },
      { name: "line-d" },
      { name: "smooth-line" },
      { name: "stepped-line" },
      { name: "line-with-markers" },
      { name: "smoothLine-with-markers" },
      { name: "bubble" },
      { name: "polar" },
      { name: "scatter" },
      { name: "radar" },
    ],
  },
  {
    title: "SubReports",
    widgetsList: [{ name: "subReports" }],
  },

  {
    title: "Barcodes",
    widgetsList: [{ name: "1D-Barcode" }, { name: "QR-Barcode" }],
  },
];
