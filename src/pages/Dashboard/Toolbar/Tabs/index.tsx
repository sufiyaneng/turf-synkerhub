import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { tabs } from "../../../../constants";

const CustomTabs: React.FC<{
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
}> = (props) => {
  return (
    <Tabs defaultIndex={tabs.findIndex((tab) => tab.value === props.type)}>
      <TabList>
        {tabs?.map((tab: { label: string; value: string }) => {
          return (
            <Tab onClick={() => props.setType(tab.value)} isFocusable={true}>
              {tab.label || ""}
            </Tab>
          );
        })}
      </TabList>
    </Tabs>
  );
};

export default CustomTabs;
