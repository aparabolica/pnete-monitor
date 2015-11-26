var async = require('async');

module.exports = function(NotificationTask) {

  /*
   * Disable unwanted endpoints
   */
  NotificationTask.disableRemoteMethod("upsert", true);
  NotificationTask.disableRemoteMethod("updateAll", true);
  NotificationTask.disableRemoteMethod("updateAttributes", false);

  NotificationTask.disableRemoteMethod("deleteById", true);
  NotificationTask.disableRemoteMethod("createChangeStream", true);

  NotificationTask.disableRemoteMethod('__create__recipients', false);
  NotificationTask.disableRemoteMethod('__delete__recipients', false);
  NotificationTask.disableRemoteMethod('__destroyById__recipients', false);
  NotificationTask.disableRemoteMethod('__updateById__recipients', false);

  NotificationTask.disableRemoteMethod('__link__recipients', false);
  NotificationTask.disableRemoteMethod('__unlink__recipients', false);

  /*
   * Remote hooks
   */

  NotificationTask.afterRemote('create', function(ctx, task, next){
    var Cycle = NotificationTask.app.models.Cycle;
    var Organization = NotificationTask.app.models.Organization;
    var NotificationEmail = NotificationTask.app.models.NotificationEmail;
    var User = NotificationTask.app.models.User;
    var orgs;
    var users;

    // a list of orgs is passed?
    if (task.organizations) {
      // yes, fire emails just for them
      async.eachSeries(task.organizations, createEmailToOrg, next);
    } else {
      // no, sent to all orgs in active cycle
      fetchActiveOrgs(function(err, orgs){
        if (err) return next(err);
        async.eachSeries(orgs, createEmailToOrg, next);
      });
    }

    function createEmailToOrg(org, doneCreateEmailToOrg){
      Organization.include(org, 'members', function(err, populatedOrg){
        if (err) return doneCreateEmailToOrg(err);
        var members = populatedOrg.members;
        if (members.length) {
          async.eachSeries(members, function(member, doneMember){
            NotificationEmail.create({
              recipientId: member.id,
              organizationId: org.id,
              notificationId: task.id,
              status: 'pending'
            }, doneMember);
          }, doneCreateEmailToOrg);
        } else doneCreateEmailToOrg();
      })
    }

    // for each organization in cycle,
    function fetchActiveOrgs(doneFetchActiveOrgs) {
      Cycle.findOne({
        active: true,
        include: {enrollees: 'members'}
      }, function(err, cycle){
        cycle = cycle.toJSON();
        doneFetchActiveOrgs(err, cycle.enrollees);
      });
    }
  });

};
