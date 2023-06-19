import React, { useState } from "react";
import "./newUser.css";
import { Publish } from "@material-ui/icons";
import { createUserAPI } from "../../utils/api/UserAPI";

export default function NewUser() {
  const [id, setId] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [roleId, setRoleId] = useState("");

  const handleSave = async () => {
    await createUserAPI();
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>ID</label>
          <input
            type="text"
            placeholder="Enter ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            type="text"
            placeholder="Enter Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Country</label>
          <input
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input
              type="radio"
              name="gender"
              id="male"
              checked={gender === "male"}
              onChange={(e) => setGender("male")}
            />
            <label for="male">Male</label>
            <input
              type="radio"
              name="gender"
              id="female"
              checked={gender === "female"}
              onChange={(e) => setGender("female")}
            />
            <label for="female">Female</label>
            <input
              type="radio"
              name="gender"
              id="other"
              checked={gender === "other"}
              onChange={(e) => setGender("other")}
            />
            <label for="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            value={password}
            type="text"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input
            value={address}
            type="text"
            placeholder="Enter Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </div>
        <div className="newUserItem">
          <label>Role ID</label>
          <input
            value={roleId}
            type="text"
            placeholder="Enter Role ID"
            onChange={(e) => setRoleId(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <img
            className="userUpdateImg"
            src={avatar}
            alt="img"
            onChange={(e) => setAvatar(e.target.value)}
          />
          <label htmlFor="file">
            <Publish className="newUserIcon" />
          </label>
          <input type="file" id="file" style={{ display: "none" }} />
        </div>
        <button className="newUserButton" onClick={(e) => handleSave()}>
          Create
        </button>
      </form>
    </div>
  );
}
