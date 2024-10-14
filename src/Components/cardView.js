import React, { memo, useEffect, useState } from "react";
export default function CardView(props){
    const {membersData}   =props
     return(<div>
        {membersData.map((member)=>{
            return<div className="membercard-style">
               <div> {member.name}</div>
            </div>
        })}
     </div>)
}

