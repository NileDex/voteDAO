import { useAptosWallet } from "@razorlabs/wallet-kit";
import { useQuery } from "@tanstack/react-query";
import movementClient from "../services/movement-client";
import { MODULE_ADDRESS } from "../constants";

export function useStake() {
  const { account } = useAptosWallet();

  return useQuery({
    queryKey: ["stake", account?.address],
    refetchInterval: 1000 * 60 * 30,
    queryFn: async () => {
      if (!account?.address) {
        return 0;
      }
      try {
        const response = await movementClient.view<[string]>({
          payload: {
            function: `${MODULE_ADDRESS}::Staking::get_staked_balance`,
            functionArguments: [account?.address],
          },
        });

        const result = parseInt(response[0]);
        // return the correct value at the return value has no decimals
        return result / Math.pow(10, 8);
      } catch (error) {
        console.error(error);
        return 0;
      }
    },
  });
}
