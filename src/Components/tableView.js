import React, { useEffect, useState } from "react";
import {
  formatUrl,
  formatDate,
  indianCurrency,
} from "../Helper/helperFunctions";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Modal from "../Components/Modal.tsx";
import useFetch from "../Hooks/useFetch.js";
export default function TableView(props) {
  const [openModal, setOpenModal] = useState(false);
  let [dataLoading, setDataLoading] = useState(false);
  let [queryParams, setQueryParams] = useState({ limit: 50, skip: 0 });

  const { membersData } = props;
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setMembers(membersData);
  }, [membersData]);

  useEffect(() => {
    console.log(members.length);
  }, [members]);

  const findStatusColor = (status) => {
    switch (status.replace(/\s+/g, "").toLowerCase()) {
      case "trial":
        return "#0967ba"; // Blue
      case "expiringsoon" || "expiringtomorrow":
        return "#b56d07"; // Orange
      case "ongoing":
        return "#0c8a48"; // Green
      case "expired":
        return "#c92828"; // Red
      case "pendingapproval":
        return ""; // Red
      default:
        return "#000000"; // Default color (black) for unknown statuses
    }
  };
  const closeModal = (res) => {
    setOpenModal(!openModal);
    if (res.target.innerHTML === "yes") {
      openModal.flag === "approve" ? denyPayment() : approvePayment();
    }
  };

  const approvePayment = () => {};
  const denyPayment = () => {};
  const fetchMoreData = (queryParams) => {
    const { limit, skip } = queryParams;
    try {
      fetch(`http://localhost:5000/data?limit=${limit}&skip=${skip}`)
        .then((res) => res.json())
        .then((data) => setMembers((prev) => [...prev, ...data]));
    } catch (error) {
      console.log(error);
    } finally {
      setDataLoading(false);
    }
  };
  const viewmoreHandle = () => {
    setQueryParams({
      limit: queryParams.limit + 50,
      skip: queryParams.skip + 50,
    });
    setDataLoading(true);
    fetchMoreData(queryParams);
  };
  const checkStatus = (member) => {
    return member.status.trim().toLowerCase() === "pending approval";
  };
  return (
    <div>
      {members && members.length ? (
        <div>
          <table>
            <tr>
              {/* <th>MEMBER IMG</th> */}
              <th>MEMBER ID</th>
              <th>MEMBER NAME</th>
              <th>STATUS</th>
              <th>DATE OF JOINING</th>
              <th>START DATE</th>
              <th>SUBSCRIPTION</th>
              <th>PAID AMOUNT</th>
              <th>EXPIRY DATE</th>
            </tr>
            {members.map((member, index) => {
              return (
                <tr className={checkStatus(member) ? "approval-row-style" : ""}>
                  <td>
                    <div>{member.member_id}</div>
                  </td>
                  <td
                    key={index}
                    style={{
                      // color: `${
                      //   member.membershipend
                      //     ? findStatusAndColor(member.membershipend)[0]
                      //     : "#E6E6FA"
                      // }`,
                      fontWeight: 100,
                      fontSize: "16px",
                      textTransform: "capitalize",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      {/* <img
                      src={
                        member.url
                          ? formatUrl(member.url)
                          : `/assets/images/image_NeeravBafna.jpg`
                      }
                      class="avatar"
                      alt="Profile Avatar"
                    /> */}

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "self-start",
                        }}
                      >
                        <div
                          className="name-style"
                          style={{
                            // color: `${findStatusColor(member.status)}`
                            color: "",
                          }}
                        >
                          {member.name}
                        </div>
                        <div className="phn-style"> +91 {member.phone} </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        backgroundColor: `${findStatusColor(member.status)}`,
                      }}
                      className="status-style"
                    >
                      {member.status}
                    </span>
                    {checkStatus(member) ? (
                      <div className="approve-btn-style">
                        <button
                          style={{ backgroundColor: " #0c8a48" }}
                          onClick={() =>
                            setOpenModal({ modal: true, flag: "approve" })
                          }
                        >
                          <img
                            src="assets/images/approval.svg"
                            Width={30}
                            height={30}
                            alt="approve"
                          />
                        </button>
                        <button
                          style={{ backgroundColor: " #c92828" }}
                          onClick={() =>
                            setOpenModal({ modal: true, flag: "deny" })
                          }
                        >
                          <img
                            src="assets/images/deny.svg"
                            Width={13}
                            height={13}
                            alt="approve"
                          />
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      <div className="date-style">
                        {formatDate(member.joiningDate).date}
                      </div>
                      <div className="phn-style">
                        {formatDate(member.joiningDate).time}
                      </div>
                    </div>
                  </td>
                  <td>
                    {member.membershipstart
                      ? formatDate(member.membershipstart).date
                      : "NA"}
                  </td>
                  <td>
                    <div>
                      {member.membership && member.membership.split(" ")[0]}
                    </div>
                    {/* <div className="phn-style">
                      {member.totalPaid ? member.totalPaid * 0.001 + "k" : ""}
                    </div> */}
                  </td>
                  <td>
                    {member.totalPaid
                      ? indianCurrency.format(member.totalPaid)
                      : "NA"}
                  </td>
                  <td>
                    {member.membershipend
                      ? formatDate(member.membershipend).date
                      : "NA"}
                  </td>
                </tr>
              );
            })}
          </table>
          <button
            className="viewmore-btn"
            onClick={viewmoreHandle}
            disabled={dataLoading}
          >
            Load more
          </button>
        </div>
      ) : (
        <div>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <p>
              <Skeleton
                Width={30}
                height={80}
                count={5}
                inline={true}
                className={"skeletonloader"}
              />
              {}
            </p>
          </SkeletonTheme>
        </div>
      )}
      <div>
        {openModal && (
          <Modal type={"deny"} openModal={openModal} closeModal={closeModal} />
        )}
      </div>
    </div>
  );
}
