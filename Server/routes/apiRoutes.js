const express = require("express");

const signinRoute = require("./auth/signin");
const signupRoute = require("./auth/signup");

const getDevelopersRouter = require("./developer/getDevelopers");
const getMappedDevelopersRouter = require("./developer/getMappedDevelopers");
const getUnmappedDevelopersRouter = require("./developer/getUnmappedDevelopers");
const deleteDeveloperRouter = require("./developer/deleteDeveloper");

const getManagersRouter = require("./manager/getManagers");

const deleteTaskRouter = require("./task/deleteTask");
const getTaskDurationRouter = require("./task/getTaskDuration");
const getTasksRouter = require("./task/getTasks");
const insertDurationRouter = require("./task/insertDuration");
const insertTaskRouter = require("./task/insertTask");
const updateTaskRouter = require("./task/updateTask");

const insertteamsRouter = require("./team/insertTeams");
const deleteTeamRouter = require("./team/deleteTeam");

const updateUserRouter = require("./user/updateUser");
const deleteUserRouter = require("./user/deleteUser");

const router = express.Router();

router.use("/login", signinRoute);
router.use("/signup", signupRoute);

router.use("/getDevelopers", getDevelopersRouter);
router.use("/getMappedDevelopers", getMappedDevelopersRouter);
router.use("/getUnmappedDevelopers", getUnmappedDevelopersRouter);
router.use("/deleteDeveloper", deleteDeveloperRouter);

router.use("/getManagers", getManagersRouter);

router.use("/deleteTask", deleteTaskRouter);
router.use("/getTaskDuration", getTaskDurationRouter);
router.use("/getTasks", getTasksRouter);
router.use("/insertDuration", insertDurationRouter);
router.use("/insertTask", insertTaskRouter);
router.use("/updateTask", updateTaskRouter);

router.use("/insertteams", insertteamsRouter);
router.use("/deleteTeam", deleteTeamRouter);

router.use("/updateUserProfile", updateUserRouter);
router.use("/deleteUser", deleteUserRouter);

module.exports = router;
