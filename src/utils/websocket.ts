import { createConsumer } from "@rails/actioncable";
export const consumer = createConsumer(process.env.REACT_APP_WEBSOCKET_URL)