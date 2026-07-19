require("dotenv").config();

const normalScheduler = require("./modules/scheduling-engine/normal/scheduler");


async function test() {

    try {

        const result =
            await normalScheduler.generate();


        console.log(
            "Normal Scheduler result:"
        );


        console.log(result);


    } catch (error) {

        console.error(
            "Normal Scheduler failed:"
        );


        console.error(
            error.message
        );

    }

}


test();