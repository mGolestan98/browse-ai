const BrowseAi = require("./build").default;

const browseAiClient = new BrowseAi("2f5236e2-7d88-402a-8e82-ff3311aaca12");

browseAiClient.getJobData(
  "f7a4daa2-7306-4e3b-8de2-cfb0637e4ac6",
  "4698bb52-b1b7-45cc-82a0-8630994e275a"
);
