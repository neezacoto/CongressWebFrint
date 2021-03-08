

import fs from 'fs';

// congress_accounts holds everyone
let congress_accounts = [];

/**
 *parses the congress.cvs
 * @param errors
 * @param file_contents
 */


function parse_congress(errors, file_contents)
{
    if (errors != null){
        console.log(JSON.stringify(errors));
    }
    else{

        // current_member holds a line of information split up
        let current_member;
        // current_member_info with their assigned headers
        let current_member_info;
        // all the senate members
        let senate = [];
        // all the house members
        let house = [];

        //shifting the first line into it's own variable
        let congress_lines = file_contents.split("\n");
        // contains a list of the header
        let header = congress_lines.shift().trim().split(",");

        // first we want to get each line of the congress person
        for(let i = 0; i<congress_lines.length;i++) {

            // goes through each line
            current_member = congress_lines[i].split(",");
            /*
            this can also be written as "current_member_info = new Object()"
            this is done so we can flush out the current member because it's meant to temporarily hold
            user information to then be stored into the house or senate, then into the house.
             */
            current_member_info = {};

            //now we check the information of each member with the header to create a member object
            for (let j = 0; j < current_member.length; j++)
            {
                // this adds to a new element to the dictionary to update an existing one it would be
                //dict.header[j] = current_member;
                if(header[j]==="age")
                {
                    current_member_info[header[j]] = parseFloat(current_member[j]);
                }
                else
                {
                    current_member_info[header[j]] = current_member[j];
                }


                //now we'll add them to the respective chamber

            }

            congress_accounts.push(current_member_info);
        }

    }

    return congress_accounts;

}

export default function getCongressPeople()
{
    return congress_accounts;
}

fs.readFile('congress.csv', 'utf-8' , parse_congress);


