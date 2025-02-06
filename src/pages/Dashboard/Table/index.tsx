import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";
import axios from "../../../axios/interceptor.ts";
import moment from "moment";

interface BookingTableProps {
  tabType: string;
  slotDate: string;
  searchedByBooker: string;
  onOpen: ()=>void;
  setBooking: React.Dispatch<React.SetStateAction<string>>;
  
}

const BookingTable: React.FC<BookingTableProps> = ({
  tabType,
  slotDate,
  searchedByBooker,
  onOpen,setBooking
}) => {
  const [list, setlist] = useState<any>([]);

  const getAllBooking = async () => {
    try {
      const response = await axios.post(`/api/bookings`, {
        slotDate: slotDate,
        type: tabType,
      });
      setlist(response?.data);
    } catch (err: any) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getAllBooking();
  }, [tabType, slotDate]);
  return (
    <>
      <Box p={2} bg="gray.100" minH="100vh">
        <Box bg="white" p={1} rounded="md" shadow="sm" overflowX="auto">
          <TableContainer>
            <Table variant="simple" size="sm">
              <Thead bg="blue.50">
                <Tr>
                  <Th>Booking ID</Th>
                  <Th>Booked By</Th>
                  <Th>Slot Time</Th>
                  <Th>Start Time</Th>
                  <Th>End Time</Th>
                  <Th>Slot Date</Th>
                  <Th>Amount Paid</Th>
                  <Th>Booked On</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {list &&
                  list
                    ?.filter((booking: any) =>
                      searchedByBooker
                        ? booking?.bookerName
                            ?.toLowerCase()
                            .includes(searchedByBooker.toLowerCase())
                        : true
                    )
                    ?.map((booking: any) => (
                      <Tr key={booking?._id}>
                        <Td>{booking?._id}</Td>
                        <Td>{booking?.bookerName}</Td>
                        <Td>{`${booking?.slotTime} Hr`}</Td>
                        <Td>
                          {moment(booking?.startTime, "HH:mm").format(
                            "hh:mm A"
                          )}{" "}
                        </Td>
                        <Td>
                          {moment(booking?.endTime, "HH:mm").format("hh:mm A")}
                        </Td>
                        <Td>
                          {moment(booking?.slotDate).format("DD-MM-YYYY")}
                        </Td>
                        <Td>{booking?.amount}</Td>
                        <Td>
                          {moment(booking?.createdAt).format("DD-MM-YYYY")}
                        </Td>
                        <Td>
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              icon={<FiMoreVertical />}
                              variant="ghost"
                              size="sm"
                              aria-label="Actions"
                            />
                            <MenuList>
                              <MenuItem onClick={()=>{
                                setBooking(booking),
                                onOpen()
                              }}>
                                Update
                              </MenuItem>
                              <MenuItem>Cancel</MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      </Tr>
                    ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default BookingTable;
