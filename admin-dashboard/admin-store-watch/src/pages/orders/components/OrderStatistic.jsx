import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const OrderStatistic = () => {
  const [pipelineData, setPipelineData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders");
        const data = await res.json();

        const statusCounts = data.reduce((acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1;
          return acc;
        }, {});

        const totalOrders = data.length;

        const stages = [
          { stage: 'Pending', key: 'pending', color: '#3182ce' },
          { stage: 'Processing', key: 'processing', color: '#d69e2e' },
          { stage: 'Shipped', key: 'shipped', color: '#38a169' },
          { stage: 'Delivered', key: 'delivered', color: '#1a365d' },
        ];

        const formattedData = stages.map(s => ({
          stage: s.stage,
          orders: statusCounts[s.key] || 0,
          percentage: totalOrders > 0 ? ((statusCounts[s.key] || 0) / totalOrders * 100).toFixed(1) : 0,
          color: s.color,
        }));

        setPipelineData(formattedData);
      } catch (err) {
        console.error("Erreur fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-popover-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            Orders: <span className="font-medium text-popover-foreground">{data.orders}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Conversion: <span className="font-medium text-popover-foreground">{data.percentage}%</span>
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
          <span>Dernière update: just now</span>
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
        {pipelineData.map((stage, index) => (
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
