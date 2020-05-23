/*********************************

 File:       Helpers.js
 Function:   Random fns
 Copyright:  AppDelegates LLC
 Date:       2019-12-04
 Author:     mkahn



 **********************************/

/**
 * Splits a firebase displayName into First/Last
 * @param displayName
 * @returns {{firstName: *, lastName: *, displayName: *}}
 */

const splitDisplayName = displayName => {
  if (!displayName) displayName = 'NoName NoLastName'
  const components = displayName.split(' ', 2)
  let firstName, lastName
  firstName = components[0] || 'NoName'
  if (components.length>1)
    lastName = components[1]
  else
    lastName = 'NoLastName'
  return { firstName, lastName, displayName }
}

export default splitDisplayName
