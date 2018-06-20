import Vue from 'Vue';
import moment from 'moment';

const actualDate = moment().format('YYYY-MM-DD');

const date = {
  state: {
    todays: actualDate,
    picked: actualDate,
    pickedWeek: moment(actualDate).add(-3, 'days')
  },
  mutations: {
    PICKED_DATE (state, date) {
      state.picked = date;
    }
  }
}

export default date;
