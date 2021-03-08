/**
 * we use the Express object again...
 */
import Express from 'express';
import CongressTool from "./congressparse.js";

/**
 * ... but this time we are going to construct a router
 * this router object will allow us to use the get and post functions for our website
 */

const congressAccounts = CongressTool();

const router = Express.Router();

import BodyParse from 'body-parser';

router.use(BodyParse.json());


router.get('/Politician', (request,response)=>{
    let chamber = request.query.chamber;
    let name = request.query.name;
    let politicians = {};

     politicians = (congressAccounts.filter((member)=>{
        // if member chamber === chamber or true(for undefined)
        //the idea is that if chamber is undefined it will pass the check
        return ( ((member.chamber === chamber) || (chamber === undefined) ) && ( (member.firstname === name)||(name === undefined)) );
    }));
    if(politicians === {})
    {
        response.status(404);
    }
    else
        response.status(200);
    response.json(politicians);
    response.send();
})

//http://localhost:9999/congressAPI/Poitician/
router.get("/Politician/:bioguide", (request, response) => {
    let bio_guide = request.params.bioguide;
    let member = {bioguide: "-1"};

    for(let person of congressAccounts)
    {
        if(person.bioguide === bio_guide)
        {
            response.status(200);
            member = person;
            response.json(member);
            response.send();
        }
    }
    // double == is type coercion
    if(member.bioguide == -1)
        response.status(404);

    response.json(JSON.stringify(member));
    response.send();

})

router.post("/Politician",(request,response)=> {
    let newbie = request.body;
    const keys = ["congress","chamber","bioguide","firstname","middlename","lastname","suffix","birthday","state","party","incumbent","termstart","age"];
    let check = 0;
    for(let i = 0; i<keys.length;i++)
    {
        if(keys[i] in newbie)
            check++;
    }

    if(check === 13)
    {
        congressAccounts.push(newbie);
        response.status(200);
        response.json("http://localhost:9999/Politician/"+newbie.bioguide);
        response.send();
    }
    response.status(400);
    response.json("invalid fields");
    response.send();
})

router.put("/Politician/:bioguide", (request, response)=>{
    let bio_guide = request.params.bioguide;
    let update = request.body;
    let existing = {};

    const keys = ["congress","chamber","bioguide","firstname","middlename","lastname","suffix","birthday","state","party","incumbent","termstart","age"];
    let check = 0;
    for(let i = 0; i<keys.length;i++)
    {
        if(keys[i] in update)
            check++;
    }

    if(check !== 13)
    {
        response.status(400);
        response.json("invalid update");
        response.send();

    }

    else {


        for(let person of congressAccounts)
        {
            if(person.bioguide === bio_guide)
            {
                response.status(200);
                existing = person;

            }
        }

        if(existing === {})
        {
            response.status(404);
            response.json("bioguide not found");
            response.send();
        }

        Object.assign(existing,update);
        response.json("successfully updated");
        response.send();
    }












})

router.delete("/Politician/:bioguide", (request, response)=> {
    let bio_guide = request.params.bioguide;
    let to_delete = -1;
    let index = 0;

    while (index < congressAccounts.length) {
        if (congressAccounts[index].bioguide === bio_guide) {
            response.status(200);
            to_delete = index;
        }
        index++;
    }

    if (to_delete === -1) {
        response.status(404);
        response.json("bioguide not found");
        response.send();
    } else
    {
        congressAccounts.splice(to_delete,1);
        response.status(200);
        response.json( bio_guide+" was deleted");
        response.send();
    }


})


export default router;