# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.


## Solution Description
Currently, `internal database id` is being used to fetch Agents and is already a part of metadata in required places. We want to use the `custom id` for the same purpose that `internal database id` is currently serving. Hence, the proposed solution considers to impose the restriction at the backend level so as to separate the concerns. We would use `custom id` as `internal database id` itself. This solution also removes any further co-relation table or calls to database which would have been required if we would have to save `custom id` separately. All the integrity is segregrated and pushed onto the Database. 

## Your Breakdown Here
1. Create unique constraint in database for `internal database id`

   Description - As a part of this task, we need to add unique constraint on `internal database id` field in `Agents` table

   Acceptance criteria - Unique constraint to be set on the `Agents` table

   Estimate - 1 point


2. Expose an API which allows `internal database id` as an input for a new Agent

   Description - As a part of this task, we need to modify the current `createAgent` API to honor `customId` property as well. This optional property will be passed from frontend while creating an agent. `customId` is mapped as `internal database id` at the backend. If it is not specified, backend defaults to the automatic `internal database id` generation. 

   Acceptance criteria - API able to create agent with specified customId or auto-generated `internal database id`. In case of non-unique customId, api should throw an error with `httpStatusCode` 409.

   Estimate - 2 points
3. Allow user to specify `customId` while creating Agent

   Descritpion - Add a textbox with label `Custom Id` that allows user to enter numeric digits upto length 10. This value will correspond to `customId` property in Agent data. This field will be typecasted to BigInt before sending to `createAgent` api

   Acceptance criteria - User is able to enter upto 10 digits in the `Custom Id` textbox while creating Agent. Handle error from backend and show message `This id already refers to a different Agent. Please retry with a different id` on error code 409.

   Estimate - 3 points