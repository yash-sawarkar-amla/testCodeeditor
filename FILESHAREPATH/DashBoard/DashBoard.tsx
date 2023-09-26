"use client";
import { useEffect, useState } from "react";
import "../../assets/rc-table.scss";
import DIContainer from "services/dependencyRegistration";
import types from "services/dependencyRegistration/types";
import { IDashBoardAgent } from "@/iagents";
import Heading from "../Heading/Heading";
import { IUser } from "types/UserTypes";
import OrderHistory from "../OrderHistory/OrderHistory";
import WishList from "../WishList/WishList";
import QuoteOrder from "../QuoteOrder/QuoteOrder";

const DashBoard = () => {
  const [dashboardData, setDashboardData] = useState<IUser>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const orderAgent = DIContainer.get<IDashBoardAgent>(types.DashBoardAgent);
    const data = await orderAgent.getDashBoard();
    setDashboardData(data);
  };

  return (
    <>
      {dashboardData && (
        <>
          <div className="flex gap-4">
            <div className="w-1/2">
              <Heading name="My Profile" />
              <div className="flex flex-col p-2">
                <div className="flex items-center  mt-2">
                  <div className="mr-2 w-1/2">Username</div>
                  <div className="w-1/2">{dashboardData.UserName}</div>
                </div>
                <div className="flex items-center  mt-2">
                  <div className="mr-2 w-1/2">First Name</div>
                  <div className="w-1/2">{dashboardData.FirstName}</div>
                </div>
                <div className="flex items-center mt-2">
                  <div className="mr-2 w-1/2">Last Name</div>
                  <div className="w-1/2">{dashboardData.LastName}</div>
                </div>
                <div className="flex items-center mt-4">
                  <div className="mr-2 w-1/2">Phone Number</div>
                  <div className="w-1/2">{dashboardData.PhoneNumber}</div>
                </div>
                <div className="flex items-center mt-4">
                  <div className="mr-2 w-1/2">Email</div>
                  <div className="w-1/2">{dashboardData.Email}</div>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <Heading name="Address Information" />
              <div>
                <div className="mt-2 p-2">
                  <h4 className="font-semibold mb-2">Shipping Address: </h4>
                  <div className="mb-2">
                    {dashboardData.FirstName} {dashboardData.LastName}
                  </div>
                  <p className="mb-2">{dashboardData?.AddressList?.ShippingAddress?.Address1}</p>
                  <p className="mb-2">{dashboardData?.AddressList?.ShippingAddress?.Address2}</p>
                  <p className="mb-2">
                    {dashboardData?.AddressList?.ShippingAddress?.CityName}, {dashboardData?.AddressList?.ShippingAddress?.StateName},{" "}
                    {dashboardData?.AddressList?.ShippingAddress?.CountryName}
                    {dashboardData?.AddressList?.ShippingAddress?.PostalCode}
                  </p>
                  <p>{dashboardData.PhoneNumber}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Heading name="Billing Information" />
            <div className="flex gap-4">
              <div className="w-1/2">
                <div className="flex flex-col p-2">
                  <h4 className="font-semibold mt-2">Billing Address: </h4>
                  <div className="flex items-center  mt-2">
                    <div className="mr-2 w-1/2">Name:</div>
                    <div className="w-1/2">
                      {dashboardData?.AddressList?.BillingAddress?.FirstName} {dashboardData?.AddressList?.BillingAddress?.LastName}
                    </div>
                  </div>
                  <div className="flex items-center  mt-2">
                    <div className="mr-2 w-1/2">Address:</div>
                    <div className="w-1/2">
                      <p>{dashboardData?.AddressList?.BillingAddress?.Address1}</p>
                      <p>{dashboardData?.AddressList?.BillingAddress?.Address2}</p>
                      <p>
                        {dashboardData?.AddressList?.BillingAddress?.CityName} {dashboardData?.AddressList?.BillingAddress?.StateName}{" "}
                        {dashboardData?.AddressList?.BillingAddress?.CountryName} {dashboardData?.AddressList?.BillingAddress?.PostalCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="mr-2 w-1/2">Phone Number:</div>
                    <div className="w-1/2">{dashboardData?.AddressList?.BillingAddress?.PhoneNumber}</div>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="mr-2 w-1/2">Email:</div>
                    <div className="w-1/2">{dashboardData?.AddressList?.BillingAddress?.EmailAddress || "-"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <OrderHistory isInvoiceBtnShow={false}/>
          </div>
          <div className="mt-4">
            <QuoteOrder/>
          </div>
          <div className="mt-4 mb-4">
            <WishList />
          </div>
        </>
      )}
    </>
  );
};

export default DashBoard;
