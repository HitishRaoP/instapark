"use server"

import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'listings-add-client',
    brokers: ['localhost:9092']
})

async function createTopicUsingAdmin(){
    const admin = kafka.admin();

    await admin.connect();

    try {
        await admin.createTopics({
            topics: [{
                topic : "listings-add-topic",
                numPartitions : 1,
                replicationFactor : 1
            }]
        })

        await admin.listTopics();

        await admin.disconnect()
    } catch (error) {
        console.error(error)
    }
}

createTopicUsingAdmin();