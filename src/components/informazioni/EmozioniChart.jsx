import styled from "styled-components";
import EmozioniStatBox from "./EmozioniStatBox";

import React from "react";
import Heading from "../ui/Heading";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  ComposedChart,
  Line,
} from "recharts";
import { useUser } from "../login/useUser";

const StyledEmozioniChart = styled(EmozioniStatBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
  & .recharts-wrapper .recharts-legend-wrapper {
    padding: 8px 0;
  }
`;

const fakeData = [
  { tipoEmozione: "STUPORE", media: 5, voto: -1 },
  { tipoEmozione: "TENEREZZA", media: 3, voto: 5 },
  { tipoEmozione: "SOLLENITA", media: 2, voto: 1 },
  { tipoEmozione: "NOSTALGIA", media: 1, voto: 4 },
  { tipoEmozione: "CALMA", media: 4, voto: 2 },
  { tipoEmozione: "GIOIA", media: 4, voto: 3 },
  { tipoEmozione: "NERVOSISMO", media: 2, voto: 5 },
  { tipoEmozione: "TRISTEZZA", media: 1, voto: 3 },
];

function EmozioniChart({ emozioni }) {
  const { isAuthenticated } = useUser();

  const sortedEmotionsKeys = Object.keys(emozioni).sort();

  const data = sortedEmotionsKeys.map((key) => {
    const emozione = emozioni[key];
    return {
      tipoEmozione: emozione.tipoEmozione,
      media: emozione.media !== -1 ? emozione.media : 0,
      voto:
        isAuthenticated && emozione.voto !== -1
          ? emozione.voto
          : emozione.media !== -1
          ? emozione.media
          : 0,
    };
  });

  return (
    <StyledEmozioniChart>
      <Heading as={"h2"}>Emozioni</Heading>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="tipoEmozione"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={70}
          />
          <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
          <Tooltip />
          <Bar
            dataKey={isAuthenticated ? "voto" : "media"}
            barSize={20}
            fill="#8884d8"
          />
          {isAuthenticated && (
            <Line
              type="monotone"
              dataKey="media"
              stroke="#1f78b4"
              strokeWidth={2}
              dot={false}
            />
          )}
          <Legend wrapperStyle={{ position: "relative", bottom: 10 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </StyledEmozioniChart>
  );
}

export default EmozioniChart;
