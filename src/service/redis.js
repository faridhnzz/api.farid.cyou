import 'dotenv/config';
import Redis from 'ioredis';

const REDIS_DEV = 'redis://:hkrqppi4ehBzhUUddP2OJvEBv9rmDESz@redis-10890.c1.ap-southeast-1-1.ec2.cloud.redislabs.com:10890';
const REDIS_PROD = '';
const client = new Redis(REDIS_DEV);

/** redis connect */
export async function connect() {
  await client.connect();
}

/** redis disconnect */
export async function disconnect() {
  client.disconnect();
}

/** redis flush-db */
export async function flushall() {
  client.flushall(function (err, res) {
    console.log('Redis flush-all', res);
  });
}

/** redis flush-all manual */
export async function flushall_manual() {
  client.flushall(function (err, res) {
    console.log('Redis manual flush-all', res);
    client.disconnect();
  });
}

/** redis set */
export async function set(key, value, time = 60) {
  try {
    if (!value) {
      throw new Error('value cannot be empty');
    }

    const data = await client.set(key, JSON.stringify(value), 'EX', time);
    return data;
  } catch (err) {
    console.log(err);
  }
}

/** redis get */
export async function get(key) {
  try {
    const value = await client.get(key);
    const data = JSON.parse(value);
    return data;
  } catch (err) {
    console.log(err);
  }
}

/** LOG */
client.on('connect', function () {
  console.log('Redis is connected!');
});

client.on('ready', function () {
  console.log('Redis ready!');
});

client.on('error', function (err) {
  console.log('Redis client error\n', err);
});

client.on('reconnecting', function () {
  console.log('Redis reconnecting');
});
