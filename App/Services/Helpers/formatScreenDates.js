import moment from 'moment';

const formatScreenDates =  published => moment(published.toDate()).format("MMMM Do YYYY");


export default formatScreenDates;
