require("dotenv").config();

const { groupScheduler } = require("./modules/scheduling-engine");

async function run() {

    try {

        const result = await groupScheduler.generate();

        console.log("Scheduler result:");
        console.log(result);

    } catch (error) {

        console.error("Scheduler failed:");
        console.error(error.message);

    }

}

run();