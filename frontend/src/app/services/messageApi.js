import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/message/" }),
  tagTypes: ["Message"],
  endpoints: (builder) => ({
    sendNewMessage: builder.mutation({
      query: ({ content, chatId, token }) => ({
        url: "",
        method: "POST",
        body: { content, chatId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      // invalidatesTags: ["Message"],
    }),

    fetchMessages: builder.query({
      query: ({ chatId, user }) => ({
        url: `/${chatId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
      async onCacheEntryAdded(
        { chatId, user },
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;

          const socket = io(ENDPOINT);
          socket.emit("setup", user);
          socket.emit("join chat", chatId);

          socket.on("message received", (newMessage) => {
            console.log(newMessage);
            updateCachedData((draft) => {
              if (newMessage.chat._id === chatId) draft.push(newMessage);
            });
          });

          await cacheEntryRemoved;

          socket.off("new message");
        } catch (error) {
          console.error(error);
        }
      },
      // providesTags: ["Message"],
    }),
  }),
});

export const { useSendNewMessageMutation, useFetchMessagesQuery } = messageApi;
