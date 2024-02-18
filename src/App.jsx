import { useEffect, useRef, useState } from "react";
import Pill from "./components/Pill";
import "./App.css";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [activeIndex, setactiveIndex] = useState(0);

  const inputRef = useRef(null);

  const fetchingApi = async () => {
    const url = `https://dummyjson.com/users/search?q=${searchValue}`;

    if (searchValue.trim() === "") {
      setUserDetails([]);
      return;
    }
    const response = await fetch(url);
    const jsonData = await response.json();
    setUserDetails(jsonData.users);
  };

  useEffect(() => {
    fetchingApi();
  }, [searchValue]);

  // console.log(userDetails);
  // console.log(searchValue);

  const onClickSelectUser = (user) => {
    const filteredSelectedUser = selectedUser.filter((userD) => {
      return userD.id !== user.id;
    });
    setSelectedUser([...filteredSelectedUser, user]);
    setSearchValue("");
    setUserDetails([]);
    setactiveIndex(0);
    inputRef.current.focus();
  };

  const onClickRemovePill = (email) => {
    const updatedSelectedUsers = selectedUser.filter((user) => {
      return user.email !== email;
    });
    setSelectedUser([...updatedSelectedUsers]);
  };

  const onKeyDownHandler = (e) => {
    if (
      e.key === "Backspace" &&
      searchValue === "" &&
      selectedUser.length !== 0
    ) {
      onClickRemovePill(selectedUser[selectedUser.length - 1].email);
    } else if (
      e.key === "ArrowDown" &&
      userDetails.length > 1 &&
      activeIndex < userDetails.length - 1
    ) {
      setactiveIndex(activeIndex + 1);
    } else if (
      e.key === "ArrowUp" &&
      userDetails.length > 1 &&
      activeIndex >= 1
    ) {
      setactiveIndex(activeIndex - 1);
    } else if (e.key === "Enter" && userDetails.length >= 1) {
      onClickSelectUser(userDetails[activeIndex]);
    }
  };

  return (
    <div className="main-container">
      <h1>Search & Group </h1>
      <div className="input-main-container">
        {selectedUser.map((user) => {
          const pillVariable = (
            <Pill
              text={`${user.firstName} ${user.lastName}`}
              email={user.email}
              image={user.image}
              onClick={() => onClickRemovePill(user.email)}
            />
          );
          return pillVariable;
        })}
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter search element"
          className="search-input"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => onKeyDownHandler(e)}
        />
      </div>
      <div>
        {searchValue !== "" && (
          <ul className="search-suggestion">
            {userDetails.map((user) => {
              return (
                <li
                  key={user.email}
                  onClick={() => onClickSelectUser(user)}
                  className={
                    userDetails[activeIndex].email === user.email
                      ? "active"
                      : ""
                  }
                >
                  <img src={user.image} alt={user.email} />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
