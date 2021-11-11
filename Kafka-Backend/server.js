const express = require("express");
const mongoose = require("mongoose");

// connect to db
var pool = require('./config/dbConnection.js');

// var getProfile = require("./services/getProfile");
// var updateProfile = require("./services/updateProfile");

// var getInvitesMygroup = require("./services/MyGroup/getInvitesMygroup");
// var getJoinedMygroup = require("./services/MyGroup/getJoinedMygroups");
// var joinGroup = require("./services/MyGroup/joinGroupMygroup");
// var getGroup = require("./services/MyGroup/getGroupsMygroup");
// var leaveGroup = require("./services/MyGroup/leaveGroup");

// var userDefaultCurrency = require("./services/Group/userDetails");
// var groupExpense = require("./services/Group/groupExpense");
// var oweDetails = require("./services/Group/oweDetails");
// var addExpense = require("./services/Group/addExpense");
// var addComment = require("./services/Group/addComment");
// var deleteComment = require("./services/Group/deleteComment");

// var getName = require("./services/CreateGroup/getName");
// var getEmail = require("./services/CreateGroup/getEmail");
// var CreateGroup = require("./services/CreateGroup/create");

// var getIds = require("./services/Dashboard/getIDs");
// var getNames = require("./services/Dashboard/getNames");
// var getOwe = require("./services/Dashboard/getOwe");
// var getTotalGet = require("./services/Dashboard/getTotalGet");
// var getSettlePerson = require("./services/Dashboard/getPerson");
// var settle = require("./services/Dashboard/settle");

// var groupNames = require("./services/RecentActivity/groupNames");
// var activity = require("./services/RecentActivity/recentActivity");

let login = require("./services/login.js");
let getAllDishes = require("./services/getAllDishes");
let deleteDish = require("./services/deleteDish");

var connection = new require("./kafka/Connection");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  console.log("in handle topic req");
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function (err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      // console.log("payload created")
      // console.log(payloads)
      producer.send(payloads, function (err, data) {
        console.log(data);
      });
      return;
    });
  });
}

// handleTopicRequest("get_profile", getProfile);
// handleTopicRequest("update_profile", updateProfile);

// handleTopicRequest("get_invites", getInvitesMygroup);
// handleTopicRequest("get_joined", getJoinedMygroup);
// handleTopicRequest("join_group", joinGroup);
// handleTopicRequest("get_groups", getGroup);
// handleTopicRequest("leave_group", leaveGroup);

// handleTopicRequest("user_details", userDefaultCurrency);
// handleTopicRequest("group_expense", groupExpense);
// handleTopicRequest("owe_details", oweDetails);
// handleTopicRequest("add_expense", addExpense);
// handleTopicRequest("add_comment", addComment);
// handleTopicRequest("delete_comment", deleteComment);

// handleTopicRequest("get_Name", getName);
// handleTopicRequest("get_email", getEmail);
// handleTopicRequest("create_group", CreateGroup);

// handleTopicRequest("get_ids", getIds);
// handleTopicRequest("get_names", getNames);
// handleTopicRequest("get_owe", getOwe);
// handleTopicRequest("get_totalGet", getTotalGet);
// handleTopicRequest("get_person", getSettlePerson);
// handleTopicRequest("post_settle", settle);

// handleTopicRequest("get_gnames", groupNames);
// handleTopicRequest("get_activity", activity);

handleTopicRequest('login', login);
handleTopicRequest('get_all_dishes', getAllDishes);
handleTopicRequest('delete_dish', deleteDish);

// app.listen(3002, () => {
//     console.log("running on the port 3002");
//   });
//   module.exports = app;
