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
    var orgs = ctx.req.body.organizations;
    var users;

    // a list of orgs is passed?
    if (orgs && orgs.length) {
      // yes, fire emails just for them
      async.eachSeries(orgs, function(orgId,doneEach){
        Organization.findById(orgId, {include: ['members']}, function(err, org){
          createEmailToOrg(org, doneEach);
        });
      }, next);
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
        if (populatedOrg.toJSON) populatedOrg = populatedOrg.toJSON();
        var members = populatedOrg.members;
        if (members.length) {
          async.eachSeries(members, function(member, doneMember){
            NotificationEmail.create({
              recipientId: member.id,
              organizationId: org.id,
              taskId: task.id,
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
