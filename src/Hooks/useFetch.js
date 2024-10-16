import { useEffect, useState } from "react";

export function useFetch(url) {
  const [membersData, setMembersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true); // Set loading to true when starting fetch
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMembersData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false); // Set loading to false after fetch is done
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]); // Re-fetch data if the URL changes

  useEffect(() => {
    console.log("Members Data:", membersData); // Log updated membersData
  }, [membersData]);

  return { membersData, loading, error }; // Return membersData, loading, and error
}

export default useFetch;
