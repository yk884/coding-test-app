import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartContainerProps = {
  params: any;
  chartData: any;
};

// パラメータごとの対応するテキストをマッピング（タイトル部分で使用）
const labelsMap: Record<string, Record<string, string>> = {
  classification: {
    "1": "進学",
    "2": "就職",
  },
  matter: {
    "0": "地元",
    "1": "流出",
    "2": "流入",
    "3": "純流入",
  },
  displayType: {
    "10": "すべての大学",
    "11": "大学進学",
    "12": "短期大学進学",
    "20": "就職",
  },
  gender: {
    "0": "総数",
    "1": "男性",
    "2": "女性",
  },
};

const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: window.screen.width > 414,
        text: "人数",
      },
    },
    x: {
      title: {
        display: window.screen.width > 414,
        text: "年",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
      position: "top" as "top",
    },
    tooltip: {
      enabled: true,
    },
  },
};

const ChartContainer: React.FC<ChartContainerProps> = ({
  params,
  chartData,
}) => {
  return (
    <div className="chartContainer">
      <h3>
        兵庫県の{labelsMap.classification[params.classification]}
        者数の推移（{labelsMap.matter[params.matter]}-
        {labelsMap.displayType[params.displayType]}-
        {labelsMap.gender[params.gender]}）
      </h3>
      <div className="chartRenderArea">
        <Line data={chartData} options={options} />
      </div>
      <p className="caption">出典：RESAS（地域経済分析システム）</p>
    </div>
  );
};

export default ChartContainer;
