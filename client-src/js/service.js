(function(window, angular, undefined) {'use strict';

var urlBase = "/api/v1";
var authHeader = 'authorization';

/**
 * @ngdoc overview
 * @name pnete.service
 * @module
 * @description
 *
 * The `pnete.service` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
var module = angular.module("pnete.service", ['ngResource']);

/**
 * @ngdoc object
 * @name pnete.service.Email
 * @header pnete.service.Email
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Email` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Email",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Emails/:id",
      { 'id': '@id' },
      {
      }
    );




    /**
    * @ngdoc property
    * @name pnete.service.Email#modelName
    * @propertyOf pnete.service.Email
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Email`.
    */
    R.modelName = "Email";


    return R;
  }]);

/**
 * @ngdoc object
 * @name pnete.service.Organization
 * @header pnete.service.Organization
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Organization` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Organization",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/organizations/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Organization.members.findById() instead.
        "prototype$__findById__members": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/members/:fk",
          method: "GET"
        },

        // INTERNAL. Use Organization.members.destroyById() instead.
        "prototype$__destroyById__members": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/members/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Organization.members.updateById() instead.
        "prototype$__updateById__members": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/members/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Organization.members.link() instead.
        "prototype$__link__members": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/members/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Organization.members.unlink() instead.
        "prototype$__unlink__members": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/members/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Organization.members.exists() instead.
        "prototype$__exists__members": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/members/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Organization.indicators.findById() instead.
        "prototype$__findById__indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/indicators/:fk",
          method: "GET"
        },

        // INTERNAL. Use Organization.indicators.destroyById() instead.
        "prototype$__destroyById__indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/indicators/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Organization.indicators.updateById() instead.
        "prototype$__updateById__indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/indicators/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Organization.indicators.link() instead.
        "prototype$__link__indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/indicators/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Organization.indicators.unlink() instead.
        "prototype$__unlink__indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/indicators/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Organization.indicators.exists() instead.
        "prototype$__exists__indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/indicators/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Organization.members() instead.
        "prototype$__get__members": {
          isArray: true,
          url: urlBase + "/organizations/:id/members",
          method: "GET"
        },

        // INTERNAL. Use Organization.members.create() instead.
        "prototype$__create__members": {
          url: urlBase + "/organizations/:id/members",
          method: "POST"
        },

        // INTERNAL. Use Organization.members.destroyAll() instead.
        "prototype$__delete__members": {
          url: urlBase + "/organizations/:id/members",
          method: "DELETE"
        },

        // INTERNAL. Use Organization.members.count() instead.
        "prototype$__count__members": {
          url: urlBase + "/organizations/:id/members/count",
          method: "GET"
        },

        // INTERNAL. Use Organization.indicators() instead.
        "prototype$__get__indicators": {
          isArray: true,
          url: urlBase + "/organizations/:id/indicators",
          method: "GET"
        },

        // INTERNAL. Use Organization.indicators.create() instead.
        "prototype$__create__indicators": {
          url: urlBase + "/organizations/:id/indicators",
          method: "POST"
        },

        // INTERNAL. Use Organization.indicators.destroyAll() instead.
        "prototype$__delete__indicators": {
          url: urlBase + "/organizations/:id/indicators",
          method: "DELETE"
        },

        // INTERNAL. Use Organization.indicators.count() instead.
        "prototype$__count__indicators": {
          url: urlBase + "/organizations/:id/indicators/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Organization#create
         * @methodOf pnete.service.Organization
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/organizations",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Organization#createMany
         * @methodOf pnete.service.Organization
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/organizations",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Organization#upsert
         * @methodOf pnete.service.Organization
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/organizations",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Organization#exists
         * @methodOf pnete.service.Organization
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/organizations/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Organization#findById
         * @methodOf pnete.service.Organization
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/organizations/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Organization#find
         * @methodOf pnete.service.Organization
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/organizations",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Organization#findOne
         * @methodOf pnete.service.Organization
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/organizations/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Organization#updateAll
         * @methodOf pnete.service.Organization
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/organizations/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Organization#deleteById
         * @methodOf pnete.service.Organization
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/organizations/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Organization#count
         * @methodOf pnete.service.Organization
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/organizations/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Organization#prototype$updateAttributes
         * @methodOf pnete.service.Organization
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/organizations/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Organization#createChangeStream
         * @methodOf pnete.service.Organization
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/organizations/change-stream",
          method: "POST"
        },

        // INTERNAL. Use User.organizations.findById() instead.
        "::findById::user::organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/organizations/:fk",
          method: "GET"
        },

        // INTERNAL. Use User.organizations.destroyById() instead.
        "::destroyById::user::organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/organizations/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.organizations.updateById() instead.
        "::updateById::user::organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/organizations/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.organizations.link() instead.
        "::link::user::organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/organizations/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.organizations.unlink() instead.
        "::unlink::user::organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/organizations/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.organizations.exists() instead.
        "::exists::user::organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/organizations/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use User.organizations() instead.
        "::get::user::organizations": {
          isArray: true,
          url: urlBase + "/users/:id/organizations",
          method: "GET"
        },

        // INTERNAL. Use User.organizations.create() instead.
        "::create::user::organizations": {
          url: urlBase + "/users/:id/organizations",
          method: "POST"
        },

        // INTERNAL. Use User.organizations.createMany() instead.
        "::createMany::user::organizations": {
          isArray: true,
          url: urlBase + "/users/:id/organizations",
          method: "POST"
        },

        // INTERNAL. Use User.organizations.destroyAll() instead.
        "::delete::user::organizations": {
          url: urlBase + "/users/:id/organizations",
          method: "DELETE"
        },

        // INTERNAL. Use User.organizations.count() instead.
        "::count::user::organizations": {
          url: urlBase + "/users/:id/organizations/count",
          method: "GET"
        },

        // INTERNAL. Use Indicator.organizations.findById() instead.
        "::findById::Indicator::organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/organizations/:fk",
          method: "GET"
        },

        // INTERNAL. Use Indicator.organizations.destroyById() instead.
        "::destroyById::Indicator::organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/organizations/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Indicator.organizations.updateById() instead.
        "::updateById::Indicator::organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/organizations/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Indicator.organizations.link() instead.
        "::link::Indicator::organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/organizations/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Indicator.organizations.unlink() instead.
        "::unlink::Indicator::organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/organizations/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Indicator.organizations.exists() instead.
        "::exists::Indicator::organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/organizations/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Indicator.organizations() instead.
        "::get::Indicator::organizations": {
          isArray: true,
          url: urlBase + "/indicators/:id/organizations",
          method: "GET"
        },

        // INTERNAL. Use Indicator.organizations.create() instead.
        "::create::Indicator::organizations": {
          url: urlBase + "/indicators/:id/organizations",
          method: "POST"
        },

        // INTERNAL. Use Indicator.organizations.createMany() instead.
        "::createMany::Indicator::organizations": {
          isArray: true,
          url: urlBase + "/indicators/:id/organizations",
          method: "POST"
        },

        // INTERNAL. Use Indicator.organizations.destroyAll() instead.
        "::delete::Indicator::organizations": {
          url: urlBase + "/indicators/:id/organizations",
          method: "DELETE"
        },

        // INTERNAL. Use Indicator.organizations.count() instead.
        "::count::Indicator::organizations": {
          url: urlBase + "/indicators/:id/organizations/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name pnete.service.Organization#updateOrCreate
         * @methodOf pnete.service.Organization
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name pnete.service.Organization#update
         * @methodOf pnete.service.Organization
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name pnete.service.Organization#destroyById
         * @methodOf pnete.service.Organization
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name pnete.service.Organization#removeById
         * @methodOf pnete.service.Organization
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name pnete.service.Organization#modelName
    * @propertyOf pnete.service.Organization
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Organization`.
    */
    R.modelName = "Organization";

    /**
     * @ngdoc object
     * @name pnete.service.Organization.members
     * @header pnete.service.Organization.members
     * @object
     * @description
     *
     * The object `Organization.members` groups methods
     * manipulating `User` instances related to `Organization`.
     *
     * Call {@link pnete.service.Organization#members Organization.members()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name pnete.service.Organization#members
         * @methodOf pnete.service.Organization
         *
         * @description
         *
         * Queries members of Organization.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.members = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::get::Organization::members"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Organization.members#count
         * @methodOf pnete.service.Organization.members
         *
         * @description
         *
         * Counts members of Organization.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.members.count = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::count::Organization::members"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Organization.members#create
         * @methodOf pnete.service.Organization.members
         *
         * @description
         *
         * Creates a new instance in members of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.members.create = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::create::Organization::members"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Organization.members#createMany
         * @methodOf pnete.service.Organization.members
         *
         * @description
         *
         * Creates a new instance in members of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.members.createMany = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::createMany::Organization::members"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Organization.members#destroyAll
         * @methodOf pnete.service.Organization.members
         *
         * @description
         *
         * Deletes all members of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.members.destroyAll = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::delete::Organization::members"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Organization.members#destroyById
         * @methodOf pnete.service.Organization.members
         *
         * @description
         *
         * Delete a related item by id for members.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for members
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.members.destroyById = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::destroyById::Organization::members"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Organization.members#exists
         * @methodOf pnete.service.Organization.members
         *
         * @description
         *
         * Check the existence of members relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for members
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.members.exists = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::exists::Organization::members"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Organization.members#findById
         * @methodOf pnete.service.Organization.members
         *
         * @description
         *
         * Find a related item by id for members.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for members
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.members.findById = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::findById::Organization::members"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Organization.members#link
         * @methodOf pnete.service.Organization.members
         *
         * @description
         *
         * Add a related item by id for members.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for members
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.members.link = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::link::Organization::members"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Organization.members#unlink
         * @methodOf pnete.service.Organization.members
         *
         * @description
         *
         * Remove the members relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for members
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.members.unlink = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::unlink::Organization::members"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Organization.members#updateById
         * @methodOf pnete.service.Organization.members
         *
         * @description
         *
         * Update a related item by id for members.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for members
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.members.updateById = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::updateById::Organization::members"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name pnete.service.Organization.indicators
     * @header pnete.service.Organization.indicators
     * @object
     * @description
     *
     * The object `Organization.indicators` groups methods
     * manipulating `Indicator` instances related to `Organization`.
     *
     * Call {@link pnete.service.Organization#indicators Organization.indicators()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name pnete.service.Organization#indicators
         * @methodOf pnete.service.Organization
         *
         * @description
         *
         * Queries indicators of Organization.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::get::Organization::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Organization.indicators#count
         * @methodOf pnete.service.Organization.indicators
         *
         * @description
         *
         * Counts indicators of Organization.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.indicators.count = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::count::Organization::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Organization.indicators#create
         * @methodOf pnete.service.Organization.indicators
         *
         * @description
         *
         * Creates a new instance in indicators of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators.create = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::create::Organization::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Organization.indicators#createMany
         * @methodOf pnete.service.Organization.indicators
         *
         * @description
         *
         * Creates a new instance in indicators of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators.createMany = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::createMany::Organization::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Organization.indicators#destroyAll
         * @methodOf pnete.service.Organization.indicators
         *
         * @description
         *
         * Deletes all indicators of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.indicators.destroyAll = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::delete::Organization::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Organization.indicators#destroyById
         * @methodOf pnete.service.Organization.indicators
         *
         * @description
         *
         * Delete a related item by id for indicators.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for indicators
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.indicators.destroyById = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::destroyById::Organization::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Organization.indicators#exists
         * @methodOf pnete.service.Organization.indicators
         *
         * @description
         *
         * Check the existence of indicators relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for indicators
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators.exists = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::exists::Organization::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Organization.indicators#findById
         * @methodOf pnete.service.Organization.indicators
         *
         * @description
         *
         * Find a related item by id for indicators.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for indicators
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators.findById = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::findById::Organization::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Organization.indicators#link
         * @methodOf pnete.service.Organization.indicators
         *
         * @description
         *
         * Add a related item by id for indicators.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for indicators
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators.link = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::link::Organization::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Organization.indicators#unlink
         * @methodOf pnete.service.Organization.indicators
         *
         * @description
         *
         * Remove the indicators relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for indicators
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.indicators.unlink = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::unlink::Organization::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Organization.indicators#updateById
         * @methodOf pnete.service.Organization.indicators
         *
         * @description
         *
         * Update a related item by id for indicators.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for indicators
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators.updateById = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::updateById::Organization::indicators"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name pnete.service.User
 * @header pnete.service.User
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `User` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "User",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/users/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name pnete.service.User#prototype$__findById__accessTokens
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Find a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/accessTokens/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#prototype$__destroyById__accessTokens
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Delete a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/accessTokens/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#prototype$__updateById__accessTokens
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Update a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/accessTokens/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.organizations.findById() instead.
        "prototype$__findById__organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/organizations/:fk",
          method: "GET"
        },

        // INTERNAL. Use User.organizations.destroyById() instead.
        "prototype$__destroyById__organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/organizations/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.organizations.updateById() instead.
        "prototype$__updateById__organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/organizations/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.organizations.link() instead.
        "prototype$__link__organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/organizations/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.organizations.unlink() instead.
        "prototype$__unlink__organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/organizations/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.organizations.exists() instead.
        "prototype$__exists__organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/organizations/rel/:fk",
          method: "HEAD"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#prototype$__get__accessTokens
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Queries accessTokens of user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/users/:id/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#prototype$__create__accessTokens
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/users/:id/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#prototype$__delete__accessTokens
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/users/:id/accessTokens",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#prototype$__count__accessTokens
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Counts accessTokens of user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/users/:id/accessTokens/count",
          method: "GET"
        },

        // INTERNAL. Use User.organizations() instead.
        "prototype$__get__organizations": {
          isArray: true,
          url: urlBase + "/users/:id/organizations",
          method: "GET"
        },

        // INTERNAL. Use User.organizations.create() instead.
        "prototype$__create__organizations": {
          url: urlBase + "/users/:id/organizations",
          method: "POST"
        },

        // INTERNAL. Use User.organizations.destroyAll() instead.
        "prototype$__delete__organizations": {
          url: urlBase + "/users/:id/organizations",
          method: "DELETE"
        },

        // INTERNAL. Use User.organizations.count() instead.
        "prototype$__count__organizations": {
          url: urlBase + "/users/:id/organizations/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#create
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/users",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#createMany
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/users",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#upsert
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/users",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#exists
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/users/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#findById
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/users/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#find
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/users",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#findOne
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/users/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#updateAll
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/users/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#deleteById
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/users/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#count
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/users/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#prototype$updateAttributes
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/users/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#createChangeStream
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/users/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#login
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Login a user with username/email and password.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         * 
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         * 
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/users/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#logout
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Logout a user with access token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/users/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#confirm
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Confirm a user registration with email verification token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` - 
         *
         *  - `token` – `{string}` - 
         *
         *  - `redirect` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/users/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#resetPassword
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Reset password for a user with email.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/users/reset",
          method: "POST"
        },

        // INTERNAL. Use Organization.members.findById() instead.
        "::findById::Organization::members": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/members/:fk",
          method: "GET"
        },

        // INTERNAL. Use Organization.members.destroyById() instead.
        "::destroyById::Organization::members": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/members/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Organization.members.updateById() instead.
        "::updateById::Organization::members": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/members/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Organization.members.link() instead.
        "::link::Organization::members": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/members/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Organization.members.unlink() instead.
        "::unlink::Organization::members": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/members/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Organization.members.exists() instead.
        "::exists::Organization::members": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/members/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Organization.members() instead.
        "::get::Organization::members": {
          isArray: true,
          url: urlBase + "/organizations/:id/members",
          method: "GET"
        },

        // INTERNAL. Use Organization.members.create() instead.
        "::create::Organization::members": {
          url: urlBase + "/organizations/:id/members",
          method: "POST"
        },

        // INTERNAL. Use Organization.members.createMany() instead.
        "::createMany::Organization::members": {
          isArray: true,
          url: urlBase + "/organizations/:id/members",
          method: "POST"
        },

        // INTERNAL. Use Organization.members.destroyAll() instead.
        "::delete::Organization::members": {
          url: urlBase + "/organizations/:id/members",
          method: "DELETE"
        },

        // INTERNAL. Use Organization.members.count() instead.
        "::count::Organization::members": {
          url: urlBase + "/organizations/:id/members/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.User#getCurrent
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/users" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name pnete.service.User#updateOrCreate
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name pnete.service.User#update
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name pnete.service.User#destroyById
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name pnete.service.User#removeById
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name pnete.service.User#getCachedCurrent
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link pnete.service.User#login} or
         * {@link pnete.service.User#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A User instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name pnete.service.User#isAuthenticated
         * @methodOf pnete.service.User
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name pnete.service.User#getCurrentId
         * @methodOf pnete.service.User
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name pnete.service.User#modelName
    * @propertyOf pnete.service.User
    * @description
    * The name of the model represented by this $resource,
    * i.e. `User`.
    */
    R.modelName = "User";

    /**
     * @ngdoc object
     * @name pnete.service.User.organizations
     * @header pnete.service.User.organizations
     * @object
     * @description
     *
     * The object `User.organizations` groups methods
     * manipulating `Organization` instances related to `User`.
     *
     * Call {@link pnete.service.User#organizations User.organizations()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name pnete.service.User#organizations
         * @methodOf pnete.service.User
         *
         * @description
         *
         * Queries organizations of user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        R.organizations = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::get::user::organizations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.User.organizations#count
         * @methodOf pnete.service.User.organizations
         *
         * @description
         *
         * Counts organizations of user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.organizations.count = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::count::user::organizations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.User.organizations#create
         * @methodOf pnete.service.User.organizations
         *
         * @description
         *
         * Creates a new instance in organizations of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        R.organizations.create = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::create::user::organizations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.User.organizations#createMany
         * @methodOf pnete.service.User.organizations
         *
         * @description
         *
         * Creates a new instance in organizations of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        R.organizations.createMany = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::createMany::user::organizations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.User.organizations#destroyAll
         * @methodOf pnete.service.User.organizations
         *
         * @description
         *
         * Deletes all organizations of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.organizations.destroyAll = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::delete::user::organizations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.User.organizations#destroyById
         * @methodOf pnete.service.User.organizations
         *
         * @description
         *
         * Delete a related item by id for organizations.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for organizations
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.organizations.destroyById = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::destroyById::user::organizations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.User.organizations#exists
         * @methodOf pnete.service.User.organizations
         *
         * @description
         *
         * Check the existence of organizations relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for organizations
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        R.organizations.exists = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::exists::user::organizations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.User.organizations#findById
         * @methodOf pnete.service.User.organizations
         *
         * @description
         *
         * Find a related item by id for organizations.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for organizations
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        R.organizations.findById = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::findById::user::organizations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.User.organizations#link
         * @methodOf pnete.service.User.organizations
         *
         * @description
         *
         * Add a related item by id for organizations.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for organizations
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        R.organizations.link = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::link::user::organizations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.User.organizations#unlink
         * @methodOf pnete.service.User.organizations
         *
         * @description
         *
         * Remove the organizations relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for organizations
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.organizations.unlink = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::unlink::user::organizations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.User.organizations#updateById
         * @methodOf pnete.service.User.organizations
         *
         * @description
         *
         * Update a related item by id for organizations.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for organizations
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        R.organizations.updateById = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::updateById::user::organizations"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name pnete.service.Axis
 * @header pnete.service.Axis
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Axis` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Axis",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/axes/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Axis.actions.findById() instead.
        "prototype$__findById__actions": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/axes/:id/actions/:fk",
          method: "GET"
        },

        // INTERNAL. Use Axis.actions.destroyById() instead.
        "prototype$__destroyById__actions": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/axes/:id/actions/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Axis.actions.updateById() instead.
        "prototype$__updateById__actions": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/axes/:id/actions/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Axis.indicators.findById() instead.
        "prototype$__findById__indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/axes/:id/indicators/:fk",
          method: "GET"
        },

        // INTERNAL. Use Axis.indicators.destroyById() instead.
        "prototype$__destroyById__indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/axes/:id/indicators/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Axis.indicators.updateById() instead.
        "prototype$__updateById__indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/axes/:id/indicators/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Axis.actions() instead.
        "prototype$__get__actions": {
          isArray: true,
          url: urlBase + "/axes/:id/actions",
          method: "GET"
        },

        // INTERNAL. Use Axis.actions.create() instead.
        "prototype$__create__actions": {
          url: urlBase + "/axes/:id/actions",
          method: "POST"
        },

        // INTERNAL. Use Axis.actions.destroyAll() instead.
        "prototype$__delete__actions": {
          url: urlBase + "/axes/:id/actions",
          method: "DELETE"
        },

        // INTERNAL. Use Axis.actions.count() instead.
        "prototype$__count__actions": {
          url: urlBase + "/axes/:id/actions/count",
          method: "GET"
        },

        // INTERNAL. Use Axis.indicators() instead.
        "prototype$__get__indicators": {
          isArray: true,
          url: urlBase + "/axes/:id/indicators",
          method: "GET"
        },

        // INTERNAL. Use Axis.indicators.create() instead.
        "prototype$__create__indicators": {
          url: urlBase + "/axes/:id/indicators",
          method: "POST"
        },

        // INTERNAL. Use Axis.indicators.destroyAll() instead.
        "prototype$__delete__indicators": {
          url: urlBase + "/axes/:id/indicators",
          method: "DELETE"
        },

        // INTERNAL. Use Axis.indicators.count() instead.
        "prototype$__count__indicators": {
          url: urlBase + "/axes/:id/indicators/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Axis#create
         * @methodOf pnete.service.Axis
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Axis` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/axes",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Axis#createMany
         * @methodOf pnete.service.Axis
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Axis` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/axes",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Axis#upsert
         * @methodOf pnete.service.Axis
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Axis` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/axes",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Axis#exists
         * @methodOf pnete.service.Axis
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/axes/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Axis#findById
         * @methodOf pnete.service.Axis
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Axis` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/axes/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Axis#find
         * @methodOf pnete.service.Axis
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Axis` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/axes",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Axis#findOne
         * @methodOf pnete.service.Axis
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Axis` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/axes/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Axis#updateAll
         * @methodOf pnete.service.Axis
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/axes/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Axis#deleteById
         * @methodOf pnete.service.Axis
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/axes/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Axis#count
         * @methodOf pnete.service.Axis
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/axes/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Axis#prototype$updateAttributes
         * @methodOf pnete.service.Axis
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Axis` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/axes/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Axis#createChangeStream
         * @methodOf pnete.service.Axis
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/axes/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Action.axis() instead.
        "::get::Action::axis": {
          url: urlBase + "/actions/:id/axis",
          method: "GET"
        },

        // INTERNAL. Use Indicator.axis() instead.
        "::get::Indicator::axis": {
          url: urlBase + "/indicators/:id/axis",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name pnete.service.Axis#updateOrCreate
         * @methodOf pnete.service.Axis
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Axis` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name pnete.service.Axis#update
         * @methodOf pnete.service.Axis
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name pnete.service.Axis#destroyById
         * @methodOf pnete.service.Axis
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name pnete.service.Axis#removeById
         * @methodOf pnete.service.Axis
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name pnete.service.Axis#modelName
    * @propertyOf pnete.service.Axis
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Axis`.
    */
    R.modelName = "Axis";

    /**
     * @ngdoc object
     * @name pnete.service.Axis.actions
     * @header pnete.service.Axis.actions
     * @object
     * @description
     *
     * The object `Axis.actions` groups methods
     * manipulating `Action` instances related to `Axis`.
     *
     * Call {@link pnete.service.Axis#actions Axis.actions()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name pnete.service.Axis#actions
         * @methodOf pnete.service.Axis
         *
         * @description
         *
         * Queries actions of Axis.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Action` object.)
         * </em>
         */
        R.actions = function() {
          var TargetResource = $injector.get("Action");
          var action = TargetResource["::get::Axis::actions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Axis.actions#count
         * @methodOf pnete.service.Axis.actions
         *
         * @description
         *
         * Counts actions of Axis.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.actions.count = function() {
          var TargetResource = $injector.get("Action");
          var action = TargetResource["::count::Axis::actions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Axis.actions#create
         * @methodOf pnete.service.Axis.actions
         *
         * @description
         *
         * Creates a new instance in actions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Action` object.)
         * </em>
         */
        R.actions.create = function() {
          var TargetResource = $injector.get("Action");
          var action = TargetResource["::create::Axis::actions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Axis.actions#createMany
         * @methodOf pnete.service.Axis.actions
         *
         * @description
         *
         * Creates a new instance in actions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Action` object.)
         * </em>
         */
        R.actions.createMany = function() {
          var TargetResource = $injector.get("Action");
          var action = TargetResource["::createMany::Axis::actions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Axis.actions#destroyAll
         * @methodOf pnete.service.Axis.actions
         *
         * @description
         *
         * Deletes all actions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.actions.destroyAll = function() {
          var TargetResource = $injector.get("Action");
          var action = TargetResource["::delete::Axis::actions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Axis.actions#destroyById
         * @methodOf pnete.service.Axis.actions
         *
         * @description
         *
         * Delete a related item by id for actions.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for actions
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.actions.destroyById = function() {
          var TargetResource = $injector.get("Action");
          var action = TargetResource["::destroyById::Axis::actions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Axis.actions#findById
         * @methodOf pnete.service.Axis.actions
         *
         * @description
         *
         * Find a related item by id for actions.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for actions
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Action` object.)
         * </em>
         */
        R.actions.findById = function() {
          var TargetResource = $injector.get("Action");
          var action = TargetResource["::findById::Axis::actions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Axis.actions#updateById
         * @methodOf pnete.service.Axis.actions
         *
         * @description
         *
         * Update a related item by id for actions.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for actions
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Action` object.)
         * </em>
         */
        R.actions.updateById = function() {
          var TargetResource = $injector.get("Action");
          var action = TargetResource["::updateById::Axis::actions"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name pnete.service.Axis.indicators
     * @header pnete.service.Axis.indicators
     * @object
     * @description
     *
     * The object `Axis.indicators` groups methods
     * manipulating `Indicator` instances related to `Axis`.
     *
     * Call {@link pnete.service.Axis#indicators Axis.indicators()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name pnete.service.Axis#indicators
         * @methodOf pnete.service.Axis
         *
         * @description
         *
         * Queries indicators of Axis.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::get::Axis::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Axis.indicators#count
         * @methodOf pnete.service.Axis.indicators
         *
         * @description
         *
         * Counts indicators of Axis.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.indicators.count = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::count::Axis::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Axis.indicators#create
         * @methodOf pnete.service.Axis.indicators
         *
         * @description
         *
         * Creates a new instance in indicators of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators.create = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::create::Axis::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Axis.indicators#createMany
         * @methodOf pnete.service.Axis.indicators
         *
         * @description
         *
         * Creates a new instance in indicators of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators.createMany = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::createMany::Axis::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Axis.indicators#destroyAll
         * @methodOf pnete.service.Axis.indicators
         *
         * @description
         *
         * Deletes all indicators of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.indicators.destroyAll = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::delete::Axis::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Axis.indicators#destroyById
         * @methodOf pnete.service.Axis.indicators
         *
         * @description
         *
         * Delete a related item by id for indicators.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for indicators
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.indicators.destroyById = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::destroyById::Axis::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Axis.indicators#findById
         * @methodOf pnete.service.Axis.indicators
         *
         * @description
         *
         * Find a related item by id for indicators.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for indicators
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators.findById = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::findById::Axis::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Axis.indicators#updateById
         * @methodOf pnete.service.Axis.indicators
         *
         * @description
         *
         * Update a related item by id for indicators.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for indicators
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators.updateById = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::updateById::Axis::indicators"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name pnete.service.Action
 * @header pnete.service.Action
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Action` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Action",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/actions/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Action.axis() instead.
        "prototype$__get__axis": {
          url: urlBase + "/actions/:id/axis",
          method: "GET"
        },

        // INTERNAL. Use Action.indicators.findById() instead.
        "prototype$__findById__indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/actions/:id/indicators/:fk",
          method: "GET"
        },

        // INTERNAL. Use Action.indicators.destroyById() instead.
        "prototype$__destroyById__indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/actions/:id/indicators/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Action.indicators.updateById() instead.
        "prototype$__updateById__indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/actions/:id/indicators/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Action.indicators.link() instead.
        "prototype$__link__indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/actions/:id/indicators/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Action.indicators.unlink() instead.
        "prototype$__unlink__indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/actions/:id/indicators/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Action.indicators.exists() instead.
        "prototype$__exists__indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/actions/:id/indicators/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Action.indicators() instead.
        "prototype$__get__indicators": {
          isArray: true,
          url: urlBase + "/actions/:id/indicators",
          method: "GET"
        },

        // INTERNAL. Use Action.indicators.create() instead.
        "prototype$__create__indicators": {
          url: urlBase + "/actions/:id/indicators",
          method: "POST"
        },

        // INTERNAL. Use Action.indicators.destroyAll() instead.
        "prototype$__delete__indicators": {
          url: urlBase + "/actions/:id/indicators",
          method: "DELETE"
        },

        // INTERNAL. Use Action.indicators.count() instead.
        "prototype$__count__indicators": {
          url: urlBase + "/actions/:id/indicators/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Action#create
         * @methodOf pnete.service.Action
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Action` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/actions",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Action#createMany
         * @methodOf pnete.service.Action
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Action` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/actions",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Action#upsert
         * @methodOf pnete.service.Action
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Action` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/actions",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Action#exists
         * @methodOf pnete.service.Action
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/actions/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Action#findById
         * @methodOf pnete.service.Action
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Action` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/actions/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Action#find
         * @methodOf pnete.service.Action
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Action` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/actions",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Action#findOne
         * @methodOf pnete.service.Action
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Action` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/actions/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Action#updateAll
         * @methodOf pnete.service.Action
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/actions/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Action#deleteById
         * @methodOf pnete.service.Action
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/actions/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Action#count
         * @methodOf pnete.service.Action
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/actions/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Action#prototype$updateAttributes
         * @methodOf pnete.service.Action
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Action` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/actions/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Action#createChangeStream
         * @methodOf pnete.service.Action
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/actions/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Axis.actions.findById() instead.
        "::findById::Axis::actions": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/axes/:id/actions/:fk",
          method: "GET"
        },

        // INTERNAL. Use Axis.actions.destroyById() instead.
        "::destroyById::Axis::actions": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/axes/:id/actions/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Axis.actions.updateById() instead.
        "::updateById::Axis::actions": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/axes/:id/actions/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Axis.actions() instead.
        "::get::Axis::actions": {
          isArray: true,
          url: urlBase + "/axes/:id/actions",
          method: "GET"
        },

        // INTERNAL. Use Axis.actions.create() instead.
        "::create::Axis::actions": {
          url: urlBase + "/axes/:id/actions",
          method: "POST"
        },

        // INTERNAL. Use Axis.actions.createMany() instead.
        "::createMany::Axis::actions": {
          isArray: true,
          url: urlBase + "/axes/:id/actions",
          method: "POST"
        },

        // INTERNAL. Use Axis.actions.destroyAll() instead.
        "::delete::Axis::actions": {
          url: urlBase + "/axes/:id/actions",
          method: "DELETE"
        },

        // INTERNAL. Use Axis.actions.count() instead.
        "::count::Axis::actions": {
          url: urlBase + "/axes/:id/actions/count",
          method: "GET"
        },

        // INTERNAL. Use Indicator.actions.findById() instead.
        "::findById::Indicator::actions": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/actions/:fk",
          method: "GET"
        },

        // INTERNAL. Use Indicator.actions.destroyById() instead.
        "::destroyById::Indicator::actions": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/actions/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Indicator.actions.updateById() instead.
        "::updateById::Indicator::actions": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/actions/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Indicator.actions.link() instead.
        "::link::Indicator::actions": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/actions/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Indicator.actions.unlink() instead.
        "::unlink::Indicator::actions": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/actions/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Indicator.actions.exists() instead.
        "::exists::Indicator::actions": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/actions/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Indicator.actions() instead.
        "::get::Indicator::actions": {
          isArray: true,
          url: urlBase + "/indicators/:id/actions",
          method: "GET"
        },

        // INTERNAL. Use Indicator.actions.create() instead.
        "::create::Indicator::actions": {
          url: urlBase + "/indicators/:id/actions",
          method: "POST"
        },

        // INTERNAL. Use Indicator.actions.createMany() instead.
        "::createMany::Indicator::actions": {
          isArray: true,
          url: urlBase + "/indicators/:id/actions",
          method: "POST"
        },

        // INTERNAL. Use Indicator.actions.destroyAll() instead.
        "::delete::Indicator::actions": {
          url: urlBase + "/indicators/:id/actions",
          method: "DELETE"
        },

        // INTERNAL. Use Indicator.actions.count() instead.
        "::count::Indicator::actions": {
          url: urlBase + "/indicators/:id/actions/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name pnete.service.Action#updateOrCreate
         * @methodOf pnete.service.Action
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Action` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name pnete.service.Action#update
         * @methodOf pnete.service.Action
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name pnete.service.Action#destroyById
         * @methodOf pnete.service.Action
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name pnete.service.Action#removeById
         * @methodOf pnete.service.Action
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name pnete.service.Action#modelName
    * @propertyOf pnete.service.Action
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Action`.
    */
    R.modelName = "Action";


        /**
         * @ngdoc method
         * @name pnete.service.Action#axis
         * @methodOf pnete.service.Action
         *
         * @description
         *
         * Fetches belongsTo relation axis.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Axis` object.)
         * </em>
         */
        R.axis = function() {
          var TargetResource = $injector.get("Axis");
          var action = TargetResource["::get::Action::axis"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name pnete.service.Action.indicators
     * @header pnete.service.Action.indicators
     * @object
     * @description
     *
     * The object `Action.indicators` groups methods
     * manipulating `Indicator` instances related to `Action`.
     *
     * Call {@link pnete.service.Action#indicators Action.indicators()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name pnete.service.Action#indicators
         * @methodOf pnete.service.Action
         *
         * @description
         *
         * Queries indicators of Action.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::get::Action::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Action.indicators#count
         * @methodOf pnete.service.Action.indicators
         *
         * @description
         *
         * Counts indicators of Action.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.indicators.count = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::count::Action::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Action.indicators#create
         * @methodOf pnete.service.Action.indicators
         *
         * @description
         *
         * Creates a new instance in indicators of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators.create = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::create::Action::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Action.indicators#createMany
         * @methodOf pnete.service.Action.indicators
         *
         * @description
         *
         * Creates a new instance in indicators of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators.createMany = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::createMany::Action::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Action.indicators#destroyAll
         * @methodOf pnete.service.Action.indicators
         *
         * @description
         *
         * Deletes all indicators of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.indicators.destroyAll = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::delete::Action::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Action.indicators#destroyById
         * @methodOf pnete.service.Action.indicators
         *
         * @description
         *
         * Delete a related item by id for indicators.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for indicators
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.indicators.destroyById = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::destroyById::Action::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Action.indicators#exists
         * @methodOf pnete.service.Action.indicators
         *
         * @description
         *
         * Check the existence of indicators relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for indicators
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators.exists = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::exists::Action::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Action.indicators#findById
         * @methodOf pnete.service.Action.indicators
         *
         * @description
         *
         * Find a related item by id for indicators.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for indicators
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators.findById = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::findById::Action::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Action.indicators#link
         * @methodOf pnete.service.Action.indicators
         *
         * @description
         *
         * Add a related item by id for indicators.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for indicators
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators.link = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::link::Action::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Action.indicators#unlink
         * @methodOf pnete.service.Action.indicators
         *
         * @description
         *
         * Remove the indicators relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for indicators
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.indicators.unlink = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::unlink::Action::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Action.indicators#updateById
         * @methodOf pnete.service.Action.indicators
         *
         * @description
         *
         * Update a related item by id for indicators.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for indicators
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators.updateById = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::updateById::Action::indicators"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name pnete.service.Cicle
 * @header pnete.service.Cicle
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Cicle` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Cicle",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/cicles/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Cicle.indicators.findById() instead.
        "prototype$__findById__indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/cicles/:id/indicators/:fk",
          method: "GET"
        },

        // INTERNAL. Use Cicle.indicators.destroyById() instead.
        "prototype$__destroyById__indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/cicles/:id/indicators/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Cicle.indicators.updateById() instead.
        "prototype$__updateById__indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/cicles/:id/indicators/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Cicle.indicators() instead.
        "prototype$__get__indicators": {
          isArray: true,
          url: urlBase + "/cicles/:id/indicators",
          method: "GET"
        },

        // INTERNAL. Use Cicle.indicators.create() instead.
        "prototype$__create__indicators": {
          url: urlBase + "/cicles/:id/indicators",
          method: "POST"
        },

        // INTERNAL. Use Cicle.indicators.destroyAll() instead.
        "prototype$__delete__indicators": {
          url: urlBase + "/cicles/:id/indicators",
          method: "DELETE"
        },

        // INTERNAL. Use Cicle.indicators.count() instead.
        "prototype$__count__indicators": {
          url: urlBase + "/cicles/:id/indicators/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Cicle#create
         * @methodOf pnete.service.Cicle
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cicle` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/cicles",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Cicle#createMany
         * @methodOf pnete.service.Cicle
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cicle` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/cicles",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Cicle#upsert
         * @methodOf pnete.service.Cicle
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cicle` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/cicles",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Cicle#exists
         * @methodOf pnete.service.Cicle
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/cicles/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Cicle#findById
         * @methodOf pnete.service.Cicle
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cicle` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/cicles/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Cicle#find
         * @methodOf pnete.service.Cicle
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cicle` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/cicles",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Cicle#findOne
         * @methodOf pnete.service.Cicle
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cicle` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/cicles/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Cicle#updateAll
         * @methodOf pnete.service.Cicle
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/cicles/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Cicle#deleteById
         * @methodOf pnete.service.Cicle
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/cicles/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Cicle#count
         * @methodOf pnete.service.Cicle
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/cicles/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Cicle#prototype$updateAttributes
         * @methodOf pnete.service.Cicle
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cicle` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/cicles/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Cicle#createChangeStream
         * @methodOf pnete.service.Cicle
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/cicles/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Indicator.cicle() instead.
        "::get::Indicator::cicle": {
          url: urlBase + "/indicators/:id/cicle",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name pnete.service.Cicle#updateOrCreate
         * @methodOf pnete.service.Cicle
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cicle` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name pnete.service.Cicle#update
         * @methodOf pnete.service.Cicle
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name pnete.service.Cicle#destroyById
         * @methodOf pnete.service.Cicle
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name pnete.service.Cicle#removeById
         * @methodOf pnete.service.Cicle
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name pnete.service.Cicle#modelName
    * @propertyOf pnete.service.Cicle
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Cicle`.
    */
    R.modelName = "Cicle";

    /**
     * @ngdoc object
     * @name pnete.service.Cicle.indicators
     * @header pnete.service.Cicle.indicators
     * @object
     * @description
     *
     * The object `Cicle.indicators` groups methods
     * manipulating `Indicator` instances related to `Cicle`.
     *
     * Call {@link pnete.service.Cicle#indicators Cicle.indicators()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name pnete.service.Cicle#indicators
         * @methodOf pnete.service.Cicle
         *
         * @description
         *
         * Queries indicators of Cicle.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::get::Cicle::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Cicle.indicators#count
         * @methodOf pnete.service.Cicle.indicators
         *
         * @description
         *
         * Counts indicators of Cicle.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.indicators.count = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::count::Cicle::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Cicle.indicators#create
         * @methodOf pnete.service.Cicle.indicators
         *
         * @description
         *
         * Creates a new instance in indicators of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators.create = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::create::Cicle::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Cicle.indicators#createMany
         * @methodOf pnete.service.Cicle.indicators
         *
         * @description
         *
         * Creates a new instance in indicators of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators.createMany = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::createMany::Cicle::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Cicle.indicators#destroyAll
         * @methodOf pnete.service.Cicle.indicators
         *
         * @description
         *
         * Deletes all indicators of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.indicators.destroyAll = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::delete::Cicle::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Cicle.indicators#destroyById
         * @methodOf pnete.service.Cicle.indicators
         *
         * @description
         *
         * Delete a related item by id for indicators.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for indicators
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.indicators.destroyById = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::destroyById::Cicle::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Cicle.indicators#findById
         * @methodOf pnete.service.Cicle.indicators
         *
         * @description
         *
         * Find a related item by id for indicators.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for indicators
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators.findById = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::findById::Cicle::indicators"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Cicle.indicators#updateById
         * @methodOf pnete.service.Cicle.indicators
         *
         * @description
         *
         * Update a related item by id for indicators.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for indicators
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R.indicators.updateById = function() {
          var TargetResource = $injector.get("Indicator");
          var action = TargetResource["::updateById::Cicle::indicators"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name pnete.service.Indicator
 * @header pnete.service.Indicator
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Indicator` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Indicator",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/indicators/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Indicator.axis() instead.
        "prototype$__get__axis": {
          url: urlBase + "/indicators/:id/axis",
          method: "GET"
        },

        // INTERNAL. Use Indicator.cicle() instead.
        "prototype$__get__cicle": {
          url: urlBase + "/indicators/:id/cicle",
          method: "GET"
        },

        // INTERNAL. Use Indicator.organizations.findById() instead.
        "prototype$__findById__organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/organizations/:fk",
          method: "GET"
        },

        // INTERNAL. Use Indicator.organizations.destroyById() instead.
        "prototype$__destroyById__organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/organizations/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Indicator.organizations.updateById() instead.
        "prototype$__updateById__organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/organizations/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Indicator.organizations.link() instead.
        "prototype$__link__organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/organizations/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Indicator.organizations.unlink() instead.
        "prototype$__unlink__organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/organizations/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Indicator.organizations.exists() instead.
        "prototype$__exists__organizations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/organizations/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Indicator.actions.findById() instead.
        "prototype$__findById__actions": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/actions/:fk",
          method: "GET"
        },

        // INTERNAL. Use Indicator.actions.destroyById() instead.
        "prototype$__destroyById__actions": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/actions/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Indicator.actions.updateById() instead.
        "prototype$__updateById__actions": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/actions/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Indicator.actions.link() instead.
        "prototype$__link__actions": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/actions/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Indicator.actions.unlink() instead.
        "prototype$__unlink__actions": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/actions/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Indicator.actions.exists() instead.
        "prototype$__exists__actions": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/indicators/:id/actions/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Indicator.organizations() instead.
        "prototype$__get__organizations": {
          isArray: true,
          url: urlBase + "/indicators/:id/organizations",
          method: "GET"
        },

        // INTERNAL. Use Indicator.organizations.create() instead.
        "prototype$__create__organizations": {
          url: urlBase + "/indicators/:id/organizations",
          method: "POST"
        },

        // INTERNAL. Use Indicator.organizations.destroyAll() instead.
        "prototype$__delete__organizations": {
          url: urlBase + "/indicators/:id/organizations",
          method: "DELETE"
        },

        // INTERNAL. Use Indicator.organizations.count() instead.
        "prototype$__count__organizations": {
          url: urlBase + "/indicators/:id/organizations/count",
          method: "GET"
        },

        // INTERNAL. Use Indicator.actions() instead.
        "prototype$__get__actions": {
          isArray: true,
          url: urlBase + "/indicators/:id/actions",
          method: "GET"
        },

        // INTERNAL. Use Indicator.actions.create() instead.
        "prototype$__create__actions": {
          url: urlBase + "/indicators/:id/actions",
          method: "POST"
        },

        // INTERNAL. Use Indicator.actions.destroyAll() instead.
        "prototype$__delete__actions": {
          url: urlBase + "/indicators/:id/actions",
          method: "DELETE"
        },

        // INTERNAL. Use Indicator.actions.count() instead.
        "prototype$__count__actions": {
          url: urlBase + "/indicators/:id/actions/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Indicator#create
         * @methodOf pnete.service.Indicator
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/indicators",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Indicator#createMany
         * @methodOf pnete.service.Indicator
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/indicators",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Indicator#upsert
         * @methodOf pnete.service.Indicator
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/indicators",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Indicator#exists
         * @methodOf pnete.service.Indicator
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/indicators/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Indicator#findById
         * @methodOf pnete.service.Indicator
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/indicators/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Indicator#find
         * @methodOf pnete.service.Indicator
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/indicators",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Indicator#findOne
         * @methodOf pnete.service.Indicator
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/indicators/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Indicator#updateAll
         * @methodOf pnete.service.Indicator
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/indicators/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Indicator#deleteById
         * @methodOf pnete.service.Indicator
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/indicators/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Indicator#count
         * @methodOf pnete.service.Indicator
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/indicators/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Indicator#prototype$updateAttributes
         * @methodOf pnete.service.Indicator
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/indicators/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Indicator#createChangeStream
         * @methodOf pnete.service.Indicator
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/indicators/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Organization.indicators.findById() instead.
        "::findById::Organization::indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/indicators/:fk",
          method: "GET"
        },

        // INTERNAL. Use Organization.indicators.destroyById() instead.
        "::destroyById::Organization::indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/indicators/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Organization.indicators.updateById() instead.
        "::updateById::Organization::indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/indicators/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Organization.indicators.link() instead.
        "::link::Organization::indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/indicators/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Organization.indicators.unlink() instead.
        "::unlink::Organization::indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/indicators/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Organization.indicators.exists() instead.
        "::exists::Organization::indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/organizations/:id/indicators/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Organization.indicators() instead.
        "::get::Organization::indicators": {
          isArray: true,
          url: urlBase + "/organizations/:id/indicators",
          method: "GET"
        },

        // INTERNAL. Use Organization.indicators.create() instead.
        "::create::Organization::indicators": {
          url: urlBase + "/organizations/:id/indicators",
          method: "POST"
        },

        // INTERNAL. Use Organization.indicators.createMany() instead.
        "::createMany::Organization::indicators": {
          isArray: true,
          url: urlBase + "/organizations/:id/indicators",
          method: "POST"
        },

        // INTERNAL. Use Organization.indicators.destroyAll() instead.
        "::delete::Organization::indicators": {
          url: urlBase + "/organizations/:id/indicators",
          method: "DELETE"
        },

        // INTERNAL. Use Organization.indicators.count() instead.
        "::count::Organization::indicators": {
          url: urlBase + "/organizations/:id/indicators/count",
          method: "GET"
        },

        // INTERNAL. Use Axis.indicators.findById() instead.
        "::findById::Axis::indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/axes/:id/indicators/:fk",
          method: "GET"
        },

        // INTERNAL. Use Axis.indicators.destroyById() instead.
        "::destroyById::Axis::indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/axes/:id/indicators/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Axis.indicators.updateById() instead.
        "::updateById::Axis::indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/axes/:id/indicators/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Axis.indicators() instead.
        "::get::Axis::indicators": {
          isArray: true,
          url: urlBase + "/axes/:id/indicators",
          method: "GET"
        },

        // INTERNAL. Use Axis.indicators.create() instead.
        "::create::Axis::indicators": {
          url: urlBase + "/axes/:id/indicators",
          method: "POST"
        },

        // INTERNAL. Use Axis.indicators.createMany() instead.
        "::createMany::Axis::indicators": {
          isArray: true,
          url: urlBase + "/axes/:id/indicators",
          method: "POST"
        },

        // INTERNAL. Use Axis.indicators.destroyAll() instead.
        "::delete::Axis::indicators": {
          url: urlBase + "/axes/:id/indicators",
          method: "DELETE"
        },

        // INTERNAL. Use Axis.indicators.count() instead.
        "::count::Axis::indicators": {
          url: urlBase + "/axes/:id/indicators/count",
          method: "GET"
        },

        // INTERNAL. Use Action.indicators.findById() instead.
        "::findById::Action::indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/actions/:id/indicators/:fk",
          method: "GET"
        },

        // INTERNAL. Use Action.indicators.destroyById() instead.
        "::destroyById::Action::indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/actions/:id/indicators/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Action.indicators.updateById() instead.
        "::updateById::Action::indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/actions/:id/indicators/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Action.indicators.link() instead.
        "::link::Action::indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/actions/:id/indicators/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Action.indicators.unlink() instead.
        "::unlink::Action::indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/actions/:id/indicators/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Action.indicators.exists() instead.
        "::exists::Action::indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/actions/:id/indicators/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Action.indicators() instead.
        "::get::Action::indicators": {
          isArray: true,
          url: urlBase + "/actions/:id/indicators",
          method: "GET"
        },

        // INTERNAL. Use Action.indicators.create() instead.
        "::create::Action::indicators": {
          url: urlBase + "/actions/:id/indicators",
          method: "POST"
        },

        // INTERNAL. Use Action.indicators.createMany() instead.
        "::createMany::Action::indicators": {
          isArray: true,
          url: urlBase + "/actions/:id/indicators",
          method: "POST"
        },

        // INTERNAL. Use Action.indicators.destroyAll() instead.
        "::delete::Action::indicators": {
          url: urlBase + "/actions/:id/indicators",
          method: "DELETE"
        },

        // INTERNAL. Use Action.indicators.count() instead.
        "::count::Action::indicators": {
          url: urlBase + "/actions/:id/indicators/count",
          method: "GET"
        },

        // INTERNAL. Use Cicle.indicators.findById() instead.
        "::findById::Cicle::indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/cicles/:id/indicators/:fk",
          method: "GET"
        },

        // INTERNAL. Use Cicle.indicators.destroyById() instead.
        "::destroyById::Cicle::indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/cicles/:id/indicators/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Cicle.indicators.updateById() instead.
        "::updateById::Cicle::indicators": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/cicles/:id/indicators/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Cicle.indicators() instead.
        "::get::Cicle::indicators": {
          isArray: true,
          url: urlBase + "/cicles/:id/indicators",
          method: "GET"
        },

        // INTERNAL. Use Cicle.indicators.create() instead.
        "::create::Cicle::indicators": {
          url: urlBase + "/cicles/:id/indicators",
          method: "POST"
        },

        // INTERNAL. Use Cicle.indicators.createMany() instead.
        "::createMany::Cicle::indicators": {
          isArray: true,
          url: urlBase + "/cicles/:id/indicators",
          method: "POST"
        },

        // INTERNAL. Use Cicle.indicators.destroyAll() instead.
        "::delete::Cicle::indicators": {
          url: urlBase + "/cicles/:id/indicators",
          method: "DELETE"
        },

        // INTERNAL. Use Cicle.indicators.count() instead.
        "::count::Cicle::indicators": {
          url: urlBase + "/cicles/:id/indicators/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name pnete.service.Indicator#updateOrCreate
         * @methodOf pnete.service.Indicator
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Indicator` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name pnete.service.Indicator#update
         * @methodOf pnete.service.Indicator
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name pnete.service.Indicator#destroyById
         * @methodOf pnete.service.Indicator
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name pnete.service.Indicator#removeById
         * @methodOf pnete.service.Indicator
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name pnete.service.Indicator#modelName
    * @propertyOf pnete.service.Indicator
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Indicator`.
    */
    R.modelName = "Indicator";


        /**
         * @ngdoc method
         * @name pnete.service.Indicator#axis
         * @methodOf pnete.service.Indicator
         *
         * @description
         *
         * Fetches belongsTo relation axis.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Axis` object.)
         * </em>
         */
        R.axis = function() {
          var TargetResource = $injector.get("Axis");
          var action = TargetResource["::get::Indicator::axis"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator#cicle
         * @methodOf pnete.service.Indicator
         *
         * @description
         *
         * Fetches belongsTo relation cicle.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cicle` object.)
         * </em>
         */
        R.cicle = function() {
          var TargetResource = $injector.get("Cicle");
          var action = TargetResource["::get::Indicator::cicle"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name pnete.service.Indicator.organizations
     * @header pnete.service.Indicator.organizations
     * @object
     * @description
     *
     * The object `Indicator.organizations` groups methods
     * manipulating `Organization` instances related to `Indicator`.
     *
     * Call {@link pnete.service.Indicator#organizations Indicator.organizations()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name pnete.service.Indicator#organizations
         * @methodOf pnete.service.Indicator
         *
         * @description
         *
         * Queries organizations of Indicator.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        R.organizations = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::get::Indicator::organizations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator.organizations#count
         * @methodOf pnete.service.Indicator.organizations
         *
         * @description
         *
         * Counts organizations of Indicator.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.organizations.count = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::count::Indicator::organizations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator.organizations#create
         * @methodOf pnete.service.Indicator.organizations
         *
         * @description
         *
         * Creates a new instance in organizations of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        R.organizations.create = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::create::Indicator::organizations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator.organizations#createMany
         * @methodOf pnete.service.Indicator.organizations
         *
         * @description
         *
         * Creates a new instance in organizations of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        R.organizations.createMany = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::createMany::Indicator::organizations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator.organizations#destroyAll
         * @methodOf pnete.service.Indicator.organizations
         *
         * @description
         *
         * Deletes all organizations of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.organizations.destroyAll = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::delete::Indicator::organizations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator.organizations#destroyById
         * @methodOf pnete.service.Indicator.organizations
         *
         * @description
         *
         * Delete a related item by id for organizations.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for organizations
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.organizations.destroyById = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::destroyById::Indicator::organizations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator.organizations#exists
         * @methodOf pnete.service.Indicator.organizations
         *
         * @description
         *
         * Check the existence of organizations relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for organizations
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        R.organizations.exists = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::exists::Indicator::organizations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator.organizations#findById
         * @methodOf pnete.service.Indicator.organizations
         *
         * @description
         *
         * Find a related item by id for organizations.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for organizations
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        R.organizations.findById = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::findById::Indicator::organizations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator.organizations#link
         * @methodOf pnete.service.Indicator.organizations
         *
         * @description
         *
         * Add a related item by id for organizations.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for organizations
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        R.organizations.link = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::link::Indicator::organizations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator.organizations#unlink
         * @methodOf pnete.service.Indicator.organizations
         *
         * @description
         *
         * Remove the organizations relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for organizations
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.organizations.unlink = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::unlink::Indicator::organizations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator.organizations#updateById
         * @methodOf pnete.service.Indicator.organizations
         *
         * @description
         *
         * Update a related item by id for organizations.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for organizations
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        R.organizations.updateById = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::updateById::Indicator::organizations"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name pnete.service.Indicator.actions
     * @header pnete.service.Indicator.actions
     * @object
     * @description
     *
     * The object `Indicator.actions` groups methods
     * manipulating `Action` instances related to `Indicator`.
     *
     * Call {@link pnete.service.Indicator#actions Indicator.actions()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name pnete.service.Indicator#actions
         * @methodOf pnete.service.Indicator
         *
         * @description
         *
         * Queries actions of Indicator.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Action` object.)
         * </em>
         */
        R.actions = function() {
          var TargetResource = $injector.get("Action");
          var action = TargetResource["::get::Indicator::actions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator.actions#count
         * @methodOf pnete.service.Indicator.actions
         *
         * @description
         *
         * Counts actions of Indicator.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.actions.count = function() {
          var TargetResource = $injector.get("Action");
          var action = TargetResource["::count::Indicator::actions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator.actions#create
         * @methodOf pnete.service.Indicator.actions
         *
         * @description
         *
         * Creates a new instance in actions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Action` object.)
         * </em>
         */
        R.actions.create = function() {
          var TargetResource = $injector.get("Action");
          var action = TargetResource["::create::Indicator::actions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator.actions#createMany
         * @methodOf pnete.service.Indicator.actions
         *
         * @description
         *
         * Creates a new instance in actions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Action` object.)
         * </em>
         */
        R.actions.createMany = function() {
          var TargetResource = $injector.get("Action");
          var action = TargetResource["::createMany::Indicator::actions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator.actions#destroyAll
         * @methodOf pnete.service.Indicator.actions
         *
         * @description
         *
         * Deletes all actions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.actions.destroyAll = function() {
          var TargetResource = $injector.get("Action");
          var action = TargetResource["::delete::Indicator::actions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator.actions#destroyById
         * @methodOf pnete.service.Indicator.actions
         *
         * @description
         *
         * Delete a related item by id for actions.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for actions
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.actions.destroyById = function() {
          var TargetResource = $injector.get("Action");
          var action = TargetResource["::destroyById::Indicator::actions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator.actions#exists
         * @methodOf pnete.service.Indicator.actions
         *
         * @description
         *
         * Check the existence of actions relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for actions
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Action` object.)
         * </em>
         */
        R.actions.exists = function() {
          var TargetResource = $injector.get("Action");
          var action = TargetResource["::exists::Indicator::actions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator.actions#findById
         * @methodOf pnete.service.Indicator.actions
         *
         * @description
         *
         * Find a related item by id for actions.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for actions
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Action` object.)
         * </em>
         */
        R.actions.findById = function() {
          var TargetResource = $injector.get("Action");
          var action = TargetResource["::findById::Indicator::actions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator.actions#link
         * @methodOf pnete.service.Indicator.actions
         *
         * @description
         *
         * Add a related item by id for actions.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for actions
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Action` object.)
         * </em>
         */
        R.actions.link = function() {
          var TargetResource = $injector.get("Action");
          var action = TargetResource["::link::Indicator::actions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator.actions#unlink
         * @methodOf pnete.service.Indicator.actions
         *
         * @description
         *
         * Remove the actions relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for actions
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.actions.unlink = function() {
          var TargetResource = $injector.get("Action");
          var action = TargetResource["::unlink::Indicator::actions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name pnete.service.Indicator.actions#updateById
         * @methodOf pnete.service.Indicator.actions
         *
         * @description
         *
         * Update a related item by id for actions.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for actions
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Action` object.)
         * </em>
         */
        R.actions.updateById = function() {
          var TargetResource = $injector.get("Action");
          var action = TargetResource["::updateById::Indicator::actions"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name pnete.service.Feedback
 * @header pnete.service.Feedback
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Feedback` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Feedback",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/feedbacks/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name pnete.service.Feedback#create
         * @methodOf pnete.service.Feedback
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Feedback` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/feedbacks",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Feedback#createMany
         * @methodOf pnete.service.Feedback
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Feedback` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/feedbacks",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Feedback#upsert
         * @methodOf pnete.service.Feedback
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Feedback` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/feedbacks",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Feedback#exists
         * @methodOf pnete.service.Feedback
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/feedbacks/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Feedback#findById
         * @methodOf pnete.service.Feedback
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Feedback` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/feedbacks/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Feedback#find
         * @methodOf pnete.service.Feedback
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Feedback` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/feedbacks",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Feedback#findOne
         * @methodOf pnete.service.Feedback
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Feedback` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/feedbacks/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Feedback#updateAll
         * @methodOf pnete.service.Feedback
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/feedbacks/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Feedback#deleteById
         * @methodOf pnete.service.Feedback
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/feedbacks/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Feedback#count
         * @methodOf pnete.service.Feedback
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/feedbacks/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Feedback#prototype$updateAttributes
         * @methodOf pnete.service.Feedback
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Feedback` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/feedbacks/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name pnete.service.Feedback#createChangeStream
         * @methodOf pnete.service.Feedback
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/feedbacks/change-stream",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name pnete.service.Feedback#updateOrCreate
         * @methodOf pnete.service.Feedback
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Feedback` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name pnete.service.Feedback#update
         * @methodOf pnete.service.Feedback
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name pnete.service.Feedback#destroyById
         * @methodOf pnete.service.Feedback
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name pnete.service.Feedback#removeById
         * @methodOf pnete.service.Feedback
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name pnete.service.Feedback#modelName
    * @propertyOf pnete.service.Feedback
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Feedback`.
    */
    R.modelName = "Feedback";


    return R;
  }]);


module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.rememberMe = undefined;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    }

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      var key = propsPrefix + name;
      if (value == null) value = '';
      storage[key] = value;
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {

          // filter out non urlBase requests
          if (config.url.substr(0, urlBase.length) !== urlBase) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 } },
              status: 401,
              config: config,
              headers: function() { return undefined; }
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        }
      }
    }])

  /**
   * @ngdoc object
   * @name pnete.service.LoopBackResourceProvider
   * @header pnete.service.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name pnete.service.LoopBackResourceProvider#setAuthHeader
     * @methodOf pnete.service.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name pnete.service.LoopBackResourceProvider#setUrlBase
     * @methodOf pnete.service.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
    };

    /**
     * @ngdoc method
     * @name pnete.service.LoopBackResourceProvider#getUrlBase
     * @methodOf pnete.service.LoopBackResourceProvider
     * @description
     * Get the URL of the REST API server. The URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.getUrlBase = function() {
      return urlBase;
    };

    this.$get = ['$resource', function($resource) {
      return function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };
    }];
  });

})(window, window.angular);
