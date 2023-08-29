import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import TransactionTable from "../TransactionTable";
import MiniStatement from "../MiniStatement";

const History = () => {
  const [activeTab, setActiveTab] = useState("mini-statement");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Account Page</h1>
      <Tabs value={activeTab}>
        <TabsHeader className="space-x-2">
          <Tab
            value="transactions"
            onClick={() => handleTabChange("transactions")}
          >
            Transactions
          </Tab>
          <Tab
            value="mini-statement"
            onClick={() => handleTabChange("mini-statement")}
          >
            Mini Statement
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel value="transactions">
            <TransactionTable />
          </TabPanel>
          <TabPanel value="mini-statement">
            <MiniStatement />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default TabPage;
