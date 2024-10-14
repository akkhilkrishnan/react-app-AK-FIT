import React, { useEffect, useState } from "react";
import { formatUrl, formatDate, indianCurrency } from "../Helper/helperFunctions";
export default function TableView(props) {

    const { membersData } = props
    const finsStatusColor = (status) => {
        const color = status === 'Trial' ? '#cd4800' : '#097856'
        return color
    }
    const findColor = (expiryDate) => {
        const [day, month, year] = expiryDate.split("-").map(Number);
        const parsedExpiryDate = new Date(year, month - 1, day); // Month is 0-indexed 

        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
        const diffDays = Math.round(
            Math.abs((parsedExpiryDate - new Date()) / oneDay)
        );

        const memberStatusColor =
            parsedExpiryDate <= new Date() // Expired
                ? "#DC0000"
                : diffDays <= 3 // About to expire
                    ? "#FFA500"
                    : "#4AAc2c"; // Valid

        return memberStatusColor;
    };
    return (<table>
        <tr>
            {/* <th>MEMBER IMG</th> */}
            <th>MEMBER NAME</th>
            <th>STATUS</th>
            <th>DATE OF JOINING</th>
            <th>START DATE</th>
            <th>SUBSCRIPTION</th>
            <th>PAID AMOUNT</th>
            <th>EXPIRY DATE</th>
        </tr>
        {membersData.map((member, index) => {
            return (
                <tr>
                    {/* <td>
                <img
                  src={
                    member.url
                      ? formatUrl(member.url)
                      : `/assets/images/image_NeeravBafna.jpg`
                  }
                  class="avatar"
                  alt="Profile Avatar"
                />
              </td> */}
                    <td
                        key={index}
                        style={{
                            color: `${member.membershipend
                                    ? findColor(member.membershipend)
                                    : "#E6E6FA"
                                }`,
                            fontWeight: 100,
                            fontSize: "16px",
                            textTransform: "capitalize",
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <img
                                src={
                                    member.url
                                        ? formatUrl(member.url)
                                        : `/assets/images/image_NeeravBafna.jpg`
                                }
                                class="avatar"
                                alt="Profile Avatar"
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'self-start' }}>
                                <div className="name-style">{member.name}</div>
                                <div className="phn-style"> {member.phone}   </div>
                            </div>
                        </div>
                    </td>
                    <td><span style={{
                        backgroundColor: `${member.status
                                ? finsStatusColor(member.status) : ''
                            }`
                    }} className="status-style"
                    >{member.status}</span></td>
                    <td>{formatDate(member.joiningDate)}</td>
                    <td>{member.membershipstart ? formatDate(member.membershipstart) : "NA"}</td>
                    <td>{member.membership}</td>
                    <td>{member.totalPaid?indianCurrency.format(member.totalPaid):'NA'}</td>
                    <td>{member.membershipend ? member.membershipend : "NA"}</td>
                </tr>
            );
        })}
    </table>)
}