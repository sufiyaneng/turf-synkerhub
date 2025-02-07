import { Flex, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import Header from "./Header";
import Statistics from "./Statistics";
import CreateEditDrawer from "./CreateEditDrawer";
import Toolbar from "./Toolbar";
import { tabs } from "@/constants";
import BookingTable from "./Table";
import moment from "moment";

const Dashboard: React.FC = () => {
  const [type, setType] = useState<string>(tabs[0].value || "UPCOMING");
  const [slotDate, setSlotDate] = useState<string>(
    moment().format("DD-MM-YYYY")
  );
  const [searchedByBooker, setSearchedByBooker] = useState<string>("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [booking, setBooking] =useState<any>(null)
  return (
    <Flex direction="column">
      <Header />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        background="#F5F6F7"
        p={5}
      >
        <Statistics />
        <CreateEditDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} booking={booking} isEditable={booking ? true : false} setBooking={setBooking}/>
      </Flex>
      <Toolbar
        type={type}
        setType={setType}
        setSlotDate={setSlotDate}
        slotDate={slotDate}
        setSearchedByBooker={setSearchedByBooker}
        searchedByBooker={searchedByBooker}
      />
      <BookingTable tabType={type} slotDate={slotDate} searchedByBooker={searchedByBooker} onOpenEdit={onOpen}  setBooking={setBooking}/>
    </Flex>
  );
};

export default Dashboard;
