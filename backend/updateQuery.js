const updateUser = async (data, client) => {
  try {
    for (const member of data) {
      await updateStatus(member, client);
      // Uncomment if needed
      // await updateFormattedDate(member, client);
    }
  } catch (error) {
    console.error("Error updating member:", error);
  }
};

const updateStatus = async (member, client) => {
  const { membershipend, status } = member;
  if (member.membershipend) {
    const expiryDate = new Date(membershipend); // Ensure it's a Date object
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const diffDays = Math.round((expiryDate - new Date()) / oneDay);
    const currentStatus = status;
    let newStatus;
    // console.log(status);
    if (expiryDate <= new Date()) {
      newStatus = "Expired";
    } else if (diffDays <= 3) {
      newStatus = "Expiring soon";
    } else if (diffDays <= 2) {
      newStatus = "Expiring tomorrow";
    } else if (status.replace(/\s+/g, "").toLowerCase() !== "pendingapproval") {
      newStatus = "Ongoing";
    }
    if (
      newStatus &&
      currentStatus &&
      newStatus.toLowerCase().trim() !== currentStatus.toLowerCase().trim()
    )
      updateClient(member, client, newStatus);
  } else {
    console.warn(
      `No membership end date for ${member.status} member ${member.name} `
    );
  }
};

const updateClient = async (member, client, memberStatus) => {
  // Update the member status in the database
  const result = await client
    .db("GritDB")
    .collection("Members")
    .updateOne(
      { _id: member._id }, // Filter criteria
      { $set: { status: memberStatus } }, // Update data
      { returnDocument: "after" } // Not applicable for updateOne
    );
  console.log(`Updated member ${member.name}:`, result);
};

const updateFormattedDate = async (member, client) => {
  if (member.membershipstart && member._id) {
    const [day, month, year] = member.membershipstart.split("-").map(Number);
    const dateObject = new Date(year, month - 1, day); // Convert to Date object
    const result = await client
      .db("GritDB")
      .collection("Members")
      .findOneAndUpdate(
        { _id: member._id }, // Use the _id for filtering
        { $set: { membershipstart: dateObject } }, // Update the joiningDate field
        { returnDocument: "after" } // Correct option for findOneAndUpdate
      );
    console.log(`Updated member with ID ${member._id}:`, result);
  } else {
    console.warn(`Missing membership start date or _id for member:`, member);
  }
};

module.exports = updateUser;
