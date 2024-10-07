"use client";
import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";

import { useAppDataContext } from "src/hooks/app-data-provider/useAppDataProvider";
import { valueToBigNumber } from "@aave/math-utils";

import MarketAssetListContainerComp from "./compound/MarketAssetListContainerComp";

import CompoundDashboard from "./CompoundDashboard";

export default function Markets() {
  const { reserves, loading } = useAppDataContext();

  const aggregatedStats = reserves.reduce(
    (acc, reserve) => {
      return {
        totalLiquidity: acc.totalLiquidity.plus(reserve.totalLiquidityUSD),
        totalDebt: acc.totalDebt.plus(reserve.totalDebtUSD),
      };
    },
    {
      totalLiquidity: valueToBigNumber(0),
      totalDebt: valueToBigNumber(0),
    },
  );

  const theme = useTheme();
  const downToSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <CompoundDashboard />

      <section>
        <div className="inner-column wide">
          <MarketAssetListContainerComp />
        </div>
      </section>
    </>
  );
}
