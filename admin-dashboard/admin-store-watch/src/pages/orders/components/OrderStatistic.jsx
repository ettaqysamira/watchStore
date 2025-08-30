import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const OrderStatistic = ({ filters }) => {
  const [pipelineData, setPipelineData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchOrders = async () => {
    try {
      let url = "http://localhost:5000/api/orders";

      const query = [];
      if (filters?.status && filters.status !== "all") query.push(`status=${filters.status}`);
      if (filters?.priority && filters.priority !== "all") query.push(`priority=${filters.priority}`);
      if (filters?.dateRange && filters.dateRange !== "all") query.push(`dateRange=${filters.dateRange}`);
      if (filters?.fulfillmentCenter && filters.fulfillmentCenter !== "all") query.push(`center=${filters.fulfillmentCenter}`);

      if (query.length > 0) {
        url += "?" + query.join("&");
      }

      const res = await fetch(url);
      const data = await res.json();

      const statusCounts = data.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {});

      const totalOrders = data.length;

      const stages = [
        { stage: 'Pending', key: 'pending', color: '#3182ce' },
        { stage: 'Processing', key: 'processing', color: '#d69e2e' },
        { stage: 'Shipped', key: 'shipped', color: '#805AD5' },
        { stage: 'Delivered', key: 'delivered', color: '#38a169' },
      ];

      const formattedData = stages.map(s => ({
        stage: s.stage,
        orders: statusCounts[s.key] || 0,
        percentage: totalOrders > 0 ? ((statusCounts[s.key] || 0) / totalOrders * 100).toFixed(1) : 0,
        color: s.color,
      }));

      setPipelineData(formattedData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Erreur fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders(); 

    const interval = setInterval(() => {
      fetchOrders(); 
    }, 60000);

    return () => clearInterval(interval);
  }, [filters]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-popover-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            Orders: <span className="font-medium text-popover-foreground">{data.orders}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Statistiques des commandes</h3>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>Dernière update: {lastUpdated.toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={pipelineData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="stage" 
              tick={{ fill: '#718096', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              tick={{ fill: '#718096', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="orders" radius={[4, 4, 0, 0]}>
              {pipelineData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {pipelineData.map((stage) => (
          <div key={stage.stage} className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div 
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: stage.color }}
              ></div>
              <span className="text-sm font-medium text-foreground">{stage.stage}</span>
            </div>
            <p className="text-lg font-bold text-foreground">{stage.orders}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatistic;
