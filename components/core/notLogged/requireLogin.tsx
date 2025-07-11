import { CustomDivider } from "@/components/ui/customDivider";
import { CustomModal } from "@/components/ui/customModal";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { useUserData } from "@/context/userContext";
import { useCallback, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { NotLogged } from ".";
import { Settings } from "../profile/settings";
import { GetLoggedInModal } from "./getLoggedIn";
import { GetSiggnedUp } from "./getSignedUp";

export const RequireLogin = ({
  children,
  title,
  subTitle,
}: {
  children: React.ReactNode;
  title: string;
  subTitle: string;
}) => {
  const { userData } = useUserData();
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");

  const openModal = (type: string) => {
    setModalVisible(true);
    setContent(type);
  };

  const closeModal = useCallback(() => setModalVisible(false), []);

  if (!userData || userData.id === "") {
    return (
      <>
        <NotLogged
          title={title}
          subTitle={subTitle}
          func={() => openModal("Login")}
        />
        <CustomModal modalVisible={modalVisible} closeModal={closeModal}>
          {content === "Login" && (
            <GetLoggedInModal closeModal={closeModal} func={openModal} />
          )}
          {content === "Signup" && (
            <GetSiggnedUp closeModal={closeModal} func={openModal} />
          )}
        </CustomModal>
      </>
    );
  }

  return <>{children}</>;
};

export const RequireLoginProfile = ({
  children,
  title,
  subTitle,
  bgColor,
  headerTitle,
  btnText,
  notLoggedInProfileList,
  height,
  modalVisible,
  openModal,
  closeModal,
  content,
}: {
  children: React.ReactNode;
  title: string;
  subTitle: string;
  bgColor: string;
  headerTitle: string;
  btnText: string;
  notLoggedInProfileList: React.ReactNode;
  height: number;
  modalVisible: boolean;
  content: string;
  openModal: (type: string) => void;
  closeModal: () => void;
}) => {
  const { userData } = useUserData();

  if (!userData || userData.id === "") {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
        <InnerContainer style={{ gap: 12, marginTop: 20 }}>
          <Header headerTitle={headerTitle} style={{ marginBottom: 12 }} />

          <ScrollView style={{ gap: 12, paddingBottom: height }}>
            <>
              <NotLogged
                title={title}
                subTitle={subTitle}
                btnText={btnText}
                func={() => openModal("Login")}
              />

              <CustomModal modalVisible={modalVisible} closeModal={closeModal}>
                {content === "Login" && (
                  <GetLoggedInModal closeModal={closeModal} func={openModal} />
                )}

                {content === "Signup" && (
                  <GetSiggnedUp closeModal={closeModal} func={openModal} />
                )}

                {content === "settings" && <Settings closeModal={closeModal} />}
              </CustomModal>

              <CustomDivider style={{ marginVertical: 30 }} />

              {notLoggedInProfileList}
            </>
          </ScrollView>
        </InnerContainer>
      </SafeAreaView>
    );
  }

  return <>{children}</>;
};
