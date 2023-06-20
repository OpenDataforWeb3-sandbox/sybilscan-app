import { getWalletItem, getWallets } from "../pages/api/queries";
import { nFormatter } from "./transform";

export async function getWalletData(walletID) {
    //get data from api
    const { projectData, walletTags } = await getWalletItem(walletID);

    const amountContributed = projectData
    .map((w) =>
      Number(w.amount_contributed.replace(/[^0-9.-]+/g, ""))
    ).reduce((prev, next) => prev + next);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      

    //setup counter data
    const walletData = {
      wallet: walletID,
      projects_contributed: projectData.length,
      amount: formatter.format(amountContributed),
      tags: Object.values(walletTags[0].tags)[0],
    };
  
    const contributionsData = projectData.map((p) => {
      return {
        id: p.project_id,
        title: p.title,
        amount: p.amount_contributed
      };
    });


  
    return {
      walletData,
      contributionsData
    };
    
  
  }
  
export async function getWalletOverviewData(){

    const {walletTags, walletStats} = getWallets();

    console.log(walletTags[0]);

    console.log(walletStats[0]);

    /*
    const walletData = wallets.map((w) => {
        return {
          address: w.id,

          amount: w.amount_contributed_usd,
          tags: Object.values(w.contributor_wallets.tags)[0],
          score: w.contributor_wallets.risk_score,
        };

        */

        return {}
}
