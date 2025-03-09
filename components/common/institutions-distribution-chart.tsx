// components/charts/institutions-distribution-chart.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MunicipalityData {
  id: string;
  codeMunicipalities: string;
  name: string;
  totalInstituciones: number;
  totalSedes: number;
}

export function InstitutionsDistributionChart() {
  const [data, setData] = useState<MunicipalityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener datos de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/meta/municipalities");
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los datos del gráfico");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar municipios con totalInstituciones > 0, ordenar y limitar a los 10 principales
  const filteredData = data
    .filter((municipality) => municipality.totalInstituciones > 0)
    .sort((a, b) => b.totalInstituciones - a.totalInstituciones)
    .slice(0, 10); // Mostrar solo los 10 municipios con más instituciones

  // Preparar los datos para el gráfico
  const chartData = {
    labels: filteredData.map((municipality) => municipality.name), // Nombres de los municipios
    datasets: [
      {
        label: "Total de Instituciones",
        data: filteredData.map((municipality) => municipality.totalInstituciones), // Número de instituciones
        backgroundColor: filteredData.map((_, index) => {
          const colors = [
            "#7e42f5", // Púrpura
            "#a78bfa", // Púrpura más claro
            "#e85241", // Rojo
            "#f87171", // Rojo más claro
            "#faba4b", // Amarillo
            "#fcd34d", // Amarillo más claro
          ];
          return colors[index % colors.length];
        }),
        borderColor: filteredData.map((_, index) => {
          const colors = [
            "#7e42f5",
            "#a78bfa",
            "#e85241",
            "#f87171",
            "#faba4b",
            "#fcd34d",
          ];
          return colors[index % colors.length];
        }),
        borderWidth: 1,
        borderRadius: 8, // Bordes redondeados para las barras
        barThickness: 25, // Ancho de las barras ajustado
      },
    ],
  };

  // Configuración del gráfico
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Ocultar la leyenda estática
      },
      tooltip: {
        backgroundColor: "#333",
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 6,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
          title: (context) => filteredData[context[0].dataIndex].name, // Mostrar el nombre completo en el tooltip
        },
      },
    },
    scales: {
      x: {
        type: "category",
        ticks: {
          autoSkip: true, // Permitir que Chart.js omita etiquetas si se superponen
          maxRotation: 45, // Rotación moderada para legibilidad
          minRotation: 45,
          font: {
            size: 12,
            weight: "normal",
          },
          padding: 18,
          maxTicksLimit: 10, // Limitar el número de etiquetas visibles
        },
        grid: {
          display: false, // Ocultar líneas de cuadrícula en el eje X
        },
        title: {
          display: true,
          text: "Municipios (Top 10)",
          font: {
            size: 16,
            weight: "bold",
          },
          color: "#333",
          padding: 44,
        },
      },
      y: {
        type: "linear",
        beginAtZero: true,
        ticks: {
          stepSize: 5,
          font: {
            size: 12,
            weight: "normal",
          },
          padding: 10,
        },
        grid: {
          color: "#e5e7eb",
        },
        title: {
          display: true,
          text: "Número de Instituciones",
          font: {
            size: 16,
            weight: "bold",
          },
          color: "#333",
          padding: 20,
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    },
  };

  if (loading) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        <p className="text-lg">Cargando gráfico...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
}