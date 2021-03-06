import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { fetchCPU } from "../../api/cpu";
import { toTime } from "../../utils/formatNumber";

/**
 * CPU 利用率
 */
const CPUUsageChart = () => {
  const [data, setData] = useState([] as any);

  useEffect(() => {
    fetchCPU("CPUUsage").then((res: any) => {
      const timestamps = res.DataPoints[0].Timestamps.slice(-10);
      const values = res.DataPoints[0].Values.slice(-10);
      const tmp = [];
      for (let i = 0; i < 10; i++) {
        tmp.push({
          name: toTime(timestamps[i]),
          value: values[i],
        });
      }
      setData(tmp);
    });
  }, []);

  return (
    <>
      <Box sx={{ p: 5 }}>
        <Typography variant="h5">CPU 利用率 (%)</Typography>
      </Box>
      <ResponsiveContainer width="95%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 50,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis unit="%" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#4885D7">
            <LabelList dataKey="value" position="top" />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default CPUUsageChart;
