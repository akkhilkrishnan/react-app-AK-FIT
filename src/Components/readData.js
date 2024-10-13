import React, { useEffect, useState } from "react";

import axios from "axios";

export const ReadData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/data.txt"); // Assuming data.json is in public folder
      setData(response.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const regex =
      /Name:\s*(?<name>.+?)\nDOB:\s*(?<dob>\d{1,2}\/\d{1,2}\/\d{4})\nEmail:\s*(?<email>.+?)\nPh no:\s*(?<phone>\d{10})\nEmergency no:\s*(?<emergencyPhone>\d{10})\nHeight:\s*(?<height>[\d.]+)\nWeight:\s*(?<weight>[\d.]+)\nMedical condition:\s*(?<medicalCondition>.+)/;

    const match = data.match(regex);

    if (match && match.groups) {
      const extractedData = {
        name: match.groups.name,
        dob: match.groups.dob,
        email: match.groups.email,
        phone: match.groups.phone,
        emergencyPhone: match.groups.emergencyPhone,
        height: parseFloat(match.groups.height),
        weight: parseFloat(match.groups.weight),
        medicalCondition: match.groups.medicalCondition,
      };

      console.log(extractedData);
    } else {
      console.log("No matches found.");
    }
  }, [data]);

  return <></>;
};
