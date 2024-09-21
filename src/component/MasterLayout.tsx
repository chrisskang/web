import { Responsive as ResponsiveGridLayout } from "react-grid-layout";

export const MasterLayout = () => {
  const layoutLG = [
    { i: "a", x: 0, y: 0, w: 4, h: 4, static: true },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
  ];
  const layoutMD = [
    { i: "a", x: 0, y: 0, w: 4, h: 4, static: true },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
  ];

  const layouts = { lg: layoutLG, md: layoutMD };
  const colors = ["bg-red-500", "bg-green-500", "bg-blue-500"];

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={30}
      width={1200}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
    >
      {layouts.lg.map((item, index) => (
        <div
          key={item.i}
          className={`${
            colors[index % colors.length]
          } p-4 rounded shadow-md flex items-center justify-center text-white font-bold`}
        >
          {item.i}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};
