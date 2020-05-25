/*********************************

 File:       post-filter.js
 Function:   Used in post search
 Copyright:  Bertco LLC
 Date:       2020-05-25
 Author:     mkahn


 **********************************/


import _ from 'lodash';

const postFilter = (post, stringQuery )=> {

    if (!stringQuery || stringQuery.length < 2 || !post) {
        return true;
    }

    const fieldsOfInterest = _.compact([
        post.author,
        post.title,
        post.body,
    ]);

    return fieldsOfInterest.some(field => field.toLowerCase().includes(stringQuery.toLowerCase()));

};

export default postFilter;
