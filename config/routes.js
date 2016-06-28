/**
 * Routes Configuration
 * (trails.config.routes)
 *
 * Configure how routes map to views and controllers.
 *
 * @see http://trailsjs.io/doc/config/routes.js
 */

'use strict'

module.exports = [
  
  /**
   * Return a user whit his roles
   */
  {
    method: 'GET',
    path: '/acl/userRole/{id}',
    handler: 'ACLController.getUserRole'
  },
  /**
   * Add a role to user
   */
  {
    method: 'POST',
    path: '/acl/userRole',
    handler: 'ACLController.addUserRole'
  },
  /**
   * Remove a role from user
   */
  {
    method: 'DELETE',
    path: '/acl/userRole',
    handler: 'ACLController.removeUserRole'
  },

  {
    method: 'POST',
    path: '/acl/allow',
    handler: 'ACLController.allow'
  },

  {
    method: 'POST',
    path: '/acl/deny',
    handler: 'ACLController.deny'
  },

  {
    method: 'GET',
    path: '/acl/resources',
    handler: 'ACLController.getResources'
  }
]
