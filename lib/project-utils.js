import {
  getProjects,
  getWalletsCount,
  getProjectItem,
  getRoundAttributes,
  getWalletAttributes,
} from "../pages/api/queries";

import { nFormatter } from "./transform";

//tmp round_id name mapping
const roundMapping = [{
  "round_name": "Gitcoin Program Beta Round - Ethereum Infrastructure",
  "round_address": "0xdf22a2c8f6ba9376ff17ee13e6154b784ee92094"
}, {
  "round_name": "Gitcoin Program Beta Round - ZK Tech Round",
  "round_address": "0x274554eb289004e15a7679123901b7f070dda0fa"
}, {
  "round_name": "Gitcoin Program Beta Round - Web3 Open Source Software Round",
  "round_address": "0x12bb5bbbfe596dbc489d209299b8302c3300fa40"
}, {
  "round_name": "Gitcoin Program Beta Round - Web3 Community and Education",
  "round_address": "0xaa40e2e5c8df03d792a52b5458959c320f86ca18"
}, {
  "round_name": "Gitcoin Program Beta Round - Climate Solutions",
  "round_address": "0x421510312c40486965767be5ea603aa8a5707983"
}, {
  "round_name": "metacrisis.xyz - Metacrisis",
  "round_address": "0x8aa06b3b8cac2970857f4e0fd78f21dc01aade94"
}, {
  "round_name": "Token Engineering - Token Engineering",
  "round_address": "0x9e669c0a6e075f14ba9d9d98c3580ad67e20ec38"
}, {
  "round_name": "Mask Web3 Social Grant  - Web3 Social",
  "round_address": "0x9c3b81967eafba0a451e324417dd4f3f353b997b"
}, {
  "round_name": "Ethereum Name Service (ENS) - ENS Ecosystem",
  "round_address": "0x64e5b2228ef31437909900b38fc42dd5e4b83147"
}, {
  "round_name": "The Sybil Resistance - The Phantom Menace",
  "round_address": "0x905efbabe2d52cd648fadfafcec8d6c8c60f7423"
}, {
  "round_name": "Mantle Ecosystem Development Program - Mantle Grants 1",
  "round_address": "0xf1c021df6dc6b2dc2e5a837cdfddc2f42503233b"
}, {
  "round_name": "DeSci - DeSci (Decentralized Science)",
  "round_address": "0x6e8dc2e623204d61b0e59e668702654ae336c9f7"
}, {
  "round_name": "Crypto Advocacy - Crypto Advocacy",
  "round_address": "0x32c49d2da5f6866a057e4aa2058c62a2974a5623"
}, {
  "round_name": "Global Chinese Community - GCC - Global Chinese Community beta round",
  "round_address": "0x859faeaa266ba13bd1e72eb6dd7a223902d1adfe"
}, {
  "round_name": "ReFi DAO Local Nodes - ReFi Local Nodes",
  "round_address": "0x64aa545c9c63944f8e765d9a65eda3cbbdc6e620"
}]

export async function getRoundMapping() {
  return roundMapping
}

export async function getProjectOverviewData(roundID="") {
  //get data from api
  const projects = await getProjects(roundID);

  const uniqueContributors = await getWalletsCount(roundID);

  const totalContributions = projects
    .map((p) =>
      Number(p.total_amount_contributed_usd.replace(/[^0-9.-]+/g, ""))
    )
    .reduce((prev, next) => prev + next);

  const totalProjects = projects.length;

  const roundAttributes = await getRoundAttributes(roundID);
  const walletAttributes = await getWalletAttributes("",roundID);

  const foundRound = roundMapping.find(obj => obj.round_address === roundID);
  const roundName =  foundRound ? foundRound.round_name : null;

  //setup counter data
  const counterData = {
    totalProjects: {
      name: "Total Projects",
      count: nFormatter(totalProjects, 1),
    },
    totalContributed: {
      name: "Total Contributions",
      count: nFormatter(totalContributions, 1),
    },
    totalContributors: {
      name: "Total Contributors",
      count: nFormatter(uniqueContributors, 1),
    },
  };

  const projectStatsData = [
    {
      name: "Money Mixer",
      value: roundAttributes[0]["money_mixer_count"],
      max: totalProjects,
      type: "negative",
    },
    {
      name: "On Chain History",
      value: roundAttributes[0]["on_chain_hist_count"],
      max: totalProjects,
      type: "positive",
    },
    {
      name: "Vote Twitter Imbalance",
      value: roundAttributes[0]["vote_imbalance_count"],
      max: totalProjects,
      type: "negative",
    },
  ];

  const walletStatsData = [
    {
      name: "Farmer",
      value: walletAttributes[0]["farmer_count"] - 1, //TODO: a fix required in sql function
      max: uniqueContributors,
      type: "negative",
    },
    {
      name: "Money Mixer",
      value: walletAttributes[0]["money_mixer_count"] - 1,
      max: uniqueContributors,
      type: "negative",
    },
    {
      name: "On Chain History",
      value: walletAttributes[0]["on_chain_hist_count"] - 1,
      max: uniqueContributors,
      type: "positive",
    },
    {
      name: "First Tx During Round",
      value: walletAttributes[0]["first_tx_during_round_count"] - 1,
      max: uniqueContributors,
      type: "negative",
    },
  ];

  //setup project list
  const projectData = projects.map((p) => {
    return {
      projectID: p.id,
      title: p.title,
      amount: p.total_amount_contributed_usd,
      contributors: p.num_contributors,
      tags: Object.values(p.tags)[0],
      riskScore: p.risk_score,
    };
  });

  const data = {
    roundName: roundName,
    counters: counterData,
    projectStats: projectStatsData,
    walletStats: walletStatsData,
    projects: projectData,
  };

  return data;
}

export async function getProjectData(projectID) {
  //get data from api
  const { projectData: pData, contributionsData: wData } = await getProjectItem(
    projectID
  );

  const walletAttributes = await getWalletAttributes(projectID);

  const walletStatsData = [
    {
      name: "Farmer",
      value: walletAttributes[0]["farmer_count"] - 1, //TODO: a fix required in sql function
      max: pData[0].num_contributors,
      type: "negative",
    },
    {
      name: "Money Mixer",
      value: walletAttributes[0]["money_mixer_count"] - 1,
      max: pData[0].num_contributors,
      type: "negative",
    },
    {
      name: "On Chain History",
      value: walletAttributes[0]["on_chain_hist_count"] - 1,
      max: pData[0].num_contributors,
      type: "positive",
    },
    {
      name: "First Tx During Round",
      value: walletAttributes[0]["first_tx_during_round_count"] - 1,
      max: pData[0].num_contributors,
      type: "negative",
    },
  ];

  //setup counter data
  const projectData = {
    title: pData[0].title,
    wallet: pData[0].wallet_address,
    contributors: pData[0].num_contributors,
    amount: pData[0].total_amount_contributed_usd,
    tags: Object.values(pData[0].tags)[0],
  };

  const walletData = wData.map((w) => {
    return {
      address: w.wallet_id,
      amount: w.amount_contributed_usd,
      tags: Object.values(w.contributor_wallets.tags)[0],
      score: w.contributor_wallets.risk_score,
    };
  });

  return {
    projectData,
    walletData,
    walletStatsData,
  };
}
