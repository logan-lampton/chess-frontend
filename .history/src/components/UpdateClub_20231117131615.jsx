import React, { useState } from "react";
import axios from "axios";

// Possibly, eventually add ability to change the instructor of the club

function UpdateClub() {
  const [formData, setFormData] = useState({
    club_name: "",
    school: "",
    meet_time: "",
    instructor_id: instructorId,
  });

  return (
    <div>
      <h2>Update Club Details</h2>
    </div>
  );
}

export default UpdateClub;
