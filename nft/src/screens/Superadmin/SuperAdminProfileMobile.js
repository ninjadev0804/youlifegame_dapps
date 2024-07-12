import React from "react"
import {
  AdminInfoContainerMobile,
  AdminInfoInnerContainerMobile,
  AdminInfoMobile,
  AdminUsernameContainerMobile,
  AdminUsernameMobile,
  AdminUsernameProfile,
  CameraContainer,
  CameraIconMobile,
  ConnectWalletMobileBtn,
  ProfileImgMobile,
  Role,
} from "./styles/SuperAdminProfileMobileStyling"
import cameraImg from "../../images/account/camera.svg"
import { BalanceInfo } from "./components/BalanceInfo"
import { dummyData } from "./dummy-data"
import { BalanceInfoMobile } from "./components/BalanceInfoMobile"
import { ConnectWalletBtn } from "./styles/SuperAdminProfileStyling"
import { FunctionBtnMobile } from "./components/FunctionBtnMobile"
import { CodeOutlined } from "@ant-design/icons"
import { FunctionsListMobile } from "./MobileScreens/FunctionsListMobile"

export const SuperAdminProfileMobile = (props) => {
  const {
    cameraInpRef,
    handleFileInput,
    setCameraClick,
    tempProfileName,
    editProfile,
    profileImage,
    user,
  } = props
  return (
    <>
      <AdminInfoContainerMobile>
        <AdminInfoMobile>
          <ProfileImgMobile src={profileImage} alt="super admin image" />
          <CameraContainer>
            <CameraIconMobile
              src={cameraImg}
              onClick={() => setCameraClick(true)}
            />
            <input
              type="file"
              style={{ display: "none" }}
              ref={cameraInpRef}
              accept="image/*"
              onChange={handleFileInput}
            />
          </CameraContainer>
        </AdminInfoMobile>
        <AdminUsernameContainerMobile>
          <AdminUsernameMobile>
            {user?.attributes?.nickname || tempProfileName}
          </AdminUsernameMobile>
          <Role>super admin</Role>
        </AdminUsernameContainerMobile>

        <BalanceInfoMobile />
      </AdminInfoContainerMobile>

      <FunctionBtnMobile
        text="create nft"
        icon={<CodeOutlined />}
        link="/admin/createNFT"
      />

      {/* functions */}
      <FunctionsListMobile isSuperPage={true} />
    </>
  )
}
