import React from "react";

import {
  GridItem,
  Grid,
  Tag,
  Avatar,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";

const Participant = ({ user, onClose }) => {
  const { _id: UserId, name, image, ...rest } = user;
  return (
    <GridItem w="100%">
      <Tag onClick={() => onClose(UserId)} size="lg" borderRadius="full">
        <Avatar name={name} src={image} size="xs" ml="-1" mr={2} />
        <TagLabel fontSize="xs">{name}</TagLabel>
        <TagCloseButton />
      </Tag>
    </GridItem>
  );
};

const GroupParticipantsPanel = ({ users, onClose }) => {
  return (
    <Grid templateColumns="repeat(3,1fr)" gap="3" my="3">
      {users.map((user) => (
        <Participant user={user} onClose={onClose} key={user._id} />
      ))}
    </Grid>
  );
};

export default GroupParticipantsPanel;
