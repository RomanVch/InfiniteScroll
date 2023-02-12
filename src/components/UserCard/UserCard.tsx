import { Avatar, Card, CardHeader, Typography } from "@mui/material";
import React from "react";

type UserT = {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    thumbnail: string;
  };
};

type UserCardPropsT = {
  user: UserT;
};

/**
 * @function UserCard
 * @description is a functional component that displays user information in a card format.
 * @param {UserCardPropsT} props - The props for the component.
 * @param {UserT} props.user - The user object containing information to display.
 * @param {string} props.user.email - The email address of the user.
 * @param {object} props.user.name - An object containing the first and last name of the user.
 * @param {string} props.user.name.first - The first name of the user.
 * @param {string} props.user.name.last - The last name of the user.
 * @param {object} props.user.picture - An object containing the thumbnail picture of the user.
 * @param {string} props.user.picture.thumbnail - The URL of the thumbnail picture of the user.
 * @returns {React.ReactElement} A React component that displays the user information in a card format.
 */

export const UserCard: React.FC<UserCardPropsT> = React.memo(({ user }) => {
  return (
    <Card key={user.email}>
      <CardHeader
        avatar={
          <Avatar
            src={user.picture.thumbnail}
            alt={`${user.name.first} ${user.name.last}`}
          />
        }
        title={`${user.name.first} ${user.name.last}`}
        subheader={<Typography>{user.email}</Typography>}
      />
    </Card>
  );
});
