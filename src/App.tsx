import { Box, CircularProgress, debounce, Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import { UserCard } from "./components/UserCard/UserCard";

type UserT = {
  name: {
    first: string;
    last: string;
  };
  picture: {
    thumbnail: string;
  };
  email: string;
};
/**
 App component renders an infinite scrolling list of user data retrieved from a random user generator API
 *
 @function App
 @returns {React.ReactElement} - A React component that implements infinite scrolling of user data.
 @example <App/>
 */
const App: React.FC = () => {
  /**@const users this all users save
   @function setUsers
   @description add new user to users
   @return {void}
   */
  const [users, setUsers] = useState<UserT[]>([]);
  /**@const page this is current page
   @function setPage
   @description change page number
   @return {void}
   */
  const [page, setPage] = useState(1);
  /**@const loading this is boolean flag show loading
   @function setLoading
   @description  change loading state
   @return {void}
   */
  const [loading, setLoading] = useState(false);

  /**
   * @function fetchUsers
   * @description App.tsx is a React component that implements infinite scrolling of user data.
   * The component uses the fetch API to retrieve a set of user data from a random user generator API.
   * @returns {void} add data in Users.
   */

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const res = await fetch(
      `https://randomuser.me/api/?page=${page}&results=20`
    );
    const data = await res.json();
    setUsers((prevUsers) => [...prevUsers, ...data.results]);
    setLoading(false);
  }, [page]);

  /**
   * @function debouncedFetchUsers
   * @returns {Function} A debounced version of the fetchUsers function.
   */

  const debouncedFetchUsers = debounce(fetchUsers, 100);

  /**
   @function handleScroll
   @description
   A event handler function that listens to the scroll event on the window and updates the state "page" when the end of the document is reached.
   This function is called whenever the user scrolls and updates the "page" state to trigger a re-fetch of the next set of users.
   @returns {void}
   */

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) >=
      document.documentElement.scrollHeight
    ) {
      setPage(page + 1);
    }
  };

  /**
   @description useEffect hook that sets up an event listener for scrolling and calls debouncedFetchUsers when the page number changes
   */
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    debouncedFetchUsers();
  }, [page]);

  return (
    <div>
      <Box>
        {" "}
        <h2>Infinity Scroll</h2>
        {loading && (
          <CircularProgress
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              color: "#B9B9B9",
              zIndex: 3,
            }}
          />
        )}
      </Box>
      <Grid container spacing={3}>
        {users.map((user) => {
          return (
            <Grid item xs={6} md={4} key={user.email}>
              <UserCard user={user} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default App;
