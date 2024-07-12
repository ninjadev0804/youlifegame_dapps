
import {
  DeliveredProcedureOutlined,
  ExportOutlined,
  IssuesCloseOutlined,
  StopOutlined,
} from "@ant-design/icons"

export const contractLinks = [
  {
    title: "YLT_CONTRACT_ADDRESS",
    link: "0x275aF57B1Ff293684568d2FC1dCE04159F252D27",
  },
  {
    title: "YLNFT1155_CONTRACT_ADDRESS",
    link: "0x8EF0b447ec9e7890F52513b158037864256bc609",
  },
  {
    title: "YLNFT721_CONTRACT_ADDRESS",
    link: "0x05676D3FF4203c11AfB6eCAA232e7123e90c7F37",
  },
  {
    title: "YLPROXY_CONTRACT_ADDRESS",
    link: "0x13DBB08E126Ff412FedDC5AB872373aEd9221469",
  },
  {
    title: "YLMARKETPLACE_CONTRACT_ADDRESS1",
    link: "0x57a511FC2aF347669E00E9EA4B20C8B17d557af6",
  },
  {
    title: "YLMARKETPLACE_CONTRACT_ADDRESS2",
    link: "0xf0b85aBE8094f9F49F3c7dde8a1E4e6D7d6b654A",
  },
  {
    title: "YLAUCTION_CONTRACT_ADDRESS",
    link: "0xf0b85aBE8094f9F49F3c7dde8a1E4e6D7d6b654A",
  },
]

export const actionsList = [
  {
    id: 1,
    icon: <DeliveredProcedureOutlined />,
    title: "ACCESS MINT",
  },
  {
    id: 2,
    icon: <ExportOutlined />,
    title: "ACCESS TRANSFER",
  },
  {
    id: 3,
    icon: <IssuesCloseOutlined />,
    title: "ACCESS PAUSE",
  },
  // {
  //   id: 4,
  //   icon: <RadiusSettingOutlined />,
  // },
  {
    id: 4,
    icon: <StopOutlined />,
    title: "ACCESS BURN",
  },
]