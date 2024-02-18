import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent } from "@mui/material";
import axios from "axios";

const Dashboard: React.FC = () => {
  const [diskUsage, setDiskUsage] = useState<number | undefined>(undefined);
  const [cpuUsage, setCpuUsage] = useState<number | undefined>(undefined);

  useEffect(() => {
    // TODO: 環境に合わせて変更が必要
    const apiUrl = "http://127.0.0.1:5000/api/server-status";

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setDiskUsage(response.data.diskUsage);
        setCpuUsage(response.data.cpuUsage);
      } catch (error) {
        console.error("Error fetching server status:", error);
        // TODO: ユーザーにエラーメッセージを表示
      }
    };

    // fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Typography variant="h4">Server Status</Typography>
      <Card sx={{ width: 200, margin: 1 }}>
        <CardContent>
          <Typography variant="h6">Disk Usage</Typography>
          <Typography variant="body1">
            {diskUsage !== undefined ? `${diskUsage}%` : "Loading..."}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ width: 200, margin: 1 }}>
        <CardContent>
          <Typography variant="h6">CPU Usage</Typography>
          <Typography variant="body1">
            {cpuUsage !== undefined ? `${cpuUsage}%` : "Loading..."}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
