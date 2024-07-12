import React from "react"
import { ArrowRightOutlined } from "@ant-design/icons"
import { MainContainer, MainTitle } from "./styles/ManageContractsStyling"
import { List, Typography } from "antd"
import {contractLinks} from "utils/const"

export const ManageContracts = ({ closeSidebar }) => {
  return (
    <MainContainer>
      <MainTitle>manage contracts</MainTitle>
      <List
        dataSource={contractLinks}
        renderItem={(item) => <List.Item>{item.title}</List.Item>}
        rowKey={(item, index) => index}
        //! loading indicator for when fetching the data
        // loading={true}
      />
    </MainContainer>
  )
}
