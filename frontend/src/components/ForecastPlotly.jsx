import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

export default function ForecastPlotly({ graph }) {
  const plotRef = useRef(null);

  useEffect(() => {
    if (!graph) return;

    Plotly.react(
      plotRef.current,
      graph.data,
      graph.layout,
      {
        responsive: true,
        displaylogo: false,
        displayModeBar: true,
        modeBarButtonsToKeep: ['toImage', 'zoom2d', 'pan2d', 'resetScale2d'],
      }
    );
  }, [graph]);

  return (
    <div
      ref={plotRef}
      className="plot-wrapper"
      style={{ width: '100%', height: '100%', position: 'relative' }}
    />
  );
}
