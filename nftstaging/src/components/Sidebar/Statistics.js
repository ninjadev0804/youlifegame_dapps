import React from "react"
import {
  CloseButton,
  MainContainer,
  SidebarContainer,
  SidebarTitle,
  TitleContainer,
} from "./styles/SidebarStyling"
import { CloseOutlined } from "@ant-design/icons"

export const Statistics = ({ closeSidebar }) => {
  return (
    <SidebarContainer>
      <MainContainer>
        <TitleContainer>
          <SidebarTitle>staistics</SidebarTitle>
        </TitleContainer>
      </MainContainer>
      <CloseButton onClick={closeSidebar}><CloseOutlined /></CloseButton>
    </SidebarContainer>
  )
}
