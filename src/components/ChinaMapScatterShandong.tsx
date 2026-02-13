"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export type City = {
  name: string;
  coords: [number, number]; // [lng, lat]
};

// 山东坐标
const SHANDONG_COORDS: [number, number] = [117.0009, 36.6758];

export default function ChinaFlylineRippleMap({
  cities = [],
  className,
}: {
  cities: City[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dom = ref.current!;
    const chart = echarts.init(dom);

    // 响应式，根据屏幕自动重绘
    const resize = () => chart.resize();
    window.addEventListener("resize", resize);

    fetch("/maps/china.json")
      .then((res) => res.json())
      .then((chinaJson) => {
        echarts.registerMap("china", chinaJson);

        // ✨ 1. 飞线数据
        const flyLines = cities.map((c) => ({
          coords: [SHANDONG_COORDS, c.coords],
        }));

        // ✨ 2. 散点数据（带脉冲）
        const scatterPoints = cities.map((c) => ({
          name: c.name,
          value: [...c.coords, 1],
        }));

        // ✨ 3. 山东中心点
        const shandongPoint = [
          {
            name: "山东",
            value: [...SHANDONG_COORDS, 1],
          },
        ];

        chart.setOption({
          geo: {
            map: "china",
            roam: false,
            zoom: 1.22,
            itemStyle: {
              areaColor: "#f3f4f6",
              borderColor: "#d1d5db",
            },
            emphasis: {
              itemStyle: {
                areaColor: "#3b82f6",
              },
            },
            blur: {
              itemStyle: {
                areaColor: "#e5e7eb",
              },
            },
            label: {
              show: true,
              textBorderColor: "#fff",
              textBorderWidth: 2,
            },
          },

          series: [
            // ① 波纹散点（山东中心）
            {
              type: "effectScatter",
              coordinateSystem: "geo",
              zlevel: 3,
              rippleEffect: {
                scale: 5,
                brushType: "stroke",
              },
              symbolSize: 14,
              itemStyle: {
                color: "#3b82f6", // 主色
              },
              data: shandongPoint,
            },

            // ② 波纹散点（全国城市）
            {
              type: "effectScatter",
              coordinateSystem: "geo",
              zlevel: 2,
              rippleEffect: {
                scale: 6,
                brushType: "stroke",
              },
              symbolSize: 10,
              itemStyle: {
                color: "#60a5fa",
              },
              data: scatterPoints,
            },

            // ③ 飞线（山东 → 城市）
            {
              type: "lines",
              zlevel: 1,
              effect: {
                show: true,
                period: 3,
                trailLength: 0.4,
                symbol: "arrow",
                symbolSize: 6,
              },
              lineStyle: {
                color: "#3b82f6",
                width: 1.6,
                opacity: 0.7,
                curveness: 0.25,
              },
              data: flyLines,
            },
          ],
        });
      });

    return () => {
      window.removeEventListener("resize", resize);
      chart.dispose();
    };
  }, [cities]);

  return <div ref={ref} className={`h-[650px] w-full ${className ?? ""}`} />;
}
