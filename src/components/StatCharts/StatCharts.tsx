import React from "react";
import BigNumber from "bignumber.js";
import { hashesToGH } from "../formatters";
import { hexToNumber } from "@etclabscore/eserialize";
import { Grid } from "@material-ui/core";
import ChartCard from "../ChartCard";
import { VictoryLine, VictoryBar, VictoryChart } from "victory";
import { useTranslation } from "react-i18next";
import { Typography, Card, CardContent } from "@material-ui/core";
import getBlocks, { useBlockNumber } from "../../helpers";
import cn from "../../translations/cn";
import useEthRPCStore from "../../stores/useEthRPCStore";

const config = {
  blockTime: 15, // seconds
  blockHistoryLength: 100,
  chartHeight: 200,
  chartWidth: 400,
};

const blockMapGasUsed = (block: any) => {
  // console.log(new BigNumber(block.gasUsed).dividedBy(1000000))
  return {
    x: hexToNumber(block.number),
    y: new BigNumber(block.gasUsed).dividedBy(1000000),
  };
};

const blockMapUncles = (block: any) => {
  return {
    x: hexToNumber(block.number),
    y: block.uncles.length,
  };
};

const blockMapHashRate = (block: any) => {
  return {
    x: hexToNumber(block.number),
    y: hashesToGH(new BigNumber(block.difficulty, 16).dividedBy(config.blockTime)),
  };
};

const blockMapTransactionCount = (block: any) => {
  console.log(block.transactions.length)
  return {
    x: hexToNumber(block.number),
    y: block.transactions.length,
  };
};

interface IProps {
  blocks: any[];
  victoryTheme?: any;
}

const StatCharts: React.FC<IProps> = ({ blocks, victoryTheme }) => {
  console.log(blocks,'blocks in chart')
  const { t } = useTranslation();
  const [erpc] = useEthRPCStore();
  const [blockNumber] = useBlockNumber(erpc);
  const blockNum =  blockNumber ;
  const from = Math.max(blockNum ? blockNum : 0 - 99, 0);
  const to = blockNum;

  console.log(blockNumber)
  // React.useEffect(() => {
  //   if (!erpc) { return; }
  //   getBlocks(from, to, erpc).then((blcks) => {
  //     const txes = _.flatMap(blcks, "transactions");
  //     const filteredTxes = _.filter(txes, (tx: any) => {
  //       if (!tx) {
  //         return false;
  //       }
  //       return tx.to === address || tx.from === address;
  //     });
  //     const sortedTxes = _.sortBy(filteredTxes, (tx: any) => {
  //       return hexToNumber(tx.blockNumber);
  //     }).reverse();
  //     setTransactions(sortedTxes);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [from, to]);

  return (
    <Grid item container>
      {/* <Grid key="hashChart" item xs={12} md={6} lg={3}>
        <ChartCard title={t("Hash Rate")}>
          <VictoryChart height={config.chartHeight} width={config.chartWidth} theme={victoryTheme as any}>
            <VictoryLine data={blocks.map(blockMapHashRate)} />
          </VictoryChart>
        </ChartCard>
      </Grid> */}
      <Grid key="txChart" item xs={12} md={6} lg={6}>
        <ChartCard title={t("Total Transaction count")}>
          {/* <VictoryChart height={config.chartHeight} width={config.chartWidth} theme={victoryTheme as any}>
            <VictoryLine data={blocks.map(blockMapTransactionCount)} />
          </VictoryChart> */}
          <p>this is test</p>
        </ChartCard>
      </Grid>
      <Grid key="gasUsed" item xs={12} md={6} lg={6}>
        <ChartCard title={t("Gas Used")}>
          <VictoryChart height={config.chartHeight} width={config.chartWidth} theme={victoryTheme as any}>
            <VictoryLine data={blocks.map(blockMapGasUsed)} />
          </VictoryChart>
        </ChartCard>
      </Grid>
      {/* <Grid key="uncles" item xs={12} md={6} lg={3}>
        <ChartCard title={t("Uncles")}>
          <VictoryChart height={config.chartHeight} width={config.chartWidth} theme={victoryTheme as any}>
            <VictoryLine data={blocks.map(blockMapUncles)} />
          </VictoryChart>
        </ChartCard>
      </Grid> */}
    </Grid>
  );
};

export default StatCharts;
