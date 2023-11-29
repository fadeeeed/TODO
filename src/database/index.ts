import { connect, set } from "mongoose";
import { MONGODB_USER, MONGODB_PASSWORD, NODE_ENV } from "@/config";

export const dbConnection = async () => {
  const dbConfig = {
    url: `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@todo.gdeqlge.mongodb.net/?retryWrites=true&w=majority`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  };

  if (NODE_ENV !== "production") {
    set("debug", true);
  }

  await connect(dbConfig.url);
};
