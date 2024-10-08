import { InterestRate } from "contract-helpers";
import { createContext, useContext, useState } from "react";
import { EmodeModalType } from "src/components/transactions/Emode/EmodeModalContent";
import { TxErrorType } from "src/ui-config/errorMapping";

export enum ModalType {
  Supply,
  Withdraw,
  Borrow,
  Repay,
  CollateralChange,
  RateSwitch,
  Stake,
  Unstake,
  StakeCooldown,
  StakeRewardClaim,
  ClaimRewards,
  Emode,
  Faucet,
  Swap,
  DebtSwitch,
  GovDelegation,
  GovVote,
  V3Migration,
  RevokeGovDelegation,
  StakeRewardsClaimRestake,
}

export interface ModalArgsType {
  underlyingAsset?: string;
  proposalId?: number;
  support?: boolean;
  power?: string;
  icon?: string;
  stakeAssetName?: string;
  currentRateMode?: InterestRate;
  emode?: EmodeModalType;
  isFrozen?: boolean;
}

export type TxStateType = {
  txHash?: string;
  // txError?: string;
  loading?: boolean;
  success?: boolean;
};

export interface ModalContextType<T extends ModalArgsType> {
  openSupply: (
    underlyingAsset: string,
    currentMarket: string,
    name: string,
    funnel: string,
    isReserve?: boolean,
  ) => void;
  openWithdraw: (
    underlyingAsset: string,
    currentMarket: string,
    name: string,
    funnel: string,
  ) => void;
  openBorrow: (
    underlyingAsset: string,
    currentMarket: string,
    name: string,
    funnel: string,
    isReserve?: boolean,
  ) => void;
  openRepay: (
    underlyingAsset: string,
    currentRateMode: InterestRate,
    isFrozen: boolean,
    currentMarket: string,
    name: string,
    funnel: string,
  ) => void;
  openCollateralChange: (
    underlyingAsset: string,
    currentMarket: string,
    name: string,
    funnel: string,
    usageAsCollateralEnabledOnUser: boolean,
  ) => void;
  openRateSwitch: (
    underlyingAsset: string,
    currentRateMode: InterestRate,
  ) => void;
  openStake: (stakeAssetName: string, icon: string) => void;
  openUnstake: (stakeAssetName: string, icon: string) => void;
  openStakeCooldown: (stakeAssetName: string) => void;
  openStakeRewardsClaim: (stakeAssetName: string, icon: string) => void;
  openStakeRewardsRestakeClaim: (stakeAssetName: string, icon: string) => void;
  openClaimRewards: () => void;
  openEmode: (mode: EmodeModalType) => void;
  openFaucet: (underlyingAsset: string) => void;
  openSwap: (underlyingAsset: string) => void;
  openDebtSwitch: (
    underlyingAsset: string,
    currentRateMode: InterestRate,
  ) => void;
  openGovDelegation: () => void;
  openRevokeGovDelegation: () => void;
  openV3Migration: () => void;
  openGovVote: (proposalId: number, support: boolean, power: string) => void;
  close: () => void;
  type?: ModalType;
  args: T;
  mainTxState: TxStateType;
  approvalTxState: TxStateType;
  setApprovalTxState: (data: TxStateType) => void;
  setMainTxState: (data: TxStateType) => void;
  gasLimit: string;
  setGasLimit: (limit: string) => void;
  loadingTxns: boolean;
  setLoadingTxns: (loading: boolean) => void;
  txError: TxErrorType | undefined;
  setTxError: (error: TxErrorType | undefined) => void;
}

export const ModalContext = createContext<ModalContextType<ModalArgsType>>(
  {} as ModalContextType<ModalArgsType>,
);

// @ts-ignore
export const ModalContextProvider: React.FC = ({ children }) => {
  // const { setSwitchNetworkError } = useWeb3Context();
  // contains the current modal open state if any
  const [type, setType] = useState<ModalType>();
  // contains arbitrary key-value pairs as a modal context
  const [args, setArgs] = useState<ModalArgsType | any>({});
  const [approvalTxState, setApprovalTxState] = useState<TxStateType>({});
  const [mainTxState, setMainTxState] = useState<TxStateType>({});
  const [gasLimit, setGasLimit] = useState<string>("");
  const [loadingTxns, setLoadingTxns] = useState(false);
  const [txError, setTxError] = useState<TxErrorType>();

  return (
    <ModalContext.Provider
      value={{
        openSupply: (
          underlyingAsset,
          currentMarket,
          name,
          funnel,
          isReserve,
        ) => {
          console.log("openSupply");
          setType(ModalType.Supply);
          setArgs({ underlyingAsset });
        },
        openWithdraw: (underlyingAsset, currentMarket, name, funnel) => {
          setType(ModalType.Withdraw);
          setArgs({ underlyingAsset });
        },
        openBorrow: (
          underlyingAsset,
          currentMarket,
          name,
          funnel,
          isReserve,
        ) => {
          setType(ModalType.Borrow);
          setArgs({ underlyingAsset, name: name });
        },
        openRepay: (
          underlyingAsset,
          currentRateMode,
          isFrozen,
          currentMarket,
          name,
          funnel,
        ) => {
          setType(ModalType.Repay);
          setArgs({ underlyingAsset, currentRateMode, isFrozen });
        },
        openCollateralChange: (
          underlyingAsset,
          currentMarket,
          name,
          funnel,
          usageAsCollateralEnabledOnUser,
        ) => {
          setType(ModalType.CollateralChange);
          setArgs({ underlyingAsset });
        },
        openRateSwitch: (underlyingAsset, currentRateMode) => {
          setType(ModalType.RateSwitch);
          setArgs({ underlyingAsset, currentRateMode });
        },
        openStake: (stakeAssetName, icon) => {
          console.log("opening stake modal");
          setType(ModalType.Stake);
          setArgs({ stakeAssetName, icon });
        },
        openUnstake: (stakeAssetName, icon) => {
          setType(ModalType.Unstake);
          setArgs({ stakeAssetName, icon });
        },
        openStakeCooldown: (stakeAssetName) => {
          setType(ModalType.StakeCooldown);
          setArgs({ stakeAssetName });
        },
        openStakeRewardsClaim: (stakeAssetName, icon) => {
          setType(ModalType.StakeRewardClaim);
          setArgs({ stakeAssetName, icon });
        },
        openStakeRewardsRestakeClaim: (stakeAssetName, icon) => {
          setType(ModalType.StakeRewardsClaimRestake);
          setArgs({ stakeAssetName, icon });
        },
        openClaimRewards: () => {
          setType(ModalType.ClaimRewards);
        },
        openEmode: (mode) => {
          setType(ModalType.Emode);
          setArgs({ emode: mode });
        },
        openFaucet: (underlyingAsset) => {
          setType(ModalType.Faucet);
          setArgs({ underlyingAsset });
        },
        openSwap: (underlyingAsset) => {
          setType(ModalType.Swap);
          setArgs({ underlyingAsset });
        },
        openDebtSwitch: (underlyingAsset, currentRateMode) => {
          setType(ModalType.DebtSwitch);
          setArgs({ underlyingAsset, currentRateMode });
        },
        openGovDelegation: () => {
          setType(ModalType.GovDelegation);
        },
        openRevokeGovDelegation: () => {
          setType(ModalType.RevokeGovDelegation);
        },
        openGovVote: (proposalId, support, power) => {
          setType(ModalType.GovVote);
          setArgs({ proposalId, support, power });
        },
        openV3Migration: () => {
          setType(ModalType.V3Migration);
        },
        close: () => {
          setType(undefined);
          setArgs({});
          setMainTxState({});
          setApprovalTxState({});
          setGasLimit("");
          setTxError(undefined);
          // setSwitchNetworkError(undefined);
        },
        type,
        args,
        approvalTxState,
        mainTxState,
        setApprovalTxState,
        setMainTxState,
        gasLimit,
        setGasLimit,
        loadingTxns,
        setLoadingTxns,
        txError,
        setTxError,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return context;
};
