const { TelegramClient, Api } = require('telegram');
const { StringSession } = require('telegram/sessions');

const apiId = parseInt(process.env.API_ID);
const apiHash = process.env.API_HASH;
const stringSession = new StringSession(process.env.STRING_SESSION);

const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,
});

exports.connect = async () => {
  await client.connect();
};

exports.invoke = async (api) => {
  return await client.invoke(api);
};

/** Get last n messages from a channel */
exports.getMessages = async (channel, limit) => {
  const result = await client.invoke(
    new Api.messages.GetHistory({
      peer: channel,
      limit: limit,
    })
  );

  return parse(result).messages;
};

/** Get a message by ID from a channel */
exports.getMessage = async (channel, id) => {
  const result = await client.invoke(
    new Api.channels.GetMessages({
      channel: channel,
      id: [id],
    })
  );

  return parse(result).messages[0];
};

/** Parse API response to common object */
const parse = (data) => JSON.parse(JSON.stringify(data));
